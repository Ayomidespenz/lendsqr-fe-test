import { useState, useRef, useEffect } from 'react';
import styles from './ActionMenu.module.scss';

interface ActionMenuItem {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface ActionMenuProps {
  items: ActionMenuItem[];
}

export const ActionMenu = ({ items }: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (callback: () => void) => {
    callback();
    setIsOpen(false);
  };

  return (
    <div className={styles.actionMenuContainer} ref={menuRef}>
      <button
        className={styles.triggerBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="More options"
      >
        ⋮
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {items.map((item, idx) => (
            <button
              key={idx}
              className={`${styles.menuItem} ${styles[item.variant || 'default']}`}
              onClick={() => handleItemClick(item.onClick)}
            >
              {item.icon && <img src={item.icon} alt="" className={styles.icon} />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
