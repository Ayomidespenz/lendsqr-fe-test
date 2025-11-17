import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { useUsers, userApi } from '../services/userApi';
import styles from './UserDetailsPage.module.scss';
import SystemIcon from '../assets/system.png';
import LogoutIcon from '../assets/logout.png';

type TabType = 'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'app';

export const UserDetailsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const { users, loading, error } = useUsers();

  // Find the user from the users list
  let userFromList = users.find(u => u.id === userId);
  
  // Override status if it has been updated
  if (userStatus && userFromList) {
    userFromList = { ...userFromList, status: userStatus as any };
  }

  // Extended user data with generated details
  const userDetails = userFromList ? {
    // Personal Information (from API)
    fullName: userFromList.username ? 
      userFromList.username.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') :
      `User ${userFromList.id}`,
    phoneNumber: userFromList.phoneNumber || 'N/A',
    emailAddress: userFromList.email || 'N/A',
    bvn: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    maritalStatus: ['Single', 'Married', 'Divorced'][Math.floor(Math.random() * 3)],
    children: Math.random() > 0.5 ? 'None' : `${Math.floor(Math.random() * 5) + 1}`,
    typeOfResidence: ["Parent's Apartment", 'Own House', 'Rented Apartment', 'Office'][Math.floor(Math.random() * 4)],

    // Education and Employment
    levelOfEducation: ['B.Sc', 'M.Sc', 'HND', 'ND', 'Diploma'][Math.floor(Math.random() * 5)],
    employmentStatus: ['Employed', 'Self-employed', 'Unemployed'][Math.floor(Math.random() * 3)],
    sectorOfEmployment: ['FinTech', 'Banking', 'Technology', 'Retail', 'Healthcare', 'Education'][Math.floor(Math.random() * 6)],
    durationOfEmployment: `${Math.floor(Math.random() * 20) + 1} years`,
    officeEmail: `${userFromList.username}@lendsqr.com`,
    monthlyIncome: `₦${(Math.random() * 1000000).toLocaleString('en-NG')} - ₦${(Math.random() * 1000000 + 500000).toLocaleString('en-NG')}`,
    loanRepayment: `${Math.floor(Math.random() * 500000)}`,

    // Socials
    twitter: `@${userFromList.username}`,
    facebook: userFromList.username,
    instagram: `@${userFromList.username}`,

    // Guarantors
    guarantors: [
      {
        fullName: 'quadriyusuff',
        phoneNumber: '08012345678',
        emailAddress: 'quadriyusuff@gmail.com',
        relationship: 'Brother',
      },
      {
        fullName: 'quadriyusuff',
        phoneNumber: '07012345678',
        emailAddress: 'quadriyusuff@gmail.com',
        relationship: 'Sister',
      },
    ],
  } : {
    fullName: 'N/A',
    phoneNumber: 'N/A',
    emailAddress: 'N/A',
    bvn: 'N/A',
    gender: 'N/A',
    maritalStatus: 'N/A',
    children: 'N/A',
    typeOfResidence: 'N/A',
    levelOfEducation: 'N/A',
    employmentStatus: 'N/A',
    sectorOfEmployment: 'N/A',
    durationOfEmployment: 'N/A',
    officeEmail: 'N/A',
    monthlyIncome: 'N/A',
    loanRepayment: 'N/A',
    twitter: 'N/A',
    facebook: 'N/A',
    instagram: 'N/A',
    guarantors: [],
  };

  const user = userFromList ? {
    id: userFromList.id,
    firstName: userDetails.fullName.split(' ')[0],
    lastName: userDetails.fullName.split(' ').slice(1).join(' ') || userDetails.fullName,
    userTierId: `LSQF${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    tier: Math.floor(Math.random() * 3) + 1,
    accountBalance: `₦${(Math.random() * 1000000).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    accountNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}/Providus Bank`,
  } : {
    id: 'N/A',
    firstName: 'N/A',
    lastName: 'N/A',
    userTierId: 'N/A',
    tier: 0,
    accountBalance: 'N/A',
    accountNumber: 'N/A',
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleBlacklist = useCallback(async () => {
    if (!userFromList) return;
    try {
      const success = await userApi.blacklistUser(userFromList.id);
      if (success) {
        setUserStatus('blacklisted');
        toast.success(`User ${userDetails.fullName} has been blacklisted`, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error(`Failed to blacklist user ${userDetails.fullName}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while blacklisting the user', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [userFromList, userDetails.fullName]);

  const handleActivate = useCallback(async () => {
    if (!userFromList) return;
    try {
      const success = await userApi.activateUser(userFromList.id);
      if (success) {
        setUserStatus('active');
        toast.success(`User ${userDetails.fullName} has been activated`, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error(`Failed to activate user ${userDetails.fullName}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while activating the user', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [userFromList, userDetails.fullName]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className={styles.userDetails}>
          <div className={styles.header}>
            <button className={styles.backBtn} onClick={handleBack}>
              ← Back to Users
            </button>
            <h1 className={styles.title}>Loading user details...</h1>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !userFromList) {
    return (
      <DashboardLayout>
        <div className={styles.userDetails}>
          <div className={styles.header}>
            <button className={styles.backBtn} onClick={handleBack}>
              ← Back to Users
            </button>
            <h1 className={styles.title}>{error || `User with ID ${userId} not found`}</h1>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Additional sidebar items for this page only
  const userDetailsAdditionalItems = [
    {
      id: 'systems-messages',
      label: 'Systems Messages',
      icon: <img src={SystemIcon} alt="Systems Messages" />,
      section: 'settings',
    },
  ];
  
  // Logout item positioned separately at the bottom
  const logoutItem = {
    id: 'logout',
    label: 'Logout',
    icon: <img src={LogoutIcon} alt="Logout" />,
    section: 'settings',
  };

  return (
    <DashboardLayout additionalSidebarItems={[...userDetailsAdditionalItems, logoutItem]}>
      <div className={styles.userDetails}>
        {/* Header Section */}
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={handleBack}>
            ← Back to Users
          </button>

          <div className={styles.headerTop}>
            <h1 className={styles.title}>User Details</h1>
            <div className={styles.actionButtons}>
              <button className={`${styles.btn} ${styles.danger}`} onClick={handleBlacklist}>
                BLACKLIST USER
              </button>
              <button className={`${styles.btn} ${styles.success}`} onClick={handleActivate}>
                ACTIVATE USER
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            {/* Avatar + Name + TierID */}
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                <span>{user.firstName.charAt(0)}</span>
              </div>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>
                  {user.firstName} {user.lastName}
                </h2>
                <p className={styles.userTierId}>{user.userTierId}</p>
              </div>
            </div>

            {/* User's Tier */}
            <div className={styles.tierSection}>
              <p className={styles.tierLabel}>User's Tier</p>
              <div className={styles.tierDisplay}>
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`${styles.starIcon} ${i <= user.tier ? styles.filled : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Account Info */}
            <div className={styles.accountInfo}>
              <div className={styles.infoItem}>
                <h2 className={styles.infoValue}>{user.accountBalance}</h2>
                <p className={styles.infoValue}>{user.accountNumber}</p>
                {/* <p className={styles.infoLabel}>Account Balance</p> */}
              </div>
              <div className={styles.infoItem}>
                {/* <p className={styles.infoLabel}>Bank Details</p> */}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'general' ? styles.active : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General Details
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'documents' ? styles.active : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'bank' ? styles.active : ''}`}
              onClick={() => setActiveTab('bank')}
            >
              Bank Details
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'loans' ? styles.active : ''}`}
              onClick={() => setActiveTab('loans')}
            >
              Loans
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'savings' ? styles.active : ''}`}
              onClick={() => setActiveTab('savings')}
            >
              Savings
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'app' ? styles.active : ''}`}
              onClick={() => setActiveTab('app')}
            >
              App and System
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'general' && (
            <div className={styles.generalDetails}>
              {/* Personal Information Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Personal Information</h3>
                <div className={styles.gridContainer}>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>FULL NAME</label>
                    <p className={styles.fieldValue}>{userDetails.fullName}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>PHONE NUMBER</label>
                    <p className={styles.fieldValue}>{userDetails.phoneNumber}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>EMAIL ADDRESS</label>
                    <p className={styles.fieldValue}>{userDetails.emailAddress}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>BVN</label>
                    <p className={styles.fieldValue}>{userDetails.bvn}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>GENDER</label>
                    <p className={styles.fieldValue}>{userDetails.gender}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>MARITAL STATUS</label>
                    <p className={styles.fieldValue}>{userDetails.maritalStatus}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>CHILDREN</label>
                    <p className={styles.fieldValue}>{userDetails.children}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>TYPE OF RESIDENCE</label>
                    <p className={styles.fieldValue}>{userDetails.typeOfResidence}</p>
                  </div>
                </div>
              </div>

              {/* Education and Employment Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Education and Employment</h3>
                <div className={styles.gridContainer}>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>LEVEL OF EDUCATION</label>
                    <p className={styles.fieldValue}>{userDetails.levelOfEducation}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>EMPLOYMENT STATUS</label>
                    <p className={styles.fieldValue}>{userDetails.employmentStatus}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>SECTOR OF EMPLOYMENT</label>
                    <p className={styles.fieldValue}>{userDetails.sectorOfEmployment}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>DURATION OF EMPLOYMENT</label>
                    <p className={styles.fieldValue}>{userDetails.durationOfEmployment}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>OFFICE EMAIL</label>
                    <p className={styles.fieldValue}>{userDetails.officeEmail}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>MONTHLY INCOME</label>
                    <p className={styles.fieldValue}>{userDetails.monthlyIncome}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>LOAN REPAYMENT</label>
                    <p className={styles.fieldValue}>{userDetails.loanRepayment}</p>
                  </div>
                </div>
              </div>

              {/* Socials Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Socials</h3>
                <div className={styles.gridContainer}>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>TWITTER</label>
                    <p className={styles.fieldValue}>{userDetails.twitter}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>FACEBOOK</label>
                    <p className={styles.fieldValue}>{userDetails.facebook}</p>
                  </div>
                  <div className={styles.infoField}>
                    <label className={styles.fieldLabel}>INSTAGRAM</label>
                    <p className={styles.fieldValue}>{userDetails.instagram}</p>
                  </div>
                </div>
              </div>

              {/* Guarantor Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Guarantor</h3>
                {userDetails.guarantors.map((guarantor, idx) => (
                  <div key={idx} className={styles.guarantorCard}>
                    <div className={styles.gridContainer}>
                      <div className={styles.infoField}>
                        <label className={styles.fieldLabel}>FULL NAME</label>
                        <p className={styles.fieldValue}>{guarantor.fullName}</p>
                      </div>
                      <div className={styles.infoField}>
                        <label className={styles.fieldLabel}>PHONE NUMBER</label>
                        <p className={styles.fieldValue}>{guarantor.phoneNumber}</p>
                      </div>
                      <div className={styles.infoField}>
                        <label className={styles.fieldLabel}>EMAIL ADDRESS</label>
                        <p className={styles.fieldValue}>{guarantor.emailAddress}</p>
                      </div>
                      <div className={styles.infoField}>
                        <label className={styles.fieldLabel}>RELATIONSHIP</label>
                        <p className={styles.fieldValue}>{guarantor.relationship}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'documents' && (
            <div className={styles.contentPlaceholder}>
              <p>Documents Content</p>
            </div>
          )}
          {activeTab === 'bank' && (
            <div className={styles.contentPlaceholder}>
              <p>Bank Details Content</p>
            </div>
          )}
          {activeTab === 'loans' && (
            <div className={styles.contentPlaceholder}>
              <p>Loans Content</p>
            </div>
          )}
          {activeTab === 'savings' && (
            <div className={styles.contentPlaceholder}>
              <p>Savings Content</p>
            </div>
          )}
          {activeTab === 'app' && (
            <div className={styles.contentPlaceholder}>
              <p>App and System Content</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
