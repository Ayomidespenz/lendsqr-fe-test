import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import SearchIcon from '../assets/search.png';
import DefaultAvatar from '../assets/image 4.png';
import BellIcon from '../assets/bellIcon.png'

interface NavbarProps {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export const Navbar = ({ userName = 'Adedoyin', userAvatar, onLogout }: NavbarProps) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setIsProfileOpen(false);
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>LS</span>
            <span className={styles.logoText}>Lendsqr</span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className={styles.center}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for anything"
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className={styles.searchButton} aria-label="Search">
              <img src={SearchIcon} alt="Search" className={styles.searchIcon} />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <a href="#docs" className={styles.docLink}>
            Docs
          </a>

          <button className={styles.iconButton} aria-label="Notifications">
            <img src={BellIcon} alt="Bell"  style={{marginTop:"22px"}}/>,
          </button>

          {/* User Profile Dropdown */}
          <div className={styles.profileMenu}>
            <button
              className={styles.profileButton}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-label="User menu"
            >
              <img
                src={userAvatar || DefaultAvatar}
                alt={userName}
                className={styles.avatar}
              />
              <span className={styles.userName}>{userName}</span>
              <span className={styles.dropdown}>⌄</span>
            </button>

            {isProfileOpen && (
              <div className={styles.dropdownMenu}>
                <a href="#profile" className={styles.menuItem}>
                  👤 Profile
                </a>
                <a href="#settings" className={styles.menuItem}>
                  ⚙️ Settings
                </a>
                <button
                  onClick={handleLogout}
                  className={`${styles.menuItem} ${styles.logout}`}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
