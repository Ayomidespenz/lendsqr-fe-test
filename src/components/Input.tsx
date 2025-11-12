import { InputHTMLAttributes, useState } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
}

export const Input = ({
  label,
  error,
  showPasswordToggle = false,
  icon,
  type = 'text',
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && showPassword ? 'text' : type;

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.inputContainer}>
        {icon && <div className={styles.icon}>{icon}</div>}
        
        <input
          type={inputType}
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...props}
        />

        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
