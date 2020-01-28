const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const History = require('./models/History');

mongoose
  .connect('mongodb://db:27017/local', {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDb Connected'))
  .catch(console.log);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.get('/api/history', async (req, res) => {
  try {
    const history = await History.find();

    res.json(history);
  } catch (e) {
    console.log(e);
    res.status(404).end('not found');
  }
});

app.post('/api/history', async (req, res) => {
  try {
    const history = await new History({
      equation: req.body.equation
    }).save();

    res.json(history);
  } catch (e) {
    console.log(e);
    res.status(500).end('error');
  }
});

app.listen(3000, () => {
  console.log('===============================');
  console.log('App is listening on port 3000');
});
