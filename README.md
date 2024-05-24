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
     `cd tic-tac-toe`

2. Install dependencies:
     `yarn install`
       `yarn playwright install`, to install praywright chromium browser

3. Set the Node.js version using .nvmrc (optional, if using nvm):
     `nvm use`

## Running the Development Server
  To start the development server, run:
    `yarn dev`
      The application will be available at http://127.0.0.1:5173.

## Running Tests

### Unit Tests
 To run unit tests using Vitest:
   `yarn test:unit`

### End-to-End Tests
To run end-to-end tests using Playwright:
    `yarn test:e2e`

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
          build_and_deploy:
            runs-on: ubuntu-latest

            steps:
            - name: Checkout code
              uses: actions/checkout@v2

            - name: Set up Node.js
              uses: actions/setup-node@v2
              with:
                node-version: '16'

            - name: Install dependencies
              run: yarn install

            - name: Install Playwright browsers
              run: yarn playwright install

            - name: Verify vitest installation
              run: yarn list vitest

            - name: Start the development server
              run: |
                yarn dev > server.log 2>&1 &
                sleep 5
                cat server.log

            - name: Wait for server to be up
              run: |
                for i in $(seq 1 60); do
                  curl -s http://127.0.0.1:5173 > /dev/null && break
                  echo "Waiting for server... ($i)"
                  sleep 1
                done
                curl -s http://127.0.0.1:5173

            - name: Run unit tests
              run: yarn test:unit

            - name: Run e2e tests
              run: yarn test:e2e

            - name: Build the project
              run: yarn build

            - name: List build directory contents
              run: ls -al ./dist  

            - name: Copy dist to temporary location
              run: cp -r dist /tmp/dist

            - name: Configure Git
              run: |
                git config --global user.name "github-actions[bot]"
                git config --global user.email "github-actions[bot]@users.noreply.github.com"

            - name: Ensure gh-pages branch exists
              run: |
                git fetch origin
                if ! git rev-parse --verify origin/gh-pages; then
                  git checkout --orphan gh-pages
                  git reset --hard
                  git commit --allow-empty -m "Initial gh-pages commit"
                  git push origin gh-pages
                fi

            - name: Checkout gh-pages branch
              run: |
                git checkout gh-pages
              env:
                GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

            - name: Copy build files to gh-pages branch
              run: |
                rm -rf ./*
                cp -r /tmp/dist/* .
                git add --all
                git commit -m "deploy: ${{ github.sha }}" || echo "Nothing to commit"
                git push origin gh-pages
              env:
                GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

            - name: List root directory contents after copy
              run: ls -al

            - name: Deploy to GitHub Pages
              uses: peaceiris/actions-gh-pages@v3
              with:
                github_token: ${{ secrets.GITHUB_TOKEN }}
                publish_branch: gh-pages
                publish_dir: . 
## Deployment
    The project is configured to deploy to GitHub Pages. To manually deploy the project, run:

      yarn build
      yarn deploy

        The deployment script will push the contents of the dist folder to the gh-pages branch.

        Project Structure

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
- Replace `your-repo-name` with your actual GitHub repository name.
- Ensure that your `.github/workflows/ci.yml` file and other configuration files are correctly set up in your repository.
- Ensure your GITHUB_TOKEN, has read and write permissions, you can change them on your git respository/settings/Actions/General
- Ensure gh-pages branch is selected as your build and deploy branch on git repository/Pages under Branch select `gh-pages` and folder `root`
- The `yarn deploy` command relies on the `gh-pages` package and a deploy script in `package.json`.

### Additional Configuration in `package.json` for Deployment

Ensure your `package.json` includes the deploy script:

```json
{
  "name": "tic-tac-toe",
  "version": "1.0.0",
  "homepage": "https://{{your-repo-name}}.github.io/tic-tac-toe",
  "scripts": {
    "dev": "vite",
    "test:unit": "vitest --config vitest.config.js",
    "test:e2e": "playwright test",
    "build": "vite build",
    "deploy": "gh-pages -d dist"
  },
  "devDependencies": {
    "@playwright/test": "^1.13.0",
    "gh-pages": "^6.1.1",
    "jsdom": "^22.0.0",
    "playwright": "^1.13.0",
    "rollup": "^2.52.7",
    "vite": "^4.5.0",
    "vitest": "^0.34.6",
    "wait-on": "^6.0.1"
  },
  "resolutions": {
    "vite": "4.5.0"
  }
}

