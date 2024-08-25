const PORT = 5000;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/bfhl', async (req, res) => {
  res.send("Request Successful");
});

app.post('/bfhl', async (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).send({
        "is_success": false,
        "message": "Invalid input: 'data' should be an array."
      });
    }

    const userid = "joyalshine_04062003";
    const email = "joyalshine2003@gmail.com";
    const regno = "21BBBS0023";
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
      if (typeof item === 'string' || typeof item === 'number') {
        if (!isNaN(item)) {
          numbers.push(item);
        } else if (typeof item === 'string') {
          alphabets.push(item);
          if (item === item.toLowerCase() && /^[a-z]$/.test(item)) {
            if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
              highestLowercaseAlphabet = item;
            }
          }
        }
      } else {
        return res.status(400).send({
          "is_success": false,
          "message": `Invalid data type detected: ${item}. Only numbers and single alphabets are allowed.`
        });
      }
    });

    const lowerCase = highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [];

    res.send({
      "is_success": true,
      "user_id": userid,
      "email": email,
      "roll_number": regno,
      "numbers": numbers,
      "alphabets": alphabets,
      "highest_lowercase_alphabet": lowerCase
    });

  } catch (error) {
    console.error('Error handling /bfhl POST request:', error);
    res.status(500).send({
      "is_success": false,
      "message": "An unexpected error occurred. Please try again later."
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send({
    "is_success": false,
    "message": "An unexpected error occurred. Please try again later."
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

