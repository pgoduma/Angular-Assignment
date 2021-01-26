const express = require("express");
const path = require('path');
const app = express();
const port = process.env.port || 3000;

const books = require('./server/routes/books');

app.use(express.static(path.join(__dirname, 'dist/apps/google-books-assignment')));
app.use('/api', books);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/apps/google-books-assignment/index.html'));
});

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
