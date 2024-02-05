import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import Logo from "../../assets/branding/square.png";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { signIn } from 'next-auth/react'

const Loginform = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const loginHandler = async () => {
    if (userData.email === "" || userData.password === "") {
      toast.error("Please fill out all fields ❌");
      return;
    }
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: userData.email,
      password: userData.password,
    });

    if (result?.error) {
      toast.error(result.error + " ❌");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      <Toaster
        duration={5000}
        position="top-center"
        toastOptions={{
          style: {
            color: "black",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: "0px",
          },
        }}
      />
      <div className="flex flex-col items-center justify-start gap-8 p-4">
        <div>
          <Image src={Logo} alt="Logo" width={200} height={200} />
        </div>
        <h1 className="text-2xl font-semibold">
          <span className="text-[#a83ff9] font-bold">Login</span> to your
          account
        </h1>
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
          text={loading ? "Logging in..." : "Login"}
          type="primary"
          length="full"
          disabled={loading}
          onClick={loginHandler}
        />
        <Link
          href="/register"
          className="text-gray-400 cursor-pointer hover:border-b hover:border-gray-400 transition-all duration-300"
        >
          Not a member?{" "}
          <span className="text-[#a83ff9] font-bold">Register Now</span>
        </Link>
      </div>
    </div>
  );
};

export default Loginform;
