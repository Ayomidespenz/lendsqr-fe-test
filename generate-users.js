// generate-users.js
// Run with: node generate-users.js
// This will create a db.json file with 500 users

const fs = require('fs');

const organizations = ['Lendsqr', 'LendStart', 'Fintech Pro', 'Credit Hub', 'MoneyFlow', 'FastCredit', 'Trust Finance', 'Capital Rise', 'PayLoan', 'CashFlow'];
const statuses = ['active', 'inactive', 'pending', 'blacklisted'];
const firstNames = ['Grace', 'John', 'Mary', 'David', 'Sarah', 'Michael', 'Emma', 'James', 'Adekunle', 'Olatunji', 'Chioma', 'Amara', 'Tunde', 'Blessing', 'Naomi', 'James', 'Zainab', 'David', 'Angela', 'Robert'];
const lastNames = ['Effiom', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Adebisi', 'Femi', 'Nwosu', 'Okonkwo', 'Ajibade', 'Olowa', 'Adeyemi', 'Murphy', 'Hussein', 'Okafor', 'Thompson', 'Martinez'];
const banks = ['Providus Bank', 'GTBank', 'Access Bank', 'First Bank', 'UBA', 'Zenith Bank', 'FCMB', 'Fidelity Bank'];
const sectors = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Education', 'Telecommunications', 'Energy'];
const relationships = ['Brother', 'Sister', 'Parent', 'Friend', 'Spouse', 'Colleague'];
const residences = ["Parent's Apartment", 'Own House', 'Rented Apartment', 'Office'];
const educationLevels = ['B.Sc', 'M.Sc', 'HND', 'ND', 'Diploma', 'High School'];
const employmentStatuses = ['Employed', 'Self-employed', 'Unemployed', 'Freelancer'];

function generateUser(id) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const year = 2018 + Math.floor(Math.random() * 6);
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  
  return {
    id: String(id),
    organization: organizations[Math.floor(Math.random() * organizations.length)],
    username: `user_${firstName.toLowerCase()}_${id}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@email.com`,
    phoneNumber: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
    dateJoined: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month - 1]} ${day}, ${year}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    firstName: firstName,
    lastName: lastName,
    tier: Math.floor(Math.random() * 3) + 1,
    userTierId: `LSQF${String(id).padStart(6, '0')}`,
    accountNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}/${banks[Math.floor(Math.random() * banks.length)]}`,
    accountBalance: `₦${(Math.random() * 5000000).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    bvn: String(Math.floor(Math.random() * 9000000000) + 1000000000),
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    maritalStatus: ['Single', 'Married', 'Divorced', 'Widowed'][Math.floor(Math.random() * 4)],
    children: Math.random() > 0.6 ? 'None' : String(Math.floor(Math.random() * 5) + 1),
    typeOfResidence: residences[Math.floor(Math.random() * residences.length)],
    levelOfEducation: educationLevels[Math.floor(Math.random() * educationLevels.length)],
    employmentStatus: employmentStatuses[Math.floor(Math.random() * employmentStatuses.length)],
    sectorOfEmployment: sectors[Math.floor(Math.random() * sectors.length)],
    durationOfEmployment: `${Math.floor(Math.random() * 25) + 1} years`,
    officeEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@lendsqr.com`,
    monthlyIncome: `₦${(Math.random() * 5000000).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`,
    loanRepayment: `₦${(Math.random() * 500000).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`,
    twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    facebook: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    guarantors: [
      {
        fullName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        phoneNumber: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
        emailAddress: `guarantor${id}@gmail.com`,
        relationship: relationships[Math.floor(Math.random() * relationships.length)]
      },
      {
        fullName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        phoneNumber: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
        emailAddress: `guarantor${id + 1}@gmail.com`,
        relationship: relationships[Math.floor(Math.random() * relationships.length)]
      }
    ]
  };
}

function generateDatabase() {
  console.log('📊 Generating 500 users...');
  const users = [];
  
  for (let i = 1; i <= 500; i++) {
    users.push(generateUser(i));
    if (i % 50 === 0) {
      console.log(`✓ Generated ${i} users...`);
    }
  }
  
  const db = { users };
  
  // Write to file
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  console.log(`✅ Successfully generated 500 users in db.json`);
  console.log(`📁 File size: ${(fs.statSync('db.json').size / 1024).toFixed(2)} KB`);
  console.log(`\n🚀 Now run: json-server --watch db.json --port 3001`);
}

generateDatabase();
