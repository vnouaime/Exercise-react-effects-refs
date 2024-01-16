import React, { useState } from "react"
import "./Card.css"

/**
 * Single Card returned from deck. Card is styled with random positioning angles and rendered with name and image given through props. 
 *
 * Props: 
 * name, image
 * 
 * State: 
 * { angle, xPos, yPos }
 */
const Card = ({name, image}) => {
    const [{ angle, xPos, yPos }] = useState({
        angle: Math.random() * 90 - 45,
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20,
    });
    
    const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

    return <img
      className="Card"
      alt={name}
      src={image}
      style={{ transform }}
    />;
}

export { Card }