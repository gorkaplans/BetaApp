import React, { useState, useRef } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File, url: string) => void;
  onBack: () => void;
  onError: (error: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, onBack, onError }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      onError('Por favor selecciona un archivo de imagen válido');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      onError('La imagen es demasiado grande. Por favor selecciona una imagen menor a 10MB');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleConfirm = () => {
    if (selectedFile && preview) {
      onImageUpload(selectedFile, preview);
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Sube la imagen de la vía
        </h2>

        {!preview ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragOver 
                ? 'border-gray-900 bg-gray-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium mb-2">
              Arrastra una imagen aquí o haz clic
            </p>
            <p className="text-gray-400 text-sm">
              Formatos soportados: JPG, PNG, WEBP
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden">
              <img
                src={preview}
                alt="Vista previa de la vía"
                className="w-full h-64 object-cover"
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 px-4 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cambiar imagen
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedFile}
            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Confirmar imagen
          </button>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        ¡Analicemos tu próxima vía!
      </p>
    </div>
  );
};

export default ImageUpload;