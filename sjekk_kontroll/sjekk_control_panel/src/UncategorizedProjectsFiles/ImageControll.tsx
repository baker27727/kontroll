import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCw, Maximize, Minimize, X, Move, Download, Share2 } from 'lucide-react';

const EnhancedImageViewer = ({ src, alt, width = 400, height = 300 }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const constraintsRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setScale(prev => Math.max(0.1, prev - 0.1));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleFullscreen = () => setIsFullscreen(prev => !prev);
  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this image',
        text: 'I found this interesting image',
        url: src,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this device');
    }
  };

  const Controls = () => (
    <motion.div 
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 backdrop-blur-md rounded-full p-2 flex space-x-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="flex space-x-3"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
          >
            <button onClick={handleZoomIn} className="text-white hover:text-blue-300 transition-colors">
              <ZoomIn size={20} />
            </button>
            <button onClick={handleZoomOut} className="text-white hover:text-blue-300 transition-colors">
              <ZoomOut size={20} />
            </button>
            <button onClick={handleRotate} className="text-white hover:text-blue-300 transition-colors">
              <RotateCw size={20} />
            </button>
            <button onClick={handleReset} className="text-white hover:text-blue-300 transition-colors">
              <Move size={20} />
            </button>
            <button onClick={handleDownload} className="text-white hover:text-blue-300 transition-colors">
              <Download size={20} />
            </button>
            <button onClick={handleShare} className="text-white hover:text-blue-300 transition-colors">
              <Share2 size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={handleFullscreen} className="text-white hover:text-blue-300 transition-colors">
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>
    </motion.div>
  );

  const ImageContainer = ({ children }) => (
    <div 
      ref={constraintsRef}
      className={`relative overflow-hidden rounded-lg shadow-lg ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}
      style={{ width: isFullscreen ? '100vw' : width, height: isFullscreen ? '100vh' : height }}
    >
      {children}
      <AnimatePresence>
        {isFullscreen && (
          <motion.button
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
            onClick={() => setIsFullscreen(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      <Controls />
    </div>
  );

  return (
    <ImageContainer>
      <motion.div
        drag={isFullscreen}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="w-full h-full flex items-center justify-center"
      >
        <motion.img
          src={src}
          alt={alt}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
          animate={{
            scale: scale,
            rotate: rotation,
            x: position.x,
            y: position.y,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onDoubleClick={handleFullscreen}
          className={`select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={(e) => e.preventDefault()}
          whileHover={{ scale: isFullscreen ? scale : scale * 1.05 }}
        />
      </motion.div>
    </ImageContainer>
  );
};

// Demo component to showcase the EnhancedImageViewer
const EnhancedImageViewerDemo = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Enhanced Image Viewer</h1>
      <EnhancedImageViewer 
        src="/src/assets/block.jpg" 
        alt="Demo Image" 
        width={500} 
        height={375}
      />
      <p className="mt-6 text-gray-700 text-center max-w-md">
        Experience our enhanced image viewer with zoom, rotate, fullscreen, and more. 
        Hover over the controls to reveal additional options. Double-click the image to toggle fullscreen mode.
      </p>
    </div>
  );
};

export default EnhancedImageViewerDemo;