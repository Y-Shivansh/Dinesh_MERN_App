import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { InputBox } from "../components/inputBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error,setError] = useState("")
    return (
        <div className="h-screen bg-[#e0f5fd] flex flex-col items-center">
            <div className="w-96 mt-20 text-center p-8 bg-gray-100 rounded-xl shadow-lg">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your signup credentials"} />
                <InputBox placeholder="user" label={"Name"}
                    type={"text"}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }} />
                <InputBox placeholder="user@gmail.com" label={"Email"}
                    type={"email"}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                <InputBox placeholder="min 6 digits." label={"Password"}
                    type={"password"}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                <InputBox placeholder="individual/business/charity" label={"role"}
                    type={"text"}
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value)
                    }} />
                <div className="pt-4">
                {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                    <Button label={"Sign Up"} onClick={async () => {
                        if (!name || !email || !password) {
                            console.log("All fields are required.");
                            return;
                        }
                        try {
                            if (role.length === 0){
                                setRole("individual")
                            }
                            const response = await axios.post("http://localhost:3000/api/user/register", {
                                name,
                                email,
                                password,
                                role
                            })
                            if (response.data.message === "Otp sent") {
                                navigate(`/signup/verify?email=${email}`);
                            } else {
                                console.log("Signup failed: ", response.data.message);
                            }
                        }
                        catch (err) {
                            setError(err)
                            console.log("Error Signing up: ", err.data);
                        }
                    }} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/sign-in"} />
            </div>
        </div>
        // </div>
    );
};