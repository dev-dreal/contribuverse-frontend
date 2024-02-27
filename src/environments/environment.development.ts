export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  socketUrl: 'http://localhost:3000',

  auth: {
    domain: process.env?.['DOMAIN'] || '',
    clientId: process.env?.['CLIENT_ID'] || '',
  },
};
