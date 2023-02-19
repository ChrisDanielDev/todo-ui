import React from 'react';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
  );
};

export default LogoutButton;
