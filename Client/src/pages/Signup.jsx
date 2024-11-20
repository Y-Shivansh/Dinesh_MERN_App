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
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    return (
        <div className="h-screen bg-[#e0f5fd] flex flex-col items-center">
            <div className="w-96 mt-20 text-center p-8 bg-gray-100 rounded-xl shadow-lg">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your signup credentials"} />
                <InputBox placeholder="Simpson" label={"First Name"}
                    type={"text"}
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }} />
                <InputBox placeholder="Curk" label={"Last Name"}
                    type={"text"}
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }} />
                <InputBox placeholder="curk@gmail.com" label={"Email"}
                    type={"email"}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                <InputBox placeholder="123456" label={"Password"}
                    type={"password"}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                <div className="pt-4">
                    <Button label={"Sign Up"} onClick={async()=>{
                         if (!firstName || !lastName || !email || !password) {
                            console.log("All fields are required.");
                            return;
                        }
                        try{
                            const response = await axios.post("http://localhost:3000/api/vi/user/signup",{
                                firstName,
                                lastName,
                                email,
                                password
                            })
                            if (response.data.message === "User created successfully") {
                                localStorage.setItem('user', JSON.stringify(response.data.user));
                                localStorage.setItem('firstName', JSON.stringify(response.data.firstName));
                                localStorage.setItem('token', response.data.token)
                                navigate("/dashboard");
                            } else {
                                console.log("Signup failed: ", response.data.message);
                            }
                        }
                        catch(err){
                            console.log("Error Signing up: ", err.data);
                        }
                    }}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
            </div>
        </div>
        // </div>
    );
};