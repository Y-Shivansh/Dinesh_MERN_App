import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

export const ResetFormVerification = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer); // Cleanup timer
    } else {
      setResendDisabled(false); // Enable resend button when countdown finishes
    }
  }, [countdown]);

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
      const response = await axios.put(
        `http://localhost:3000/api/user/reset-password?email=${email}`,
        { enteredOtp: numberOtp, newPassword: password },{withCredentials: true}
      );

      if (response.status === 201) {
        alert("Password updated successfully. Please login with your new password.");
        navigate("/sign-in");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error verifying OTP");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setResendDisabled(true);
    setCountdown(30); // Start 30-second countdown

    try {
      // Resend OTP using the same endpoint for both generating and resending OTP
      await axios.post("http://localhost:3000/api/user/reset-verification", { email }, {withCredentials: true});
      alert("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
      setResendDisabled(false); // Allow retry if API fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#e0f5fd] flex flex-col items-center justify-center">
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
        <InputBox
          placeholder="New Password"
          label={"Password"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {loading ? (
          <Loading />
        ) : (
          <Button label={"Verify OTP"} onClick={handleVerifyOtp} />
        )}

        {/* Resend OTP Button with Countdown Timer */}
        <div className="mt-4">
          <button
            onClick={handleResendOtp}
            disabled={resendDisabled}
            className={`text-blue-500 ${
              resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:underline"
            }`}
          >
            <span
              className={`${
                resendDisabled ? "text-gray-400" : "text-gray-800"
              }`}
            >
              {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
