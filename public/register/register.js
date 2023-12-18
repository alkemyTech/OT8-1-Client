const inputFirstName = document.getElementById("InputFirstName");
const inputLastName = document.getElementById("InputLastName");
const inputEmail = document.getElementById("InputEmail");
const inputPassword = document.getElementById("InputPassword");
const btnRegister = document.getElementById("btnRegister");

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

btnRegister.addEventListener("click", async (e) => {
  console.log("clic");
  const firstName = inputFirstName.value;
  const lastName = inputLastName.value;
  const email = inputEmail.value;
  const password = inputPassword.value;
  if (firstName && lastName && emailRegExp.test(email) && password) {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    try {
      const response = await axios.post("/registerUser", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      console.log(response.data);
      if (response.data.jwt) {
        sessionStorage.setItem("token", response.data.jwt);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("firstName", response.data.firstName);
        sessionStorage.setItem("lastName", response.data.lastName);
        sessionStorage.setItem("email", response.data.userEmail);
        console.log(sessionStorage.getItem("token"));
        window.open("http://localhost:3000/home", "_self");
      }
    } catch (error) {
      console.log(error);
    }
  }
});
