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

// route for a POST request
app.post('/api/notes', (req, res) => {
    // creates id property in body, created by uuid 
    req.body.id = uuidv4();
    console.log(req.body);
    // push new object to current db array
    db.push(req.body);
    // create/overwrite json file with db array
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            // response if error in making file
            console.log(err);
            return res.status(500).json(err);
        }
        // response if no error
        return res.status(200).json(req.body);
    })
  });

// route for a DELETE request
app.delete('/api/notes/:id', (req, res) => {
console.log(req.params.id);
db.destroy({
    where: {
      id: req.params.id,
    },
  })
    // fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
    //     if (err) {
    //         // response if error in making file
    //         console.log(err);
    //         return res.status(500).json(err);
    //     }
    //     // response if no error
    //     return res.status(200).json(req.body);
    // })
    //     .then((deletedNote) => {
    //     res.json(deletedNote);
    //     })
    //     .catch((err) => res.json(err));
    });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  