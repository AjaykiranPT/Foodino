import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="homepage-container" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="sloped-background" />
        <div className="welcome-content">
          <h2>Welcome to Foodino!</h2>
          <p>Your go-to platform for sharing and discovering amazing recipes.</p>
          <a href="/explore" className="animated-button">
            Explore Now
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        {[
          {
            icon: <CheckCircleIcon className="feature-icon" />,
            title: 'Discover Recipes',
            description: 'Find thousands of recipes from around the world.',
          },
          {
            icon: <StarBorderIcon className="feature-icon" />,
            title: 'Get Rated',
            description: 'Receive feedback from professional Master Chefs.',
          },
          {
            icon: <CheckCircleIcon className="feature-icon" />,
            title: 'Share Creations',
            description: 'Upload your culinary creations to inspire others.',
          },
          {
            icon: <CheckCircleIcon className="feature-icon" />,
            title: 'Tutorial Videos',
            description: 'Watch detailed cooking tutorials by experts.',
          },
        ].map(({ icon, title, description }, index) => (
          <div className="feature-card fade-in-section" key={index}>
            {icon}
            <h6>{title}</h6>
            <p className="feature-description">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
