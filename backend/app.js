const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const employeesRoutes = require('./routes/employees');
const teamsRoutes = require('./routes/teams');
const rolesRoutes = require('./routes/roles');
const usersRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(usersRoutes);
app.use(employeesRoutes);
app.use(teamsRoutes);
app.use(rolesRoutes);

app.use((err, req, res, next) => {
  let message;
  let statusCode;

  if (!err.message) {
    message = 'Internal server error';
  } else {
    message = err.message;
  }
  if (!err.statusCode) {
    statusCode = 500;
  } else {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({ message: message, statusCode: statusCode });
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
  .catch((error) => console.log(error));
