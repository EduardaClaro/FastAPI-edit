"use client";

import React, { useState, useEffect } from "react";
import { BiImage, BiTime, BiDownload, BiRocket } from "react-icons/bi";

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: BiImage,
      title: "Selecione a imagem",
      description: "Arraste ou clique para fazer upload",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: BiTime,
      title: "Processamento IA",
      description: "Edição automática em segundos",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: BiDownload,
      title: "Baixe o resultado",
      description: "Imagem editada em alta qualidade",
      gradient: "from-pink-400 to-rose-400",
    },
  ];

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden bg-white">

      {/* Hero Section */}
      <section className="relative z-10 w-full text-center py-32 px-4 transition-opacity duration-1000 ease-out space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800">
          Edite suas fotos com
        </h1>

        <h2 className="text-6xl md:text-8xl font-black">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
            FastEdit
          </span>
        </h2>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transforme suas imagens com inteligência artificial em segundos. Simples, rápido e poderoso.
        </p>

        <button className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95">
          <span className="relative z-10 flex items-center gap-2">
            Começar Gratuitamente
            <BiRocket className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur" />
        </button>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 w-full py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-16">

          <div className="text-center space-y-4">
            <h3 className="text-5xl font-black text-gray-800">
              Como Funciona?
            </h3>
            <p className="text-xl text-gray-600">
              Três passos simples para resultados incríveis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={idx}
                  className={`relative p-8 rounded-3xl transition-all duration-700 ease-out transform ${
                    isActive
                      ? "bg-white shadow-2xl scale-105 -translate-y-2"
                      : "bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-102"
                  }`}
                >
                  <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg ${isActive ? 'animate-bounce' : ''}`}>
                    {idx + 1}
                  </div>

                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center mb-6 mx-auto transition-all duration-500 ease-out ${isActive ? 'rotate-12 scale-110' : 'group-hover:rotate-6 group-hover:scale-105'}`}>
                    <Icon className="text-4xl text-white" />
                  </div>

                  <h4 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 w-full py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-2xl transition-transform duration-500 hover:scale-105">
          <h3 className="text-4xl font-black text-white mb-4">
            Pronto para começar?
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a milhares de usuários satisfeitos
          </p>
          <button className="px-10 py-5 rounded-full bg-white text-purple-600 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95">
            Editar Minha Primeira Foto
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
