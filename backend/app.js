const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const employeesRoutes = require('./routes/employees');
const teamsRoutes = require('./routes/teams');
const rolesRoutes = require('./routes/roles');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(employeesRoutes);
app.use(teamsRoutes);
app.use(rolesRoutes);

app.use((err, req, res, next) => {
  let msg = err.message;
  let status = err.statusCode;
  res.status(status).json({ message: msg, statusCode: status || 500 });
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
