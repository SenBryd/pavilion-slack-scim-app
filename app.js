const axios = require('axios');

const SCIM_BASE_URL = 'https://api.slack.com/scim/v2';

module.exports = (app) => {
  app.post('/register', async ({ req, res }) => {
    const userInfo = req.body;
    try {
      const response = await axios.post(`${SCIM_BASE_URL}/Users`, userInfo, {
        headers: {
          Authorization: 'Bearer your-slack-token-here',
          'Content-Type': 'application/json'
        }
      });
      res.status(200).send(response.data);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/update', async ({ req, res }) => {
    const { id, ...updateInfo } = req.body;
    try {
      const response = await axios.patch(`${SCIM_BASE_URL}/Users/${id}`, updateInfo, {
        headers: {
          Authorization: 'Bearer your-slack-token-here',
          'Content-Type': 'application/json'
        }
      });
      res.status(200).send(response.data);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/deprovision', async ({ req, res }) => {
    const { email } = req.body;
    try {
      const usersResponse = await axios.get(`${SCIM_BASE_URL}/Users`, {
        headers: {
          Authorization: 'Bearer your-slack-token-here',
          'Content-Type': 'application/json'
        }
      });
      const user = usersResponse.data.Resources.find(u => u.emails[0].value === email);
      if (user) {
        await axios.delete(`${SCIM_BASE_URL}/Users/${user.id}`, {
          headers: {
            Authorization: 'Bearer your-slack-token-here',
            'Content-Type': 'application/json'
          }
        });
        res.status(200).send({ message: 'User deprovisioned successfully.' });
      } else {
        res.status(404).send({ message: 'User not found.' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
