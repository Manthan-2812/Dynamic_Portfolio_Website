import { useState, useEffect } from "react";
import "./NebulaBackground.css";

function NebulaBackground() {
  const [stars, setStars] = useState([]);
  const [nebulaClouds, setNebulaClouds] = useState([]);
  const [cosmicRays, setCosmicRays] = useState([]);

  useEffect(() => {
    // Generate stars
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3,
          duration: Math.random() * 4 + 2,
          delay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    // Generate nebula clouds
    const generateNebulaClouds = () => {
      const newClouds = [];
      for (let i = 0; i < 6; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 300 + 200,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 10,
          color: ['purple', 'blue', 'pink', 'indigo'][Math.floor(Math.random() * 4)],
        });
      }
      setNebulaClouds(newClouds);
    };

    // Generate cosmic rays
    const generateCosmicRays = () => {
      const newRays = [];
      for (let i = 0; i < 12; i++) {
        newRays.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          length: Math.random() * 200 + 100,
          rotation: Math.random() * 360,
          duration: Math.random() * 8 + 4,
          delay: Math.random() * 5,
        });
      }
      setCosmicRays(newRays);
    };

    generateStars();
    generateNebulaClouds();
    generateCosmicRays();
  }, []);

  return (
    <div className="nebula-container">
      {/* Deep space background */}
      <div className="space-background" />
      
      {/* Nebula clouds */}
      {nebulaClouds.map((cloud) => (
        <div
          key={cloud.id}
          className={`nebula-cloud nebula-${cloud.color}`}
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size}px`,
            animation: `nebula-float ${cloud.duration}s ease-in-out infinite`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}

      {/* Cosmic rays */}
      {cosmicRays.map((ray) => (
        <div
          key={ray.id}
          className="cosmic-ray"
          style={{
            left: `${ray.x}%`,
            top: `${ray.y}%`,
            width: `${ray.length}px`,
            height: '2px',
            transform: `rotate(${ray.rotation}deg)`,
            animation: `ray-pulse ${ray.duration}s ease-in-out infinite`,
            animationDelay: `${ray.delay}s`,
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `star-twinkle ${star.duration}s infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Pulsing cores */}
      <div className="nebula-core core-1" />
      <div className="nebula-core core-2" />
      <div className="nebula-core core-3" />
    </div>
  );
}

export default NebulaBackground;
