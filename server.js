const express = require('express')
const mongoose = require('mongoose');
const routes = require("routes.js")

const PORT = process.env.port || 3000

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use(routes)

mongoose.connect(process.env.MONGOOSEDB || 'mongodb://localhost/fitnessapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
})