import React, { useEffect, useRef } from 'react';

const DancingLines = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Zeichne sofort einen schwarzen Hintergrund
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Führe resizeCanvas sofort aus
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getRandomSpeed = () => Math.random() * 9 + 1;

    const lines = Array(5).fill().map(() => ({
      start: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: getRandomSpeed() * (Math.random() > 0.5 ? 1 : -1),
        dy: getRandomSpeed() * (Math.random() > 0.5 ? 1 : -1)
      },
      end: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: getRandomSpeed() * (Math.random() > 0.5 ? 1 : -1),
        dy: getRandomSpeed() * (Math.random() > 0.5 ? 1 : -1)
      },
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      lines.forEach(line => {
        line.start.x += line.start.dx;
        line.start.y += line.start.dy;
        line.end.x += line.end.dx;
        line.end.y += line.end.dy;

        if (line.start.x < 0 || line.start.x > canvas.width) line.start.dx *= -1;
        if (line.start.y < 0 || line.start.y > canvas.height) line.start.dy *= -1;
        if (line.end.x < 0 || line.end.x > canvas.width) line.end.dx *= -1;
        if (line.end.y < 0 || line.end.y > canvas.height) line.end.dy *= -1;

        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Starte die Animation im nächsten Frame
    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black' // Setze die Hintergrundfarbe des Canvas-Elements
      }}
    />
  );
};

export default DancingLines;