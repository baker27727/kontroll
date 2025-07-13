import { useState, useEffect, useRef } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  color?: string;
}

export default function Slider({ min, max, step = 1, defaultValue = min, onChange, color = 'blue' }: SliderProps) {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        if (sliderRef.current) {
          const rect = sliderRef.current.getBoundingClientRect();
          const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          const newValue = Math.round((percentage * (max - min) + min) / step) * step;
          setValue(newValue);
          if (onChange) onChange(newValue);
        }
      };
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {};
  }, [isDragging, min, max, step, onChange]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full py-4 select-none">
      <div
        ref={sliderRef}
        className="h-2 bg-gray-200 rounded-full cursor-pointer"
        onMouseDown={() => setIsDragging(true)}
      >
        <div
          className={`absolute h-2 bg-${color}-600 rounded-full transition-all duration-150 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
        <div
          className={`absolute w-5 h-5 bg-white border-2 border-${color}-600 rounded-full shadow transform -translate-x-1/2 -translate-y-1/4 transition-all duration-150 ease-out hover:scale-110`}
          style={{ left: `${percentage}%` }}
          onMouseDown={() => setIsDragging(true)}
        ></div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>{min}</span>
        <span className="font-medium text-gray-900">{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}