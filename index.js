const express = require("express");
const path = require("path");
const axios = require("axios");
const { fetchData, postData, deleteData } = require("./service/apiService");
const { get } = require("http");

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

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/home/home.html");
});

app.get("/transactions", (req, res) => {
  res.sendFile(__dirname + "/public/transaction/transaction.html");
});

app.get("/loan", (req, res) => {
  res.sendFile(__dirname + "/public/simulate/loan.html");
});

app.get("/fixed", (req, res) => {
  res.sendFile(__dirname + "/public/simulate/fixed.html");
});

app.get("/profile", (req, res) => {
  res.sendFile(__dirname + "/public/profile/profile.html");
});

app.get("/editProfile", (req, res) => {
  res.sendFile(__dirname + "/public/profile/editProfile.html");
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
      const loginResponse = await postData(
        loginURL,
        {
          email: data.email,
          password: data.password
        },
        null
      );
      console.log(loginResponse);
      if (loginResponse.jwt) {
        const token = loginResponse.jwt;
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
      res.json(registerResponse);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/userAccounts", async (req, res) => {
  const data = req.body;
  console.log(data);
  const userId = data.userId;
  const token = data.token;
  const accountURL = API_URL + `/accounts/${userId}`;
  try {
    console.log("Haciendo un fetch a: " + accountURL);
    const response = await fetchData(accountURL, token);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/userTransactions", async (req, res) => {
  const data = req.body;
  console.log(data);
  const userId = data.userId;
  const token = data.token;
  const page = data.page;
  const transactionsURL = API_URL + `/transactions?user=${userId}&page=${page}`;
  try {
    console.log("Haciendo un fetch a: " + transactionsURL);
    const response = await fetchData(transactionsURL, token);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/simulateLoan", async (req, res) => {
  const data = req.body;
  console.log(data);
  const amount = data.amount;
  const month = data.month;
  const token = data.token;
  const simulateURL = API_URL + "/loan/simulate";
  try {
    const response = await postData(
      simulateURL,
      {
        amount: amount,
        months: month
      },
      token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/simulateFixed", async (req, res) => {
  const data = req.body;
  console.log(data);
  const amount = data.amount;
  const days = data.days;
  const token = data.token;
  const simulateURL = API_URL + "/fixedTerm/simulate";
  try {
    const response = await postData(
      simulateURL,
      {
        amount: amount,
        days: days
      },
      token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/editUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const token = data.token;
  const simulateURL = API_URL + `/users/${data.userId}`;
  try {
    const response = await patchData(
      simulateURL,
      {
        firstName: data.firstName,
        lastName: data.lastName
      },
      token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const token = data.token;
  const deleteURL = API_URL + `/users/${data.userId}`;
  try {
    const response = await deleteData(deleteURL, token);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/getUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const token = data.token;
  const getUrl = API_URL + `/users/${data.userId}`;
  try {
    const response = await fetchData(getUrl, token);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/updateTransaction", async (req, res) => {
  const data = req.body;
  const transactionId = data.transactionId;
  const updateUrl = API_URL + `transactions/${transactionId}`;
  try {
    const response = await patchData(
      updateUrl,
      {
        description: data.description
      },
      token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
