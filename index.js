const express = require("express");
const path = require("path");
const axios = require("axios");
const { fetchData, postData } = require("./service/apiService");

const app = express();
const port = 3000;

const API_URL = "http://localhost:8080/api/v1";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
