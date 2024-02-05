import RegisterForm from '@/components/Register/RegisterForm'
import React from 'react'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/dashboard");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <div className="h-screen w-screen flex flex-col items-center justify-center text-2xl font-bold">Loading...</div>;
  }

  return (
    <RegisterForm />
  )
}

export default index