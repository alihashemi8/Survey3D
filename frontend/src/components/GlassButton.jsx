import { useState } from "react";
import "./GlassButton.css";

function GlassButton({ text = "شروع", onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="glass-button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text">{text}</span>
      {isHovered && <span className="wave" />}
    </button>
  );
}

export default GlassButton;
