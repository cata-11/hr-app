const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const employeesRoute = require('./routes/employees');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(employeesRoute);

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
  .catch((err) => console.log(err));
