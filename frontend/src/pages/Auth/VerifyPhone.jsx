import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function VerifyPhone() {
  const { sendOtp, verifyPhone, user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(location.state?.phoneNumber || user?.phoneNumber || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!phoneNumber) return;
    sendOtp(phoneNumber).then((data) => {
      if (data.message) setMessage(data.message);
      if (data.debugOtp) setMessage(`${data.message} (Demo OTP: ${data.debugOtp})`);
    });
  }, [phoneNumber, sendOtp]);

  const handleVerify = async (e) => {
    e.preventDefault();
    const data = await verifyPhone(phoneNumber, code);
    if (data.error) {
      setMessage(data.error);
      return;
    }
    setMessage("Phone verified successfully.");
    navigate("/profile");
  };

  return (
    <section className="card auth-box">
      <h2>Phone Verification</h2>
      <form className="form" onSubmit={handleVerify}>
        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+15551234567" />
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter OTP code" />
        <button
          type="button"
          className="btn-outline"
          onClick={() =>
            sendOtp(phoneNumber).then((d) =>
              setMessage(d.debugOtp ? `${d.message} (Demo OTP: ${d.debugOtp})` : d.message || d.error)
            )
          }
        >
          Resend OTP
        </button>
        <button className="btn-primary" type="submit">
          Verify Phone
        </button>
      </form>
      {message && <p className="msg">{message}</p>}
    </section>
  );
}
