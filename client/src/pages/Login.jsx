import Google from "../img/google.png";
import Github from "../img/github.png";

const Login = () => {
  const google = () => {
    window.open(`${process.env.REACT_APP_AUTH_URL}/google`, "_self");
  };

  const github = () => {
    window.open(`${process.env.REACT_APP_AUTH_URL}/github`, "_self");
  };


  return (
    <div className="login">
      <h1 className="loginTitle">Login/Signup</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
