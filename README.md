## Rules for Working with the `deploy` branch:

1. In the working branch (e.g., `develop` or `release/login-registration-main`), execute the command:
   ```
   npm run build:prod
   ```
2. Checkout to the `deploy` branch
   ```
   git checkout deploy
   ```
3. Place the corresponding build files in the directory (for example, in the 'sprint-1' folder, include index.html, CSS and JS files).

4. Perform deployment to render.com from this branch. Choose the appropriate folder based on the sprint.
