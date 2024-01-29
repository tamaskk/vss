import Image from "next/image";
import { useState } from "react";
import Logo from "../../assets/branding/square.png";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Link from "next/link";

const Loginform = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    const res = await fetch("api/auth/loginhandler", {
      method: "POST",
      body: JSON.stringify({ userData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <div className="flex flex-col items-center justify-start gap-8 p-4">
        <div>
          <Image src={Logo} alt="Logo" width={200} height={200} />
        </div>
        <h1 className="text-2xl font-semibold"><span className="text-[#a83ff9] font-bold">Login</span> to your account</h1>
        <Input
          id="email"
          label="Email"
          type="text"
          placeholder="Email"
          extraInputClasses="border border-gray-200 text-center"
          extraLabelClasses="text-center"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
        />
        <Button
          text="Login"
          type="primary"
          length="full"
          onClick={loginHandler}
        />
        <Link href="/register" className="text-gray-400 cursor-pointer hover:border-b hover:border-gray-400 transition-all duration-300">
          Not a member?{" "}
          <span className="text-[#a83ff9] font-bold">Register Now</span>
        </Link>
      </div>
    </div>
  );
};

export default Loginform;
