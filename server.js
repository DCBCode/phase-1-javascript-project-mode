const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const jsonData = require('./db.json');

app.get('/cats', (req, res) => {
  res.json(jsonData.data);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});