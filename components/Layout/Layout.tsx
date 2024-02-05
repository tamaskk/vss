import Sheet from "@mui/joy/Sheet";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { getSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/user/user");
      const data = await res.json();

      getSession().then((session) => {
        const user = session?.user;
        const findUser = data.users.filter(
          (item: any) => item.email === user?.email
        );

        setUserData(findUser[0]);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Sheet
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "start",
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <CssVarsProvider>
        <Sidebar users={userData} />
      </CssVarsProvider>
      {children}
    </Sheet>
  );
};

export default Layout;
