const inputEmail = document.getElementById("InputEmail");
const inputPassword = document.getElementById("InputPassword");
const btnLogin = document.getElementById("btnLogin");

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

btnLogin.addEventListener("click", async (e) => {
  const userEmail = inputEmail.value;
  const userPassword = inputPassword.value;
  if (emailRegExp.test(userEmail) && userPassword) {
    e.preventDefault();
    console.log("request: ", userEmail, userPassword);
    try {
      const response = await axios.post("/loginUser", {
        userEmail: userEmail,
        userPassword: userPassword
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
