const { App } = require('@slack/bolt');
const appLogic = require('./app');

const app = new App({
  token: process.env.SLACK_USER_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

appLogic(app);

(async () => {
  await app.start(process.env.PORT);
  console.log('⚡️ Bolt app is running!');
})();
