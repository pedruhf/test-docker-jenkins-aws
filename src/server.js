const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send({ message: "Deu certo papaaayyy, nova versao" })
})

app.listen(3000, () => console.log("SERVER IS RUNNING AT http://localhost:3000"));
