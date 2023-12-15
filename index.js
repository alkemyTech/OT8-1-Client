const express = require("express");
const path = require("path");
const axios = require("axios");
const { fetchData, postData } = require("./service/apiService");

const app = express();
const port = 3000;

const API_URL = "http://localhost:8080/api/v1";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login/login.html");
});

app.post("/loginUser", async (req, res) => {
  try {
    const data = req.body;
    const url = API_URL + "/auth/login";
    const response = await postData(url, {
      email: data.userEmail,
      password: data.userPassword
    });
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
