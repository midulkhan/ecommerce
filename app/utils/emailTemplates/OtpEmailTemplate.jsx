import React from "react";

function OtpEmailTemplate({ username, otp }) {
  return (
    <div>
      <p>Hi,{username}</p>
      <p>Here is your OTP code. Please don't share it with someone else</p>
      <p style={{ background: "yellow", padding: "20px" }}>{otp}</p>
    </div>
  );
}

export default OtpEmailTemplate;
