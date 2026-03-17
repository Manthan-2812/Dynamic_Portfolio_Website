import { useState, useEffect } from "react";
import "./Background.css";

function Background() {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    // Generate random stars for background
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    // Generate random meteors
    const generateMeteors = () => {
      const newMeteors = [];
      for (let i = 0; i < 15; i++) {
        newMeteors.push({
          id: i,
          left: Math.random() * 100, // Spread across full width
          top: Math.random() * 60,   // Spread across upper 60% height
          duration: Math.random() * 2 + 3,
          delay: Math.random() * 8,
        });
      }
      setMeteors(newMeteors);
    };

    generateStars();
    generateMeteors();
  }, []);

  return (
    <div className="background-container">
      {/* Gradient overlay */}
      <div className="gradient-overlay" />
      
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
            animation: `twinkle ${star.duration}s infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Meteor shower */}
      <div className="meteor-container">
        {meteors.map((meteor) => (
          <div
            key={meteor.id}
            className="meteor"
            style={{
              left: `${meteor.left}%`,
              top: `${meteor.top}%`,
              animation: `meteor ${meteor.duration}s linear infinite`,
              animationDelay: `${meteor.delay}s`,
            }}
          >
            <div className="meteor-trail" />
          </div>
        ))}
      </div>

      {/* Purple gradient rays */}
      <div className="gradient-rays">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </div>
    </div>
  );
}

export default Background;