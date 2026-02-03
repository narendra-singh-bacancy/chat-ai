import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

interface UserProfileProps {
  isMinimized?: boolean;
}

export function UserProfile({ isMinimized = false }: UserProfileProps) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  if (!user) return null;

  if (isMinimized) {
    return (
      <div className="user-profile minimized">
        <img 
          src={user.picture} 
          alt={user.name} 
          className="user-avatar-minimized" 
          title={user.name}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <div className="user-menu minimized-menu" ref={menuRef}>
            <div className="menu-item" onClick={() => setMenuOpen(false)}>
              <span>Profile</span>
            </div>
            <div className="menu-item" onClick={() => { setMenuOpen(false); logout(); }}>
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="user-profile" ref={menuRef}>
      <div className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
        <img src={user.picture} alt={user.name} className="user-avatar" />
        <div className="user-details">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>
        <svg 
          className="menu-arrow" 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
          style={{ transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {menuOpen && (
        <div className="user-menu">
          <div className="menu-item" onClick={() => setMenuOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 8a2 2 0 100-4 2 2 0 000 4zM8 10a4 4 0 00-4 4h8a4 4 0 00-4-4z"
                fill="currentColor"
              />
            </svg>
            <span>Profile</span>
          </div>
          <div className="menu-item" onClick={() => { setMenuOpen(false); logout(); }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 14H2a1 1 0 01-1-1V3a1 1 0 011-1h4m5 4l4-4m0 0l-4-4m4 4H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}

