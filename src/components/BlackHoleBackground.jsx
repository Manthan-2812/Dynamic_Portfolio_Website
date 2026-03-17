import { useState, useEffect } from "react";
import "./BlackHoleBackground.css";

function BlackHoleBackground() {
  const [particles, setParticles] = useState([]);
  const [rings, setRings] = useState([]);

  useEffect(() => {
    // Generate particles being sucked into black hole
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 400 + 100;
        newParticles.push({
          id: i,
          angle: angle,
          distance: distance,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.002 + 0.001,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
      setParticles(newParticles);
    };

    // Generate accretion disk rings
    const generateRings = () => {
      const newRings = [];
      for (let i = 0; i < 5; i++) {
        newRings.push({
          id: i,
          radius: 80 + i * 40,
          rotation: Math.random() * 360,
          speed: Math.random() * 20 + 10,
          opacity: 0.3 - i * 0.05,
        });
      }
      setRings(newRings);
    };

    generateParticles();
    generateRings();
  }, []);

  return (
    <div className="blackhole-container">
      {/* Background gradient */}
      <div className="blackhole-gradient" />
      
      {/* Black hole center */}
      <div className="blackhole-center">
        <div className="event-horizon" />
        <div className="gravitational-lens" />
      </div>

      {/* Accretion disk rings */}
      {rings.map((ring) => (
        <div
          key={ring.id}
          className="accretion-ring"
          style={{
            width: `${ring.radius * 2}px`,
            height: `${ring.radius * 2}px`,
            animation: `rotate ${ring.speed}s linear infinite`,
            opacity: ring.opacity,
          }}
        />
      ))}

      {/* Particles being sucked in */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `spiral ${1 / particle.speed}s linear infinite`,
            animationDelay: `${particle.angle * 1000}ms`,
          }}
        />
      ))}

      {/* Energy jets */}
      <div className="energy-jet jet-top" />
      <div className="energy-jet jet-bottom" />
    </div>
  );
}

export default BlackHoleBackground;
