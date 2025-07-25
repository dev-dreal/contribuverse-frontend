# Contribuverse Frontend

A modern Angular web application that serves as a platform where AI takes center stage in contribution and consumption of information. Contribuverse enables users to interact with AI-driven content creation, curation, and knowledge sharing in an intuitive and engaging interface.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Build & Deployment](#build--deployment)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Support](#support)

## Prerequisites

Before you begin, ensure you have the following software installed on your development machine:

### Required Software

- **Node.js** (version 18.x or higher recommended)
  - Download from: [https://nodejs.org/](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js, version 9.x or higher)
  - Verify installation: `npm --version`

- **Angular CLI** (version 18.0.0 or compatible)
  - Install globally: `npm install -g @angular/cli@18`
  - Verify installation: `ng version`

- **Git** (for version control)
  - Download from: [https://git-scm.com/](https://git-scm.com/)
  - Verify installation: `git --version`

### Recommended Tools

- **Visual Studio Code** with Angular extensions
- **Chrome DevTools** for debugging
- **Postman** or similar tool for API testing (if applicable)

## Installation

Follow these steps to set up the development environment:

### 1. Clone the Repository

```bash
git clone https://github.com/dev-dreal/contribuverse-frontend.git
cd contribuverse-frontend
```

### 2. Install Dependencies

```bash
npm install
```

This command will install all the required dependencies listed in `package.json`. The installation process may take a few minutes depending on your internet connection.

### 3. Environment Configuration

This project uses a custom environment configuration setup. Run the configuration script to set up your environment:

```bash
npm run config
```

This command runs `ts-node src/environments/set-env.ts` which processes environment variables. Make sure you have the necessary environment variables configured in your system or `.env` file.

**Note:** Check with the code maintainer for any required environment variables or API keys that need to be configured.

### 4. Verify Installation

Run the following command to ensure everything is set up correctly:

```bash
ng version
```

You should see output showing the Angular CLI version and project dependencies.

## Running the Application

### Development Server

To start the local development server:

```bash
npm start
# or
ng serve
```

- Open your browser and navigate to `http://localhost:4200/`
- The application will automatically reload when you make changes to source files
- Use `Ctrl + C` (or `Cmd + C` on Mac) to stop the server

### Development Server Options

```bash
# Run on a different port
ng serve --port 4300

# Run with specific environment
ng serve --configuration=production

# Open browser automatically
ng serve --open
```

## Running Tests

### Unit Tests

Execute unit tests using Karma test runner:

```bash
ng test
```

- Tests will run in watch mode by default
- Browser window will open showing test results
- Tests automatically re-run when files change

#### Run Tests Once (CI Mode)

```bash
ng test --watch=false --browsers=ChromeHeadless
```

### End-to-End Tests

**Important:** This project currently does not have an E2E testing framework configured. The `ng e2e` command is not available in the current setup.

#### Setting Up E2E Testing

If you need to add E2E testing capabilities, you have several options:

**Option 1: Cypress (Recommended)**
```bash
# Install Cypress
npm install --save-dev cypress

# Initialize Cypress
npx cypress open

# Add Cypress Angular schematic (optional)
ng add @cypress/schematic
```

**Option 2: Playwright**
```bash
# Install Playwright
npm install --save-dev @playwright/test

# Initialize Playwright
npx playwright install
```

**Option 3: WebDriver/Protractor Alternative**
```bash
# Install WebDriver IO
npm install --save-dev @wdio/cli
npx wdio config
```

#### Running E2E Tests (After Setup)

Once you've configured an E2E framework:

```bash
# For Cypress
npx cypress open          # Interactive mode
npx cypress run           # Headless mode

# For Playwright
npx playwright test       # Run all tests
npx playwright test --ui  # Interactive UI mode

# For WebDriver
npx wdio run wdio.conf.js
```

### Test Coverage

Generate test coverage reports:

```bash
ng test --code-coverage
```

Coverage reports will be generated in the `coverage/` directory.

## Build & Deployment

### Development Build

```bash
npm run build
# or
ng build
```

**Note:** The build command automatically runs the environment configuration (`npm run config`) before building.

Build artifacts will be stored in the `dist/` directory.

### Production Build

```bash
npm run build -- --configuration=production
# or
ng build --configuration=production
```

**Note:** Always run the build command using `npm run build` to ensure environment variables are properly configured.

This creates an optimized build with:
- Minified files
- Tree-shaking for unused code
- Ahead-of-time (AOT) compilation
- Production environment configurations

### Build Output

The build process generates:
- Bundled JavaScript files
- CSS stylesheets
- Static assets
- `index.html` with proper asset references

### Deployment

**Note:** Deployment process depends on your hosting environment. Common options include:

- **Static hosting:** Upload `dist/` contents to services like Netlify, Vercel, or GitHub Pages
- **Docker:** Use the generated build artifacts in a containerized environment
- **CI/CD pipelines:** Integrate with GitHub Actions, GitLab CI, or similar services

Consult with your DevOps team for specific deployment procedures.

## Project Structure

```
contribuverse-frontend/
├── src/
│   ├── app/                 # Application source code
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── environments/       # Environment-specific configurations
│   └── styles/             # Global styles
├── dist/                   # Build output (generated)
├── node_modules/          # Dependencies (generated)
├── angular.json           # Angular CLI configuration
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Development Guidelines

### Code Scaffolding

Generate new components and services using Angular CLI:

```bash
# Generate a new component
ng generate component component-name

# Generate a service
ng generate service services/service-name

# Generate other artifacts
ng generate directive|pipe|guard|interface|enum|module name
```

### Development Best Practices

- Follow Angular style guide conventions
- Write unit tests for new components and services
- Use meaningful commit messages
- Keep components focused and single-purpose
- Implement proper error handling

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process using port 4200
npx kill-port 4200
# Or use a different port
ng serve --port 4300
```

**Node version compatibility:**
```bash
# Check your Node version
node --version
# Consider using Node Version Manager (nvm) for version management
```

**Dependencies issues:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Angular CLI issues:**
```bash
# Update Angular CLI globally
npm update -g @angular/cli
# Update project dependencies
ng update
```

### Getting Help

- Check the [Angular CLI documentation](https://angular.io/cli)
- Review Angular framework documentation at [angular.io](https://angular.io/)
- Search existing issues in the project repository

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

### Before Submitting PRs

- Ensure all tests pass: `npm run test`
- Run linting: `ng lint` (if configured)
- Update documentation if necessary
- Follow the project's coding standards

## Support

If you encounter any issues or have questions:

1. Check this README and project documentation
2. Search existing GitHub issues
3. Create a new issue with detailed information about the problem
4. Contact the development team

---

**Project Information:**
- Angular CLI Version: 18.0.0
- Node.js Version: 20.x+
- Repository: [https://github.com/dev-dreal/contribuverse-frontend](https://github.com/dev-dreal/contribuverse-frontend)