import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { Context, server } from "../main";
import toast from "react-hot-toast"

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

  const submitHandler = async (e) => {

    setLoading(true);

    e.preventDefault();

    try {
      const { data } = await axios.post(`${server}/users/new`, {
        name, email, password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }

  };

  if (isAuthenticated) return <Navigate to={"/"} />

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading} type="submit">Register</button>
        <hr />
        <h6>or</h6>
        <Link to={"/login"}>Login</Link>
      </form>
    </div>
  )
}

export default Register
