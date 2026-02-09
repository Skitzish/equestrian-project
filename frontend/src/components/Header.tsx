import React from "react";
import { useAuth } from '../contexts/AuthContext';
import { Link } from "react-router-dom";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => { 
    const { user, refreshUser, logout } = useAuth();
    return (
      <header className="header-container">
        <h1 className="logo"><Link to="/"><img src="/images/logo2.png" alt="Logo" width="225px" /></Link></h1>
          <div className="header-child-container">
              <div className="header-current-day-status">
                <span className="font-medium">Day {user?.currentDay}</span>
                <span className="mx-2">•</span>
                <span>{user?.timeRemainingToday} min left</span>
                <span className="mx-2">•</span>
                <span className="font-medium text-green-600">${user?.money}</span>
              </div>
              <button onClick={logout} className="btn-secondary text-sm">
                Logout
              </button>
          </div>
      </header>
    );
};

export default Header;