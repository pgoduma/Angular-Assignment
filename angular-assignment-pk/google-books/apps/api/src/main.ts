
const express = require("express");
const apiErrorHandler = require('./app/error/api-error-handler');
import { bookRoutes } from './app/routes/books';

const app = express();
const books = bookRoutes(express);
const port = process.env.port || 3333;


app.use('/api', books);
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});
app.use(apiErrorHandler);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});