export const environment = {
  production: true,

  auth: {
    domain: process.env?.['DOMAIN'] || '',
    clientId: process.env?.['CLIENT_ID'] || '',
  },
};
