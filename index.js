const PORT = 3000;

const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(cors());



app.get('/bfhl', async (req, res) => {
  res.send("Request Sucessfuy")
})


app.post('/bfhl', async (req, res) => {
  const { data } = req.body
  const userid = "joyalshine_04062003"
  const success = true
  const email = "joyalshine2003@gmail.com"
  const regno = "21BBBS0023"
  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = '';

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
          highestLowercaseAlphabet = item;
        }
      }
    }
  });
  console.log(req.body.data)
  const lowerCase = []
  if(highestLowercaseAlphabet != "") lowerCase.push(highestLowercaseAlphabet)
  res.send({
    "is_success": success,
    "user_id": userid,
    "email": email,
    "roll_number":regno,
    "numbers": numbers,
    "alphabets": alphabets,
    "highest_lowercase_alphabet": lowerCase

  })
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
