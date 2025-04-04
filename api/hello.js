const axios = require('axios');

module.exports = async (req, res) => {
  const dropboxUrl = 'https://www.dropbox.com/scl/fo/4f8nxi1mxbmjvohrxropd/ABytmHRqBtj7m9DikbsAG-0?e=1&preview=day_pattern.csv&rlkey=9krbwmbbmiln2p7qm0hmuo6l3&st=rvo9532j&dl=1';

  try {
    const response = await axios.get(dropboxUrl, {
      responseType: 'arraybuffer', // Get raw binary data
    });

    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error downloading file from Dropbox:', error.message);
    res.status(500).json({ error: 'Failed to download file from Dropbox' });
  }
};
