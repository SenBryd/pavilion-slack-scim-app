const app = require('./app');

(async () => {
  await app.start(process.env.PORT);
  console.log('⚡️ Pavilion SCIM app is running!');
})();
