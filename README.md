# DartBoard

https://justcode-7.github.io/dart-board/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## GitHub Pages Deployment (PWA)

This project is configured as a Progressive Web App (PWA) and can be deployed to GitHub Pages.

- Build and deploy manually:
  - Ensure your repository name is `dart-board` or adjust the base-href in package.json script.
  - Run: `npm run deploy:gh`
  - This builds with service worker and publishes `dist/dart-board/browser` to the `gh-pages` branch.

- Deploy via GitHub Actions:
  - A workflow is included: `.github/workflows/deploy-gh-pages.yml`.
  - On push to `main` or `master`, it builds the app with `--base-href=/dart-board/ --deploy-url=/dart-board/` and publishes to GitHub Pages.
  - Make sure GitHub Pages is enabled in your repository settings, pointing to the `gh-pages` branch.

Notes:

- The Service Worker is only enabled in production builds.
- The web manifest and icons are included and copied to the output root.
- A `404.html` fallback is provided for SPA routing on GitHub Pages.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
