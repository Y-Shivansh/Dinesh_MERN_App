import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/inputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Loading } from "../components/Loading"

export const Signin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen bg-[#e0f5fd] flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-md text-center p-6 bg-gray-100 rounded-xl shadow-lg">
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

                <div className="mt-4">
                    <InputBox
                        label={"Password"}
                        placeholder={"12345"}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="pt-6">
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button
                            label={"Sign In"}
                            onClick={async () => {
                                setLoading(true);
                                if (!email || !password) {
                                    console.log("All fields are required.");
                                    setLoading(false);
                                    return;
                                }

                                try {
                                    const response = await axios.post(
                                        "http://localhost:3000/api/vi/user/signin",
                                        { email, password }
                                    );
                                    if (response.data.message === 'Logged In successfully') {
                                        localStorage.setItem('user', JSON.stringify(response.data.user));
                                        localStorage.setItem('firstName', JSON.stringify(response.data.firstName));
                                        localStorage.setItem('token', response.data.token);
                                        navigate("/dashboard");
                                    } else {
                                        console.log("Signin failed: ", response.data.message);
                                    }
                                } catch (err) {
                                    console.log("Error Logging in: ", err.message);
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        />
                    )}
                </div>

                <BottomWarning label={"Do not have an Account?"} buttonText={"Sign Up"} to={"/signup"} />
            </div>
        </div>
    );
};
