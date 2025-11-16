# 🎯 Lendsqr Frontend

A professional, responsive admin dashboard for comprehensive user management built with React, TypeScript, and modern web technologies. Manage users, track activities, and oversee operations with an intuitive, feature-rich interface designed for maximum efficiency and user experience.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-7.2.2-yellow?logo=vite) ![SCSS](https://img.shields.io/badge/SCSS-Modules-pink?logo=sass) ![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation--setup)
- [Usage](#-usage)
- [Available Scripts](#-available-scripts)
- [API Integration](#-api-integration)
- [Styling & Themes](#-styling--themes)
- [Performance Optimization](#-performance-optimization)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support & Documentation](#-support--documentation)

## Overview

Lendsqr Frontend is an enterprise-grade administrative dashboard built to provide financial institutions with comprehensive user management capabilities. The application offers real-time data insights, advanced filtering mechanisms, and intuitive navigation for managing thousands of user profiles efficiently.

**Target Users**: Bank administrators, loan officers, compliance managers, and financial operations teams

**Primary Use Cases**:
- User account management and profile administration
- Financial status monitoring and analytics
- User action auditing and activity tracking
- Loan application processing and management
- Risk assessment and user blacklisting

## ✨ Key Features

### 👥 User Management
- **500+ User Database**: Comprehensive user profiles with detailed information
- **Advanced Filtering**: Filter by organization, status, date range, and more
- **Real-time Search**: Instant user lookup with optimized performance
- **Bulk Actions**: Activate, deactivate, or blacklist multiple users
- **Detailed Profiles**: Complete user information including financial data, employment, and guarantors

### 📊 Dashboard Analytics
- **User Statistics**: Active, inactive, pending, and blacklisted user counts
- **Activity Monitoring**: Track user actions and system events
- **Data Visualization**: Charts and graphs for insights
- **Performance Metrics**: Response times and system health

### 🔐 Security & Authentication
- **Secure Login**: Protected routes with token-based authentication
- **Role-based Access**: Different permission levels for admin actions
- **Session Management**: Automatic logout and session handling
- **Data Protection**: Secure API communication with error handling

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Themes**: Customizable interface themes
- **Intuitive Navigation**: Clean sidebar navigation with breadcrumbs
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading indicators and skeleton screens

## 🚀 Tech Stack

### Frontend Framework
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.2.2** - Lightning-fast build tool and dev server

### Styling & UI
- **SCSS Modules** - Component-scoped styling
- **CSS Grid & Flexbox** - Modern layout systems
- **Responsive Design** - Mobile-first approach

### State Management & Data
- **React Hooks** - Modern state management
- **Axios** - HTTP client with interceptors
- **Local Storage** - Client-side caching
- **Custom Hooks** - Reusable data fetching logic

### Routing & Navigation
- **React Router 7.9.5** - Declarative routing
- **Protected Routes** - Authentication guards
- **Dynamic Routing** - User detail pages

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript Compiler** - Type checking
- **Vite Dev Server** - Hot module replacement
- **Jest & Testing Library** - Unit testing

## 📦 Installation & Setup

### Prerequisites
- **Node.js** 18+ and npm
- **Git** for version control
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lendsqr-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the API**
   ```bash
   # Option 1: JSON Server (Recommended for development)
   npm install -g json-server
   node generate-users.js  # Creates db.json with 500 users
   json-server --watch db.json --port 3001

   # Option 2: Use existing API endpoint
   # Update API_URL in src/services/userApi.ts
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5177
   ```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=Lendsqr Admin
VITE_APP_VERSION=1.0.0
```

## 📁 Project Structure

```
lendsqr-frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, fonts
│   ├── components/        # Reusable UI components
│   │   ├── Button.tsx     # Button component
│   │   ├── Table.tsx      # Data table component
│   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── LoginPage.tsx  # Authentication page
│   │   ├── DashboardPage.tsx  # Main dashboard
│   │   └── UserDetailsPage.tsx # User detail view
│   ├── services/          # API services
│   │   └── userApi.ts     # User API functions
│   ├── styles/            # Global styles and mixins
│   │   ├── global.scss    # Global CSS
│   │   ├── variables.scss # CSS variables
│   │   └── mixins.scss    # SCSS mixins
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── docs/                  # Documentation
├── scripts/               # Build and utility scripts
├── tests/                 # Test files
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## 🎮 Usage

### Login
- **Email**: Any valid email format
- **Password**: Minimum 6 characters
- Default credentials work for demo purposes

### Dashboard Navigation
- **Users**: View and manage all users
- **Filter**: Use advanced filters to find specific users
- **Search**: Search by name, email, or organization
- **Pagination**: Navigate through user pages
- **Actions**: Activate, deactivate, or view user details

### User Management
- **View Details**: Click any user row to see full profile
- **Status Changes**: Use action menus to change user status
- **Bulk Operations**: Select multiple users for batch actions
- **Export**: Export user data (planned feature)

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Utilities
npm run format       # Format code with Prettier
npm run clean        # Clean build artifacts
```

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow coding standards
   - Write tests for new features
   - Update documentation

3. **Test Your Changes**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[📖 Full Documentation](docs/README.md)** - Complete documentation index
- **[🚀 API Integration](docs/api/integration.md)** - API setup and usage
- **[🧩 Components](docs/components/README.md)** - Component library and examples
- **[🏗️ Architecture](docs/architecture/overview.md)** - System design and patterns
- **[🚀 Deployment](docs/deployment/README.md)** - Production deployment guide

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/development/contributing.md) for details.

### Quick Contribution Steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lendsqr Team** - For the opportunity to build this amazing platform
- **React Community** - For the incredible ecosystem
- **Open Source Contributors** - For the tools and libraries that make this possible

## 📞 Support

- **Documentation**: [Full Documentation](docs/README.md)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)

---

**Built with ❤️ by the Lendsqr Development Team**

*Last updated: November 15, 2025*
