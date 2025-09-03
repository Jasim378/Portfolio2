const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Form Submission Endpoint
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Form Data:', { name, email, message });

  // Simulate saving to a database
  setTimeout(() => {
    res.status(200).json({ message: 'Form submitted successfully!' });
  }, 1000);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});