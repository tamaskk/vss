const PasswordCheck = (password: string) => {
    const hasValidLength = password.length >= 8 && password.length <= 20;

    const hasNumber = /[0-9]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
  
    if (!(hasValidLength && hasNumber && hasLowercase && hasUppercase)) {
      return "Password must be between 8 and 20 characters and contain at least one number, one lowercase, and one uppercase letter";
    }
    return true;
  };
  
  export default PasswordCheck;
  