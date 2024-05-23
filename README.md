# Tic Tac Toe

A simple Tic Tac Toe game built using HTML, CSS, and JavaScript. This project includes unit and end-to-end tests, and a CI/CD pipeline configured to deploy to GitHub Pages.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Development Server](#running-the-development-server)
- [Running Tests](#running-tests)
  - [Unit Tests](#unit-tests)
  - [End-to-End Tests](#end-to-end-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## Prerequisites

- [Node.js](https://nodejs.org/) (v16)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/products/docker-desktop) (optional, for local container testing)

## Installation

1. Clone the repository:

   git clone https://github.com/amuvavi/tic-tac-toe.git
   cd tic-tac-toe

2. Install dependencies:
   yarn install

3. Set the Node.js version using .nvmrc (optional, if using nvm):
   nvm use

## Running the Development Server
 To start the development server, run:
    yarn dev
    The application will be available at http://localhost:3000.

## Running Tests

### Unit Tests
 To run unit tests using Vitest:
 yarn test:unit

### End-to-End Tests
To run end-to-end tests using Playwright:
 yarn test:e2e

## CI/CD Pipeline
The project includes a GitHub Actions workflow for CI/CD. The workflow runs on every push to the main branch and performs the following steps:

   1. Checks out the code
   2. Sets up Node.js
   3. Installs dependencies
    4. Runs unit tests
    5. Runs end-to-end tests
    6. Builds the project
    7. Deploys to GitHub Pages

### Workflow Configuration
    The workflow is defined in .github/workflows/ci.yml:

name: CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build_and_test:
    runs-on: ubuntu-latest

    services:
      web:
        image: node:16
        ports:
          - 3000:3000
        options: >-
          --health-cmd="curl -f http://localhost:3000 || exit 1"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: yarn install

    - name: Start the development server
      run: yarn dev &
      env:
        CI: true

    - name: Wait for server to be up
      run: npx wait-on http://localhost:3000

    - name: Run unit tests
      run: yarn test:unit

    - name: Run e2e tests
      run: yarn test:e2e

    - name: Build the project
      run: yarn build

  deploy:
    needs: build_and_test
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Deploy to GitHub Pages
      run: |
        git config --global user.email "you@example.com"
        git config --global user.name "Your Name"
        git add dist -f
        git commit -m "Deploy to GitHub Pages"
        git push origin `git subtree split --prefix dist main`:gh-pages --force
## Deployment
The project is configured to deploy to GitHub Pages. To manually deploy the project, run:

yarn build
yarn deploy

The deployment script will push the contents of the dist folder to the gh-pages branch.

Project Structure
arduino
Copy code
tic-tac-toe/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
├── node_modules/
├── public/
├── src/
│   ├── gameLogic.js
│   ├── index.html
│   ├── script.js
│   ├── styles.css
├── tests/
│   ├── e2e/
│   │   ├── tictactoe.spec.js
│   ├── unit/
│   │   ├── gameLogic.test.js
├── .gitignore
├── .nvmrc
├── package.json
├── playwright.config.js
├── vite.config.js
├── vitest.config.js
├── yarn.lock
License
This project is licensed under the MIT License.


### Notes:
- Replace `your-username` and `your-repo-name` with your actual GitHub username and repository name.
- Ensure that your `.github/workflows/ci.yml` file and other configuration files are correctly set up in your repository.
- The `yarn deploy` command relies on the `gh-pages` package and a deploy script in `package.json`.

### Additional Configuration in `package.json` for Deployment

Ensure your `package.json` includes the deploy script:

```json
{
  "name": "tic-tac-toe",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "test:unit": "vitest --config vitest.config.js",
    "test:e2e": "playwright test",
    "build": "vite build",
    "deploy": "gh-pages -d dist"
  },
  "devDependencies": {
    "@playwright/test": "^1.13.0",
    "playwright": "^1.13.0",
    "vitest": "^0.0.122",
    "vite": "^2.7.10",
    "rollup": "^2.52.7",
    "gh-pages": "^3.2.3",
    "wait-on": "^6.0.1"
  }
}

