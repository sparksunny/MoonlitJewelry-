import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, RefreshCw, Link2, Check, AlertCircle } from 'lucide-react';

interface SingleImageUploaderProps {
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
  helperText?: string;
  required?: boolean;
}

// Utility to optimize/compress image client-side to prevent localStorage overflow
export const optimizeImageFile = (file: File, maxWidth = 1200, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};

export const SingleImageUploader: React.FC<SingleImageUploaderProps> = ({
  label,
  value,
  onChange,
  helperText = 'Select an image file from your device (JPEG, PNG, WebP)',
  required = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [useUrlMode, setUseUrlMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please choose a valid image file (JPEG, PNG, WebP, etc.)');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    try {
      const optimizedDataUrl = await optimizeImageFile(file);
      onChange(optimizedDataUrl);
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to process image. Please try another file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase font-semibold tracking-wider text-[#2C221E]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setUseUrlMode(!useUrlMode)}
          className="text-[10px] text-[#7A6E65] hover:text-[#2C221E] underline flex items-center gap-1 cursor-pointer"
        >
          {useUrlMode ? (
            <>
              <UploadCloud className="w-3 h-3 text-[#B89058]" /> Switch to File Upload
            </>
          ) : (
            <>
              <Link2 className="w-3 h-3 text-[#7A6E65]" /> Enter URL Link instead
            </>
          )}
        </button>
      </div>

      {useUrlMode ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.example.com/jewelry.jpg"
            className="w-full px-3 py-2 text-xs bg-[#F8F1E8]/50 border border-[#D9C5B0] rounded-xs font-mono"
          />
          {value && (
            <div className="flex items-center gap-3 p-2 bg-[#F8F1E8] border border-[#E6DACB] rounded-xs">
              <img
                src={value}
                alt="Preview"
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-cover rounded-xs border border-[#D9C5B0]"
              />
              <span className="text-[11px] text-[#7A6E65] truncate flex-1">{value}</span>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* File Upload Drop Area */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileInputChange}
          />

          {value ? (
            <div className="p-3 bg-[#FFFFFF] border border-[#B89058] rounded-xs flex flex-col sm:flex-row items-center gap-4 shadow-2xs">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-xs border border-[#D9C5B0] bg-[#F2E7D8]">
                <img
                  src={value}
                  alt="Loaded Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-medium text-emerald-800">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Image Loaded Successfully</span>
                </div>
                <p className="text-[11px] text-[#7A6E65] font-sans">
                  Ready to display in high resolution across all catalogs and product views.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-[#F2E7D8] hover:bg-[#EADBCA] border border-[#D5C2AA] text-[#2C221E] text-[11px] uppercase tracking-wider font-semibold rounded-xs flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3 text-[#B89058]" />
                    <span>Choose Different Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-[11px] uppercase tracking-wider font-semibold rounded-xs flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xs p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#B89058] bg-[#F2E7D8]'
                  : 'border-[#D9C5B0] bg-[#F8F1E8]/60 hover:bg-[#F2E7D8]/80 hover:border-[#B89058]'
              }`}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#F2E7D8] flex items-center justify-center text-[#B89058] shadow-2xs">
                  {isProcessing ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-[#B89058]" />
                  ) : (
                    <UploadCloud className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#2C221E]">
                    {isProcessing ? 'Processing image...' : 'Click to Load Image or Drag & Drop'}
                  </p>
                  <p className="text-[11px] text-[#7A6E65] mt-0.5">{helperText}</p>
                </div>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mt-2 text-[11px] text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface MultiImageUploaderProps {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  label,
  images,
  onChange,
  maxImages = 4,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = async (files: FileList) => {
    setIsProcessing(true);
    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        try {
          const optimized = await optimizeImageFile(file);
          newImages.push(optimized);
        } catch (e) {
          console.error(e);
        }
      }
    }
    const combined = [...images, ...newImages].slice(0, maxImages);
    onChange(combined);
    setIsProcessing(false);
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase font-semibold tracking-wider text-[#2C221E]">
        {label} ({images.length}/{maxImages})
      </label>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {images.map((imgSrc, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-xs overflow-hidden border border-[#D9C5B0] bg-[#F2E7D8] group shadow-2xs"
          >
            <img
              src={imgSrc}
              alt={`Gallery preview ${idx + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-1.5 right-1.5 p-1 bg-[#2C221E]/80 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <span className="absolute bottom-1 left-1 bg-[#F8F1E8]/90 text-[9px] font-semibold px-1.5 py-0.5 rounded-2xs">
              #{idx + 1}
            </span>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square border-2 border-dashed border-[#D9C5B0] rounded-xs flex flex-col items-center justify-center p-3 hover:border-[#B89058] hover:bg-[#F2E7D8]/50 transition-all cursor-pointer text-center"
          >
            {isProcessing ? (
              <RefreshCw className="w-5 h-5 animate-spin text-[#B89058]" />
            ) : (
              <UploadCloud className="w-5 h-5 text-[#B89058]" />
            )}
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2C221E] mt-1.5">
              + Load Image
            </span>
            <span className="text-[9px] text-[#7A6E65]">From Device</span>
          </button>
        )}
      </div>
    </div>
  );
};
