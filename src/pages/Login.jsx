import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
    const [email, setEmail] = useState("user@gmail.com");
    const [password, setPassword] = useState("user@123");

    const submitHandler = async (e) => {

        setLoading(true);

        e.preventDefault();

        try {
            const { data } = await axios.post(`${server}/users/login`, {
                email, password
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
                <button disabled={loading} type="submit">Login</button>
                <hr />
                <h6>or</h6>
                <Link to={"/register"}>Register</Link>
            </form>
        </div>

    )
}

export default Login
