const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');


const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// creates routes for everything in public folder
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
app.get('/api/notes', (req, res) =>

  res.json(db)
);

// POST request
app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    console.log(req.body);
    db.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        return res.status(200).json(req.body);
    })

    // Let the client know that their POST request was received
    // res.json(`${req.method} request received`);
  
    // // Log our request to the terminal
    // console.info(`${req.method} request received`);

//     const { title, text } = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newNote = {
//       title,
//       text
//     }
  });


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  