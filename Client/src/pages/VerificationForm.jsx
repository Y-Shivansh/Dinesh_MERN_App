import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading"

export const VerificationForm = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Accessing email from query params
    const email = new URLSearchParams(location.search).get("email");

    const handleVerifyOtp = async () => {
        if (!otp) {
            setError("Please enter OTP");
            return;
        }
        const numberOtp = Number(otp);
        if (isNaN(numberOtp)) {
            setError("OTP must be a valid number");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/api/user/verify-otp?email=${email}`,
                { enteredOtp: numberOtp },
                { withCredentials: true } //for sending cookies
            );

            if (response.status === 201) {
                navigate("/food-listings");
            } else {
                
                setError(response.data.message);
            }
        } catch (err) {
            if (err.response) {
                
                setError(err.response.data.message || "Error Occurred");
            }
            else {
                
                setError("Error verifying OTP");
            }
        }
    };

    return (
        <div className="h-screen bg-primaryCol flex flex-col items-center justify-center">
            <div className="w-96 text-center p-8 bg-gray-100 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold">Verify OTP</h2>
                <p className="text-gray-600 mb-4">Enter the OTP sent to your email</p>
                <InputBox
                    placeholder="123456"
                    label={"OTP"}
                    type={"text"}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {/* {Loading} */}
                <Button label={"Verify OTP"} onClick={handleVerifyOtp} />
            </div>
        </div>
    );
};
