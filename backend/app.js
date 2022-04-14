const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const employeesRoute = require('./routes/employees');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(employeesRoute);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(
    'mongodb+srv://cata:Z1R6IlgfwWpN1qlM@cluster0.sgy00.mongodb.net/hrAppDb?retryWrites=true&w=majority'
  )
  .then(() => {
    const PORT = 8000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => next(error));
