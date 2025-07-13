// import React, { useEffect, useRef } from 'react';

// interface CreativePatternWrapperProps {
//   children: React.ReactNode;
//   primaryColor?: string;
//   secondaryColor?: string;
//   backgroundColor?: string;
//   patternOpacity?: number;
// }

// const CreativePatternWrapper: React.FC<CreativePatternWrapperProps> = ({
//   children,
//   primaryColor = '#4a9fff',
//   secondaryColor = '#ff4a9f',
//   backgroundColor = '#0f172a',
//   patternOpacity = 0.1,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles: Particle[] = [];
//     const particleCount = 100;

//     class Particle {
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;
//       color: string;

//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 5 + 1;
//         this.speedX = Math.random() * 3 - 1.5;
//         this.speedY = Math.random() * 3 - 1.5;
//         this.color = Math.random() > 0.5 ? primaryColor : secondaryColor;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.size > 0.2) this.size -= 0.1;

//         if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
//         if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
//       }

//       draw() {
//         ctx.fillStyle = this.color;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//       }

      
//     }

//     const init = () => {
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//       }
//     };

//     const animate = () => {
//       ctx.fillStyle = `rgba(${parseInt(backgroundColor.slice(1, 3), 16)}, ${parseInt(backgroundColor.slice(3, 5), 16)}, ${parseInt(backgroundColor.slice(5, 7), 16)}, ${patternOpacity})`;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((particle, index) => {
//         particle.update();
//         particle.draw();

//         if (particle.size <= 0.2) {
//           particles.splice(index, 1);
//           particles.push(new Particle());
//         }
//       });

//       // Draw connecting lines
//       ctx.strokeStyle = `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.05)`;
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 100) {
//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.stroke();
//           }
//         }
//       }

//       requestAnimationFrame(animate);
//     };

//     init();
//     animate();

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [primaryColor, secondaryColor, backgroundColor, patternOpacity]);

//   return (
//     <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor }}>
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full"
//       />
//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// };

// // Example usage
// const App: React.FC = () => {
//   return (
//     <CreativePatternWrapper>
//       <div className="container mx-auto px-4 py-16">
//         <h1 className="text-4xl font-bold text-white mb-8">Welcome to Our Cosmic Website</h1>
//         <p className="text-xl text-gray-300">
//           Dive into a mesmerizing galaxy of interconnected particles, dancing across your screen.
//           This dynamic background creates an immersive experience that's both beautiful and engaging.
//         </p>
//       </div>
//     </CreativePatternWrapper>
//   );
// };

// export default App;


const PatternWrapper = () => {
  return (
    <div>PatternWrapper</div>
  )
}

export default PatternWrapper