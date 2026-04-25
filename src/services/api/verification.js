import api from "../api";

// Check verification status
export const checkEmailVerified = async () => {
  const res = await api.get("/email/verified");
  return res.data;
};

// Resend verification email
export const resendVerificationEmail = async () => {
  const res = await api.post("/email/resend");
  return res.data;
};

// Verify email manually (from frontend link)
export const verifyEmail = async (url) => {
  const res = await api.get(url);
  return res.data;
};