
const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT =  3000;


app.use(express.json());


const publicPath = path.join(__dirname, 'public');
const dbPath = path.join(__dirname, '/db/db.json');


app.use('/assets', express.static(path.join(publicPath, 'assets')));


app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});