const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const app = express();


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

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });

  