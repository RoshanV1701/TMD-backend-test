const axios = require('axios');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // or use your frontend origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const dropboxUrl = 'https://drive.google.com/uc?export=download&id=1lU6Ljw6QBEn0rbMOhH3HticlIdB-tbNT';

  try {
    const response = await axios.get(dropboxUrl, {
      responseType: 'arraybuffer',
    });

    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error downloading file from Dropbox:', error.message);
    res.status(500).json({ error: 'Failed to download file from Dropbox' });
  }
};
