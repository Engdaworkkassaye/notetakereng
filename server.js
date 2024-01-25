
const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 5001;


app.use(express.json());


const publicPath = path.join(__dirname, 'public');
const dbPath = path.join(__dirname, '/db/db.json');


app.use('/assets', express.static(path.join(publicPath, 'assets')));


app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(publicPath, 'notes.html'));
});
app.get('/api/notes', (req, res) => {
  
  fs.readFile(dbPath,  (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});


app.post('/api/notes', (req, res) => {
  
  fs.readFile(dbPath,  (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

  
    const notes = JSON.parse(data);

    
    const newNote = {
      title: req.body.title,
      text: req.body.text,
    };

    
   
    notes.push(newNote);

    
    fs.writeFile(dbPath, JSON.stringify(notes),  (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
      
        res.json(newNote);
      }
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});