import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import styles from './UserDetailsPage.module.scss';

type TabType = 'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'app';

export const UserDetailsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('general');

  // Extended user data with personal, education, employment, social, and guarantor info
  const userDetails = {
    // Personal Information
    fullName: 'Grace Effiom',
    phoneNumber: '07060780922',
    emailAddress: 'grace@gmail.com',
    bvn: '07060780922',
    gender: 'Female',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: "Parent's Apartment",

    // Education and Employment
    levelOfEducation: 'B.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'FinTech',
    durationOfEmployment: '2 years',
    officeEmail: 'grace@lendsqr.com',
    monthlyIncome: '₦200,000.00 - ₦400,000.00',
    loanRepayment: '40,000',

    // Socials
    twitter: '@grace_effiom',
    facebook: 'Grace Effiom',
    instagram: '@grace_effiom',

    // Guarantors
    guarantors: [
      {
        fullName: 'Debby Ogana',
        phoneNumber: '07060780922',
        emailAddress: 'debby@gmail.com',
        relationship: 'Sister',
      },
      {
        fullName: 'Debby Ogana',
        phoneNumber: '07060780922',
        emailAddress: 'debby@gmail.com',
        relationship: 'Sister',
      },
    ],
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleBlacklist = () => {
    console.log('Blacklist user:', userDetails.fullName);
  };

  const handleActivate = () => {
    console.log('Activate user:', userDetails.fullName);
  };

  const user = {
    id: userId || '1',
    firstName: userDetails.fullName.split(' ')[0],
    lastName: userDetails.fullName.split(' ')[1],
    userTierId: 'LSQFf587g90',
    tier: 3,
    accountBalance: '₦200,000.00',
    accountNumber: '9912345678/Providus Bank',
  };

  return (
    <DashboardLayout>
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
