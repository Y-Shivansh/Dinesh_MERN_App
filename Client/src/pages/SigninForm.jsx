import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/inputBox"
import { SubHeading } from "../components/SubHeading"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Loading } from "../components/Loading"

export const Signin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null); 

    useEffect(() => {
        // Check if the user is already logged in
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/user/profile", { withCredentials: true });
                setUser(res.data);  // Set the user profile in state
                
                if (res.data) {
                    navigate("/food-listings");  // Redirect to food-listings if the user is logged in
                }
            } catch (error) {
                console.error("Error fetching user profile", error);
            }
        };

        fetchUserProfile();
    }, [navigate]);
  
    
    return (
        <div className="min-h-screen bg-primaryCol flex flex-col justify-center items-center px-4">
            <div className="w-96 max-w-md text-center p-6 bg-gray-100 rounded-xl shadow-lg">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your login credentials"} />

                <div className="mt-4">
                    <InputBox
                        label={"Email"}
                        placeholder={"curk@gmail.com"}
                        type={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mt-2">
                    <InputBox
                        label={"Password"}
                        placeholder={"12345"}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="pt-3 text-red-600 text-sm ">{error}</p>
                <BottomWarning label={"Forgot Password?"} buttonText={"Reset"} to={"/reset-password"} />
                <div className="">
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button
                            label={"Sign In"}
                            onClick={async () => {
                                setLoading(true);
                                if (!email || !password) {
                                    console.log("All fields are required.");
                                    setError("All fields required")
                                    setLoading(false);
                                    return;
                                }

                                try {
                                    const response = await axios.post(
                                        "http://localhost:3000/api/user/login",
                                        { email, password }, // Request body
                                        { withCredentials: true } // Axios configuration
                                      );
                                    if (response.status === 200) {
                                        navigate("/food-listings");
                                    } else {
                                        console.log("Login failed: ", response.data.message);
                                        setError(response.data.message || "Login Failed")
                                    }
                                } catch (err) {
                                    if (err.response) {
                                        console.log("Error Logging in: ", err.response.data.message);
                                        setError(err.response.data.message || "Something Went Wrong")
                                    }
                                    else {
                                        console.log("Error logging in: ", err.message);
                                        setError("Something went wrong, try again!");
                                    }
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        />
                    )}
                </div>

                <BottomWarning label={"Do not have an Account?"} buttonText={"Sign Up"} to={"/sign-up"} />
            </div>
        </div>
    );
};
