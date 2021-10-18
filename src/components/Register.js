import { useState } from "react";
import { useHistory } from "react-router";
import { baseUrl } from "../App";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { setUser } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.error) {
      return setErrorMessage(data.message);
    }
    localStorage.setItem("token", data.token);
    setUser({
      id: data.user.id,
      username: data.user.username,
      token: data.token,
    });
    history.push("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <span>Username:</span>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        ></input>
        <span>Password:</span>
        <input
          type="password"
          value={password}
          minLength={8}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        ></input>
        <button>Submit</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
};

export default Register;
