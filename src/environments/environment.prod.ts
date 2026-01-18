import packageJson from '../../package.json';

export const environment = {
  production: true,
  isRedirectWarningActive: true,
  appVersion: packageJson.version,
};
