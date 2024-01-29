const EmailCheck = (email: string) => {
  if (!email.includes("@")) {
    return "Invalid email address";
  }
  return true;
};

export default EmailCheck;