import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { getCroppedImg } from '../../utils/cropImage';

interface ImageCropperModalProps {
  image: string;
  onClose: () => void;
  onCropComplete: (croppedImage: string) => void;
  aspect?: number;
}

export default function ImageCropperModal({ 
  image, 
  onClose, 
  onCropComplete, 
  aspect = 16 / 9 
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteInternal = useCallback((_croppedArea: any, pixelCrop: any) => {
    setCroppedAreaPixels(pixelCrop);
  }, []);

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      onCropComplete(croppedImage);
      onClose();
    } catch (e) {
      console.error(e);
      alert('裁剪处理失败');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white rounded-[40px] overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-8 border-b border-brand-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-brand-dark">裁剪与调整</h2>
            <p className="text-[10px] uppercase font-black tracking-widest text-brand-dark/40 mt-1">Image Preview & Crop</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-brand-gray rounded-full transition-colors text-brand-dark/20 hover:text-brand-dark">
            <X size={24} />
          </button>
        </div>

        {/* Cropper Body */}
        <div className="flex-1 relative bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onRotationChange={setRotation}
            onCropComplete={onCropCompleteInternal}
            classes={{
              containerClassName: "bg-black",
            }}
          />
        </div>

        {/* Controls */}
        <div className="p-8 bg-white border-t border-brand-border space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40">缩放 (Zoom)</label>
                <div className="flex items-center gap-2">
                   <ZoomOut size={12} className="text-brand-dark/20" />
                   <span className="text-[10px] font-black">{Math.round(zoom * 100)}%</span>
                   <ZoomIn size={12} className="text-brand-dark/20" />
                </div>
              </div>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-gray rounded-full appearance-none cursor-pointer accent-brand-blue"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40">旋转 (Rotate)</label>
                <div className="flex items-center gap-2">
                   <RotateCw size={12} className="text-brand-dark/20" />
                   <span className="text-[10px] font-black">{rotation}°</span>
                </div>
              </div>
              <input
                type="range"
                value={rotation}
                min={0}
                max={360}
                step={1}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-gray rounded-full appearance-none cursor-pointer accent-brand-blue"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-8 py-4 text-brand-dark/40 text-[10px] font-black uppercase tracking-widest hover:text-brand-dark"
            >
              取消
            </button>
            <button
              onClick={handleDone}
              disabled={isProcessing}
              className="px-12 py-4 bg-brand-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3 hover:bg-brand-dark transition-all disabled:opacity-50"
            >
              {isProcessing ? '处理中...' : (
                <>
                  <Check size={18} />
                  完成并应用
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
