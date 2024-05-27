const { App } = require('@slack/bolt');
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

require('./app')(app);

(async () => {
  await app.start(process.env.PORT)
  console.log('⚡️ Bolt app is running!');
})();
