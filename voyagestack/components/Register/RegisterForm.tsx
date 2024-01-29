import Image from "next/image";
import { useState } from "react";
import Logo from "../../assets/branding/square.png";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Link from "next/link";
import { Toaster, toast } from 'sonner'
import PasswordCheck from '@/lib/PasswordCheck'
import EmailCheck from '@/lib/EmailCheck'

const RegisterForm = () => {
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const registerHandler = async () => {
    if (userData.firstName === "" || userData.lastName === "") {
      toast.error("Please enter your first and last name ❌");
      return;
    }
  
    const emailCheck = EmailCheck(userData.email);
  
    if (emailCheck !== true) {
      toast.error(emailCheck + " ❌");
      return;
    }
   
    const passwordCheck = PasswordCheck(userData.password);
    console.log(passwordCheck);
    
    if (passwordCheck !== true) {
      toast.error(passwordCheck + " ❌");
      return; 
    }
  
    if (userData.password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }
    console.log('Elért');
    
    try {
      setLoading(true);
      const res = await fetch("api/auth/registerhandler", {
        method: "POST",
        body: JSON.stringify({ userData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
  
      if (data.error) {
        throw new Error(data.error);
      }
  
      toast.success("Account created successfully! ✔️");
      setLoading(false);
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error + " ❌");
      setLoading(false);
    }
  };
  

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <div className="flex flex-col items-center justify-start gap-6 p-4">
        <Toaster 
        duration={5000}
        position="top-center"
        toastOptions={{
            style: { color: "black", alignItems: "center", justifyContent: "center", position: "fixed", top: "0px"},
        }}
        />
        <div>
          <Image src={Logo} alt="Logo" width={200} height={200} />
        </div>
        <h1 className="text-2xl font-semibold">
          <span className="text-[#a83ff9] font-bold">Register</span> an account
        </h1>
        <Input
          id="firstName"
          label="First Name"
          type="text"
          placeholder="First Name"
          extraInputClasses="border border-gray-200 text-center"
          extraLabelClasses="text-center"
          onChange={(e) =>
            setUserData({ ...userData, firstName: e.target.value })
          }
          value={userData.firstName}
        />
        <Input
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Last Name"
          extraInputClasses="border border-gray-200 text-center"
          extraLabelClasses="text-center"
          onChange={(e) =>
            setUserData({ ...userData, lastName: e.target.value })
          }
          value={userData.lastName}
        />
        <Input
          id="email"
          label="Email"
          type="text"
          placeholder="Email"
          extraInputClasses="border border-gray-200 text-center"
          extraLabelClasses="text-center"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          value={userData.email}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          extraInputClasses="border border-gray-200 text-center"
          extraLabelClasses="text-center"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          value={userData.password}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          extraInputClasses="border border-gray-200 text-center"
          extraLabelClasses="text-center"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <Button
          text={loading ? "Registering..." : "Register"}
          type="primary"
          length="full"
          onClick={registerHandler}
          disabled={loading}
        />
        <Link
          href="/login"
          className="text-gray-400 cursor-pointer hover:border-b hover:border-gray-400 transition-all duration-300"
        >
          Do you have na account?{" "}
          <span className="text-[#a83ff9] font-bold">Login Now</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
