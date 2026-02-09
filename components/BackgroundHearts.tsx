
import React, { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
  color: string;
  type: 'heart' | 'moon';
}

const BackgroundHearts: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const colors = ['#f472b6', '#fb7185', '#ec4899', '#f43f5e', '#fda4af', '#fef08a'];
    const newElements: FloatingElement[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 25 + 10}px`,
      duration: `${Math.random() * 5 + 7}s`,
      delay: `${Math.random() * 5}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() > 0.8 ? 'moon' : 'heart'
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="heart"
          style={{
            left: el.left,
            width: el.size,
            height: el.size,
            animationDuration: el.duration,
            animationDelay: el.delay,
          }}
        >
          {el.type === 'heart' ? (
            <svg viewBox="0 0 24 24" style={{ fill: el.color, width: '100%', height: '100%' }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <span style={{ fontSize: el.size }}>🌙</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BackgroundHearts;
