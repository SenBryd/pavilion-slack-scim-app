const axios = require('axios');

module.exports = (app) => {
  app.post('/Users', async ({ request, response }) => {
    const userData = request.body;
    try {
      const provisionResponse = await axios.post('https://api.slack.com/scim/v2/Users', userData, {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_USER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      response.status(200).send(provisionResponse.data);
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  });

  app.delete('/scim/v2/Users/:email', async ({ request, response }) => {
    const userEmail = request.params.email;
    try {
      // Find the user by email
      const usersResponse = await axios.get('https://api.slack.com/scim/v2/Users', {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_USER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      const user = usersResponse.data.Resources.find(u => u.emails.some(e => e.value === userEmail));
      if (!user) {
        return response.status(404).send('User not found');
      }

      // De-provision the user
      const userId = user.id;
      await axios.delete(`https://api.slack.com/scim/v2/Users/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_USER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      response.status(204).send();
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  });
};
