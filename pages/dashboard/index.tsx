import Dashboard from "@/components/Dashboard/Dashboard";
import Layout from "@/components/Layout/Layout";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <Layout>
        <Dashboard />
    </Layout>
  );
};

export default index;
