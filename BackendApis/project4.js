//Requirements and app setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const mongoURI = process.env.MONGO_URI

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//MongoDB setup
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Connection to MongoDB failed ', err));

const exerciseSchema = new mongoose.Schema({
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: {type: Date, required: true}
});

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  log: [exerciseSchema]
});

const User = mongoose.model('User', userSchema);

//RESTfulnessy shtuffy sthuff
app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = new User({ username });
    await newUser.save();
    res.json({ username: newUser.username, _id: newUser._id });
  } catch(err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users', async(req,res) => {
  try{
    const users = await User.find({}, 'username _id');
    res.json(users);
  } catch(err) {
    res.status(500).json({Error: err});
  }
});

app.post('/api/users/:_id/exercises', async (req,res) => {
  try{
    const {description, duration, date} = req.body;
    const user = await User.findById(req.params._id);

    if(!user) return res.status(400).json({error: "User not found"});

    const exerciseDate = date ? new Date(date) : new Date();

    const exercise = {
      description: description,
      duration: parseInt(duration),
      date: exerciseDate
    }

    user.log.push(exercise);
    await user.save();

    res.json({
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
      _id: user._id
    });

  } catch(err) {
    res.status(500).json({error: err});
  }
});

app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { from, to, limit } = req.query;
    const user = await User.findById(req.params._id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    let logs = user.log;

    // Filter by date range
    if (from) logs = logs.filter(e => e.date >= new Date(from));
    if (to) logs = logs.filter(e => e.date <= new Date(to));

    // Limit results
    if (limit) logs = logs.slice(0, parseInt(limit));

    const formattedLogs = logs.map(e => ({
      description: e.description,
      duration: e.duration,
      date: e.date.toDateString()
    }));

    res.json({
      username: user.username,
      count: formattedLogs.length,
      _id: user._id,
      log: formattedLogs
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get logs' });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})