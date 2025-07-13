import React from 'react';

interface WatermarkProps {
  text: string;
  imageSrc?: string; // Image URL (optional)
  children?: React.ReactNode;
}

const Watermark: React.FC<WatermarkProps> = ({ text, imageSrc, children }) => {
  return (
    <div className="relative">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Watermarked"
          className="w-full h-full object-cover rounded" // Image styling
        />
      ) : (
        children // If no image is provided, render children content
      )}

      {/* Watermark overlay */}
      <div className="absolute flex items-center justify-center pointer-events-none bottom-2 right-2">
        <div
          className="text-white font-bold  transform "
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'clip',
            width: '150%',
            height: '150%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

// Demo usage
const WatermarkDemo = () => {
  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Watermark Component Demo</h2>

      {/* Watermark on an image */}
      <div className="max-w-md mx-auto">
        <Watermark text="CONFIDENTIAL" imageSrc="/src/assets/block.jpg">
          {/* No children because we are using an image */}
        </Watermark>
      </div>

    </div>
  );
};

export default WatermarkDemo;
