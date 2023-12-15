const inputFirstName = document.getElementById("InputFirstName");
const inputLastName = document.getElementById("InputLastName");
const inputEmail = document.getElementById("InputEmail");
const inputPassword = document.getElementById("InputPassword");
const btnRegister = document.getElementById("btnRegister");

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

btnRegister.addEventListener("click", async (e) => {
  const firstName = inputFirstName.value;
  const lastName = inputLastName.value;
  const email = inputEmail.value;
  const password = inputPassword.value;
  if (firstName && lastName && emailRegExp.test(email) && password) {
    e.preventDefault();
    console.log("request: ", firstName, lastName, email, password);
    try {
      const response = await axios.post("/registerUser", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      console.log("response: ", response.data);
      if (response.data.token) {
        sessionStorage.setItem("token", "Bearer " + response.data.token);
        console.log(sessionStorage.getItem("token"));
        window.open("http://localhost:3000/home", "_self");
      }
    } catch (error) {
      console.log(error);
    }
  }
});
