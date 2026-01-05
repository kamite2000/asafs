import React from 'react';
import './styles.css'; // Assuming you have CSS for styling

const DesignComponent: React.FC = () => {
  return (
    <div className="main-container">
      <div className="top-left-rounded"></div>
      <div className="video-container">
        <h1>NOTRE MISSION.</h1>
        {/* Embed video here, either local or YouTube */}
        <div className="video-wrapper">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Example YouTube link, replace with your video
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="bottom-right-rounded"></div>
      <div className="left-hand-images">
        <img src="path/to/your/image1.png" alt="Hand gesture" />
        <img src="path/to/your/image2.png" alt="Hand gesture" />
        <img src="path/to/your/image3.png" alt="Hand gesture" />
      </div>
      <div className="right-hand-images">
        <img src="path/to/your/image4.png" alt="Hand gesture" />
        <img src="path/to/your/image5.png" alt="Hand gesture" />
        <img src="path/to/your/image6.png" alt="Hand gesture" />
      </div>
    </div>
  );
};

export default DesignComponent;