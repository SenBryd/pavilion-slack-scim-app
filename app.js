const { App } = require('@slack/bolt');
const axios = require('axios');
const app = new App({
});

app.post('/provision', async ({ request, response }) => {
  try {
    const userData = request.body;
    const provisionResponse = await axios.post(
      'https://api.slack.com/scim/v2/Users',
      userData,
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_USER_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    response.status(200).send(provisionResponse.data);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/deprovision', async ({ request, response }) => {
  try {
    const { userId } = request.body;
    const deprovisionResponse = await axios.delete(
      `https://api.slack.com/scim/v2/Users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_USER_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    response.status(200).send(deprovisionResponse.data);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
