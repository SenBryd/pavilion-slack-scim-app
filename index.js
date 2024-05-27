const { App } = require('@slack/bolt');
const app = new App({
  token: process.env.SLACK_USER_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

require('./app')(app);

(async () => {
  await app.start(process.env.PORT);
  console.log('⚡️ Pavilion SCIM app is running!');
})();
