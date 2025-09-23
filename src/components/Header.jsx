import React, { useEffect } from 'react';
import './Header.css';

const Header = () => {
  useEffect(() => {
    const header = document.querySelector('.header');
    if (!header) return;

    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Random properties
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const rotation = Math.random() * 360;
      const duration = Math.random() * 3 + 2;
      
      confetti.style.backgroundColor = color;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.left = `${posX}%`;
      confetti.style.top = `${posY}%`;
      confetti.style.transform = `rotate(${rotation}deg)`;
      confetti.style.animation = `fall ${duration}s linear forwards`;
      
      header.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    };

    // Add CSS for animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fall {
        0% {
          transform: translateY(-20px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Create confetti at intervals
    const confettiInterval = setInterval(createConfetti, 300);
    
    // Clean up
    return () => {
      clearInterval(confettiInterval);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Fresher's Fiesta 2K25</h1>
        <p className="header-subtitle">
          MPGI's Biggest Celebration of the Year!
        </p>
      </div>
    </header>
  );
};

export default Header;