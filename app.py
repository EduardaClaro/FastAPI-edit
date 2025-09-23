from fastapi.responses import StreamingResponse
from fastapi import FastAPI, File, UploadFile
from typing import List
from PIL import Image
import numpy as np
import mimetypes
import uvicorn
import rembg
import io
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try: #Importa a função para converter PDF em imagem
    from pdf2image import convert_from_bytes
except ImportError:
    convert_from_bytes = None  

app = FastAPI()

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    try:
        input_file = await file.read()
        content_type = file.content_type or mimetypes.guess_type(file.filename)[0]

        images: List[Image.Image] = []

        if content_type in ["image/jpeg", "image/png"]:
            input_image = Image.open(io.BytesIO(input_file))
            images = [input_image]
        elif content_type == "application/pdf":
            if not convert_from_bytes:
                return {"error": "pdf2image não está instalado"}
            images = convert_from_bytes(input_file)
        else:
            return {"error": "Tipo de arquivo não suportado. Use JPG, PNG ou PDF."}

        output_buffers = []
        for img in images:
            input_array = np.array(img)
            output_array = rembg.remove(input_array)
            output_image = Image.fromarray(output_array)
            buffered = io.BytesIO()
            output_image.save(buffered, format='PNG')
            buffered.seek(0)
            output_buffers.append(buffered)

        os.makedirs("media/sem_fundo", exist_ok=True)

        # Salva as imagens processadas
        for idx, buf in enumerate(output_buffers):
            filename = file.filename.rsplit('.', 1)[0]  # remove extensão original
            save_path = f"media/sem_fundo/{filename}_page_{idx+1}.png"
            with open(save_path, "wb") as f:
                f.write(buf.getvalue())

        # Se for só uma imagem, retorna direto
        if len(output_buffers) == 1:
            return StreamingResponse(output_buffers[0], media_type='image/png')
        # Se for PDF, retorna um zip com as imagens
        import zipfile
        zip_buffer = io.BytesIO()

        with zipfile.ZipFile(zip_buffer, "w") as zipf:
            for idx, buf in enumerate(output_buffers):
                zipf.writestr(f"page_{idx+1}.png", buf.getvalue())
        zip_buffer.seek(0)
        
        return StreamingResponse(zip_buffer, media_type="application/zip", headers={"Content-Disposition": "attachment; filename=images.zip"})
    except Exception as e:
        return {'error': str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)