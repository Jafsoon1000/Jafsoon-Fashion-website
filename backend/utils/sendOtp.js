import twilio from "twilio";

export async function sendOtpSms(phoneNumber, code) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!sid || !token || !from) {
    console.log(`[DEV OTP] ${phoneNumber}: ${code}`);
    return { mode: "dev" };
  }

  const client = twilio(sid, token);
  await client.messages.create({
    body: `Your Jafsoon verification code is: ${code}`,
    from,
    to: phoneNumber
  });
  return { mode: "sms" };
}
