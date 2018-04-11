const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen( PORT, () => {
  console.log(`AJAX Blog: Listening on port no. ${PORT}`)
})
