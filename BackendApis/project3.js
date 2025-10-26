require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const urlDB = new Map();
let urlCounter = 1;

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return res.json({ error: 'invalid url' });
    }

    urlDB.set(urlCounter, url);
    res.json({ original_url: url, short_url: urlCounter });
    urlCounter++;

  } catch (err) {
    res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const originalUrl = urlDB.get(id);

  if (!originalUrl) return res.json({ error: 'No short URL found for given input' });

  res.redirect(originalUrl);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});