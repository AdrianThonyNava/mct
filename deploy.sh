#!/bin/bash

# Build the project
npm run build

# Create necessary directories
mkdir -p dist/public/assets

# Copy static assets
cp -r client/public/* dist/public/assets/

# Create a .nojekyll file to bypass Jekyll processing on GitHub Pages
touch dist/public/.nojekyll

# Create a custom 404 page that redirects to index
cat > dist/public/404.html << EOL
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0;url=/menstrual-cycle-tracker/">
    <title>Redirecting...</title>
  </head>
  <body>
    <script>
      window.location.href = '/menstrual-cycle-tracker/' + window.location.pathname.replace(/^\/[^\/]+/, '');
    </script>
    Redirecting to home page...
  </body>
</html>
EOL

# Create an optimized index.html for GitHub Pages
cat > dist/public/index.html << EOL
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>CycleSage - Partner's Cycle Tracker</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Understanding your partner's cycle - A comprehensive menstrual cycle tracker">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; font-src 'self' data:;">
    <base href="/menstrual-cycle-tracker/">
    <link rel="stylesheet" href="./assets/index.css">
    <script>
      // Handle GitHub Pages 404 redirects
      (function() {
        const redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        if (redirect && redirect !== location.href) {
          history.replaceState(null, null, redirect);
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./assets/index.js"></script>
  </body>
</html>
EOL