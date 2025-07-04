'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const confetti_nums = 30

// Props for the Confetti component
interface ConfettiProps {
  color: string; // Tailwind color class for the confetti
  corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'; // The starting corner of the confetti
  size?: 'small' | 'medium' | 'large'; // Size of the confetti
  delay?: number; // Delay before the animation starts
  duration?: number; // Total duration of the animation
  fadeOutDelay?: number; // Additional delay before the fade-out effect
}

// Confetti component
const Confetti = ({ 
  color, 
  corner, 
  size = 'large', 
  delay = 0, 
  duration = 4,
  fadeOutDelay = 0 
}: ConfettiProps) => {
  
  // Determines the size of the confetti based on the `size` prop
  const getSize = () => {
    switch (size) {
      case 'small': return 'w-1.5 h-1.5'; // Small confetti dimensions
      case 'medium': return 'w-2.5 h-2.5'; // Medium confetti dimensions
      case 'large': return 'w-3 h-3'; // Large confetti dimensions
    }
  };

  // Determines the random animation for the confetti piece
  const getAnimation = () => {
    const distance = Math.random() * 400 + 200; // Random distance (200-600 pixels)
    
    // Determine the angle of movement based on the starting corner
    const angle = (() => {
      switch (corner) {
        case 'topLeft': return Math.random() * 90; // Random angle between 0° and 90° for top-left
        case 'topRight': return Math.random() * 90 + 90; // 90° to 180° for top-right
        case 'bottomRight': return Math.random() * 90 + 180; // 180° to 270° for bottom-right
        case 'bottomLeft': return Math.random() * 90 + 270; // 270° to 360° for bottom-left
      }
    })();

    const radians = (angle * Math.PI) / 180; // Convert angle from degrees to radians
    return {
      x: Math.cos(radians) * distance, // Horizontal distance based on cosine of the angle
      y: Math.sin(radians) * distance, // Vertical distance based on sine of the angle
    };
  };

  const { x, y } = getAnimation(); // Get the x and y displacement for the animation

  // Determines the initial position of the confetti based on the starting corner
  const getInitialPosition = () => {
    switch (corner) {
      case 'topLeft': return { top: '0%', left: '0%' }; // Start at the top-left corner
      case 'topRight': return { top: '0%', right: '0%' }; // Start at the top-right corner
      case 'bottomRight': return { bottom: '0%', right: '0%' }; // Start at the bottom-right corner
      case 'bottomLeft': return { bottom: '0%', left: '0%' }; // Start at the bottom-left corner
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        ...getInitialPosition(), // Set the initial position based on the corner
      }}
      initial={{ scale: 0, opacity: 0 }} // Start with invisible and scaled-down confetti
      animate={{
        x, // Move horizontally based on `x` calculation
        y, // Move vertically based on `y` calculation
        scale: [0, 1, 1, 0.8, 0.2], // Scale up and then shrink
        rotate: [0, 360], // Rotate a full 360 degrees
        opacity: [0, 1, 1, 0.8, 0], // Fade in, stay visible, and then fade out
      }}
      transition={{
        duration: duration, // Total animation duration
        delay: delay + fadeOutDelay, // Start delay plus fade-out delay
        ease: "easeOut", // Smooth easing for the animation
        times: [0, 0.1, 0.4, 0.7, 1], // Control points for scaling and opacity
      }}
      className={`${getSize()} ${color} rounded-full shadow-lg`} // Apply size and color classes
    />
  );
};

// Main component to render the confetti effect
export default function CelebrationConfetti() {
  const [isActive, setIsActive] = useState(true); // Controls whether confetti is active
  const [confettiPieces, setConfettiPieces] = useState<any[]>([]); // Stores confetti piece data

  // Available colors for the confetti
  const colors = [
    'bg-red-500',    // Bright Red
    'bg-red-600',    // Darker Red
    'bg-green-500',  // Bright Green
    'bg-green-600',  // Darker Green
    'bg-white',      // White
    'bg-white/90',   // Slightly transparent white
  ];

  // Starting corners for the confetti
  const corners: ('topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight')[] = [
    'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
  ];

  // Available sizes for the confetti
  const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];

  useEffect(() => {
    // Generate initial confetti pieces
    const pieces = corners.flatMap((corner) =>
      Array.from({ length: confetti_nums }).map((_, i) => ({
        id: `${corner}-${i}`, // Unique ID for each confetti piece
        corner, // Starting corner
        color: colors[Math.floor(Math.random() * colors.length)], // Random color
        size: sizes[Math.floor(Math.random() * sizes.length)], // Random size
        delay: Math.random() * 0.5, // Random start delay (0-0.5 seconds)
        duration: Math.random() * 2 + 1, // Random animation duration (3-5 seconds)
        fadeOutDelay: Math.random() * 1, // Random fade-out delay (0-3 seconds)
      }))
    );
    
    setConfettiPieces(pieces); // Save generated confetti pieces

    // Stop confetti generation after 3 seconds
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 5000);

    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {isActive && confettiPieces.map((piece) => (
          <Confetti
            key={piece.id}
            corner={piece.corner}
            color={piece.color}
            size={piece.size}
            delay={piece.delay}
            duration={piece.duration}
            fadeOutDelay={piece.fadeOutDelay}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
