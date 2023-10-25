const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.use('/api', api);

// GET route for the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// // GET route for the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// route for a GET request that will return the content of `db.json` file
app.get('/api', (req, res) =>
  res.json(db)
);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  