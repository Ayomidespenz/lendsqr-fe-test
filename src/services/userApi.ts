import { useEffect, useState } from 'react';

// Types
export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
}

export interface UserDetails extends User {
  firstName: string;
  lastName: string;
  tier: number;
  userTierId: string;
  accountNumber: string;
  accountBalance: string;
  // Personal Information
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  // Education and Employment
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  // Socials
  twitter: string;
  facebook: string;
  instagram: string;
  // Guarantors
  guarantors: Array<{
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
  }>;
}

// API Configuration
const DATA_URL = '/data.json'; // Mock data from public folder
const STORAGE_KEY = 'lendsqr_users';
const USER_DETAILS_KEY = 'lendsqr_user_details_';

// Transform raw user data from API to User interface
interface RawUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
  organization: string;
  dateJoined: string;
}

function transformUser(rawUser: RawUser): User {
  const nameParts = rawUser.name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || nameParts[0];
  const username = `${firstName.toLowerCase()}_${lastName.toLowerCase().replace(/\s+/g, '_')}`;

  return {
    id: String(rawUser.id),
    organization: rawUser.organization,
    username: username,
    email: rawUser.email,
    phoneNumber: rawUser.phone,
    dateJoined: rawUser.dateJoined,
    status: (rawUser.status as 'active' | 'inactive' | 'pending' | 'blacklisted') || 'active',
  };
}

// Fetch users from mock data
async function fetchUsersFromAPI(): Promise<User[]> {
  try {
    console.log('Fetching users from mock data:', DATA_URL);
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Data loaded successfully:', data.length, 'users');
    // Handle both array and object with 'users' key
    const rawUsers = Array.isArray(data) ? data : data.users || [];
    console.log('Raw users count:', rawUsers.length);
    const transformedUsers = rawUsers.map(transformUser);
    console.log('Transformed users count:', transformedUsers.length);
    console.log('Sample user:', transformedUsers[0]);
    return transformedUsers;
  } catch (error) {
    console.error('Error fetching users from data:', error);
    throw error;
  }
}

