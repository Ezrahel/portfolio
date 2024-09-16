const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS to allow requests from the frontend
app.use(cors());

// Serve static files from the 'client' directory
app.use(express.static('client'));

// Route to serve HTML files (home.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/client/port.html');
});
// POST route to handle sending emails
app.post('/send_email', async (req, res) => {
  const { name, email, mobile, location, time, date, timeZone, message } = req.body;

  if (!name || !email || !mobile || !location || !time || !date || !timeZone || !message) {
    return res.status(400).send('All fields are required.');
  }

  const url = process.env.SENDINBLUE_API_URL;

  const headers = {
    "Content-Type": "application/json",
    "accept": "application/json",
    "api-key": process.env.SENDINBLUE_API_KEY
  };

  const emailData = {
    sender: { email: 'bettycarnegie768@gmail.com', name: 'From Sarah\'s webclick' }, // Use your verified email
    to: [{ email: "adelakinisrael024@gmail.com", name: "Big Man" }], // Recipient email
    subject: "New Contact Form Message",
    htmlContent: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time Zone:</strong> ${timeZone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };

  try {
    const response = await axios.post(url, emailData, { headers });

    if (response.status === 201 || response.status === 202) {
      res.status(200).send('Message sent successfully!');
    } else {
      res.status(response.status).send(`Failed to send message: ${response.data}`);
    }
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
    res.status(500).send('An error occurred while sending the message.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
