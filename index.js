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
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register/register.html");
});

app.post("/loginUser", async (req, res) => {
  try {
    const data = req.body;
    const url = API_URL + "/auth/login";
    const response = await postData(url, {
      email: data.userEmail,
      password: data.userPassword
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/registerUser", async (req, res) => {
  try {
    const data = req.body;

    const url = API_URL + "/auth/register";
    const registerResponse = await postData(url, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    });
    console.log(registerResponse);

    const loginURL = API_URL + "/auth/login";
    try {
      const loginResponse = await postData(loginURL, {
        email: data.email,
        password: data.password
      });
      console.log(loginResponse);

      if (loginResponse.token) {
        const token = loginResponse.token;
        const arsURL = API_URL + "/accounts?currency=ARS";
        const usdURL = API_URL + "/accounts?currency=USD";
        try {
          const accountArs = await postData(arsURL, null, token);
          console.log(accountArs);
          const accountUsd = await postData(usdURL, null, token);
          console.log(accountUsd);
        } catch (error) {
          console.log(error);
        }
      }
      res.json(loginResponse);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
