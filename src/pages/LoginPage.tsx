import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import styles from './LoginPage.module.scss';
import Logo from '../assets/Group.svg';
import LoginIllustration from '../assets/loginlogo.svg';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - store token in localStorage
      const mockToken = `token_${Date.now()}`;
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_email', formData.email);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        general: 'An error occurred during login. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.illustrationSection}>
        {/* Logo */}
        <div className={styles.logoPosition}>
          <img src={Logo} alt="Lendsqr" className={styles.logo} />
        </div>
        <img
          src={LoginIllustration}
          alt="Login illustration"
          className={styles.illustration}
        />
      </div>

      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          {/* Welcome Text */}
          <div className={styles.welcomeText}>
            <h1 className={styles.title}>Welcome!</h1>
            <p className={styles.subtitle}>Enter details to login.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email Input */}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isLoading}
            />

            {/* Password Input */}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              showPasswordToggle
              disabled={isLoading}
            />

            {/* General Error */}
            {errors.general && (
              <div className={styles.generalError}>{errors.general}</div>
            )}

            {/* Forgot Password Link */}
            <button
              type="button"
              className={styles.forgotPasswordLink}
              onClick={handleForgotPassword}
              disabled={isLoading}
            >
              FORGOT PASSWORD?
            </button>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
            >
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
