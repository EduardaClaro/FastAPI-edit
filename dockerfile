FROM python:3.10-slim

WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install -y poppler-utils gcc libglib2.0-0 libsm6 libxext6 libxrender-dev && \
    pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 8080

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
