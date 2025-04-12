import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import './Login.scss';
import { useUser } from "@/context/UserContext";
import { getUserDetails } from "../../utils/auth";
const Login: React.FC = () => {
    const { setUser, setIsLoggedIn } = useUser();

    const handleLoginSuccess = async (response: any) => {
        localStorage.setItem("google_token", response.credential);
        await new Promise((resolve) => setTimeout(resolve, 0));
        const userDetails = getUserDetails()
        setIsLoggedIn(userDetails.isLoggedIn)
        setUser(userDetails.details);
    };

    const handleLoginFailure = (error: any) => {
        console.error('Login Failed:', error);

    };
    return (
        <div className="container">
            <div className="card">
                <h1 className="title">Welcome Back!</h1>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => handleLoginFailure(new Error("Login failed"))}
                />
            </div>
        </div>
    );
};

export default Login;