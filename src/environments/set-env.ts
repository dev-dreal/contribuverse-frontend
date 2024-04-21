const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  const colors = require('colors');
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    appVersion: "${appVersion}",
    production: true,
    firebaseConfig: {
      apiKey: "${process.env['FIREBASE_apiKey']}",
      authDomain: "${process.env['FIREBASE_authDomain']}",
      projectId: "${process.env['FIREBASE_projectId']}",
      storageBucket: "${process.env['FIREBASE_storageBucket']}",
      messagingSenderId: "${process.env['FIREBASE_messagingSenderId']}",
      appId: "${process.env['FIREBASE_appId']}"
    },
  };
  `;
  console.log(
    colors.magenta(
      'The file `environment.ts` will be written with the following content: \n',
    ),
  );
  writeFile(targetPath, envConfigFile, (err: unknown) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        colors.magenta(
          `Angular environment.ts file generated correctly at ${targetPath} \n`,
        ),
      );
    }
  });
};
setEnv();