// Generate detailed user information
function generateUserDetails(user: User): UserDetails {
  const firstNames = ['Grace', 'John', 'Mary', 'David', 'Sarah', 'Michael', 'Emma', 'James'];
  const lastNames = ['Effiom', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
  const educationLevels = ['B.Sc', 'M.Sc', 'HND', 'ND', 'Diploma'];
  const employmentSectors = ['FinTech', 'Banking', 'Technology', 'Retail', 'Healthcare', 'Education', 'Manufacturing'];
  const residenceTypes = ["Parent's Apartment", 'Own House', 'Rented Apartment', 'Office'];
  const relationships = ['Brother', 'Sister', 'Parent', 'Friend', 'Spouse'];

  return {
    ...user,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    tier: Math.floor(Math.random() * 3) + 1,
    userTierId: `LSQF${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    accountNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}/Providus Bank`,
    accountBalance: `₦${(Math.random() * 1000000).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    bvn: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    maritalStatus: ['Single', 'Married', 'Divorced'][Math.floor(Math.random() * 3)],
    children: Math.random() > 0.5 ? 'None' : `${Math.floor(Math.random() * 5) + 1}`,
    typeOfResidence: residenceTypes[Math.floor(Math.random() * residenceTypes.length)],
    levelOfEducation: educationLevels[Math.floor(Math.random() * educationLevels.length)],
    employmentStatus: ['Employed', 'Self-employed', 'Unemployed'][Math.floor(Math.random() * 3)],
    sectorOfEmployment: employmentSectors[Math.floor(Math.random() * employmentSectors.length)],
    durationOfEmployment: `${Math.floor(Math.random() * 20) + 1} year${Math.floor(Math.random() * 20) + 1 > 1 ? 's' : ''}`,
    officeEmail: `${user.username}@lendsqr.com`,
    monthlyIncome: `₦${(Math.random() * 1000000).toLocaleString('en-NG')} - ₦${(Math.random() * 1000000 + 500000).toLocaleString('en-NG')}`,
    loanRepayment: `${Math.floor(Math.random() * 500000)}`,
    twitter: `@${user.username}`,
    facebook: `${user.username}`,
    instagram: `@${user.username}`,
    guarantors: [
      {
        fullName: `${lastNames[Math.floor(Math.random() * lastNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        phoneNumber: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`,
        emailAddress: `guarantor${Math.floor(Math.random() * 1000)}@gmail.com`,
        relationship: relationships[Math.floor(Math.random() * relationships.length)],
      },
      {
        fullName: `${lastNames[Math.floor(Math.random() * lastNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        phoneNumber: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`,
        emailAddress: `guarantor${Math.floor(Math.random() * 1000)}@gmail.com`,
        relationship: relationships[Math.floor(Math.random() * relationships.length)],
      },
    ],
  };
}

// API Service
export const userApi = {
  // Get all users
  async getUsers(): Promise<User[]> {
    try {
      // Always fetch fresh data from API
      const users = await fetchUsersFromAPI();
      // Cache the result
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      // Only use cache as fallback if API fails
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        console.log('Using cached data as fallback');
        return JSON.parse(cached);
      }
      throw error;
    }
  },

  // Get user by ID
  async getUserById(userId: string): Promise<UserDetails | null> {
    try {
      // Check localStorage for detailed user info
      const cached = localStorage.getItem(`${USER_DETAILS_KEY}${userId}`);
      if (cached) {
        return JSON.parse(cached);
      }

      // Get all users and find the one
      const users = await this.getUsers();
      const user = users.find(u => u.id === userId);

      if (!user) {
        return null;
      }

      // Generate details and cache
      const details = generateUserDetails(user);
      localStorage.setItem(`${USER_DETAILS_KEY}${userId}`, JSON.stringify(details));
      return details;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  },

  // Save user details to localStorage
  async saveUserDetails(userDetails: UserDetails): Promise<void> {
    try {
      localStorage.setItem(`${USER_DETAILS_KEY}${userDetails.id}`, JSON.stringify(userDetails));
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  },

  // Blacklist a user
  async blacklistUser(userId: string): Promise<boolean> {
    try {
      console.log(`Blacklisting user: ${userId}`);
      // Call API to blacklist user
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'blacklisted' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to blacklist user: ${response.statusText}`);
      }

      // Clear cache to force refresh
      localStorage.removeItem(STORAGE_KEY);
      console.log(`User ${userId} blacklisted successfully`);
      return true;
    } catch (error) {
      console.error('Error blacklisting user:', error);
      return false;
    }
  },

  // Activate a user
  async activateUser(userId: string): Promise<boolean> {
    try {
      console.log(`Activating user: ${userId}`);
      // Call API to activate user
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'active' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to activate user: ${response.statusText}`);
      }

      // Clear cache to force refresh
      localStorage.removeItem(STORAGE_KEY);
      console.log(`User ${userId} activated successfully`);
      return true;
    } catch (error) {
      console.error('Error activating user:', error);
      return false;
    }
  },

  // Mock login
  async login(email: string, password: string): Promise<{ token: string; userId: string } | null> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation - in real app, this would be server-side
      if (email && password && password.length >= 6) {
        const token = `token_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_email', email);
        return {
          token,
          userId: '1', // Default user ID for demo
        };
      }

      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  // Clear cache
  clearCache(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Mock logout
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    this.clearCache();
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  // Get current user email
  getCurrentUserEmail(): string | null {
    return localStorage.getItem('user_email');
  },
};

// Custom Hook for fetching users
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userApi.getUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

// Custom Hook for fetching user details
export const useUserDetails = (userId: string) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const data = await userApi.getUserById(userId);
        setUserDetails(data);
      } catch (err) {
        setError('Failed to fetch user details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return { userDetails, loading, error, saveDetails: userApi.saveUserDetails };
};

// Export for debugging
if (typeof window !== 'undefined') {
  (window as any).lendsqrApi = {
    clearCache: () => {
      userApi.clearCache();
      console.log('Cache cleared! Refresh page to fetch fresh data from API.');
    },
    getUsers: () => userApi.getUsers(),
  };
}
