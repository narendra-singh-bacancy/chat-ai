import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from './UserProfile';
import '../styles/sidebar.css';

interface SidebarProps {
  isMinimized: boolean;
  onToggle: () => void;
}

export function Sidebar({ isMinimized, onToggle }: SidebarProps) {
  const { user } = useAuth();

  return (
    <aside className={`sidebar ${isMinimized ? 'minimized' : 'maximized'}`}>
      <div className="sidebar-content">
        {/* Sidebar Header */}
        <div className="sidebar-header">
          {!isMinimized && (
            <div className="sidebar-logo">
              <span>Chat AI</span>
            </div>
          )}
          <button 
            className="sidebar-toggle-button" 
            onClick={onToggle} 
            aria-label={isMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
          >
            {isMinimized ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7 3l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M13 3l-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Sidebar Body - Empty for now, can add chat history later */}
        {!isMinimized && (
          <div className="sidebar-body">
            <div className="sidebar-empty-state">
              <p>No chat history</p>
            </div>
          </div>
        )}

        {/* Sidebar Footer - User Profile */}
        {user && (
          <div className="sidebar-footer">
            <UserProfile isMinimized={isMinimized} />
          </div>
        )}
      </div>
    </aside>
  );
}

