import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Autocomplete from "@mui/joy/Autocomplete";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useColorScheme } from "@mui/joy/styles";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PaidIcon from "@mui/icons-material/Paid";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

interface SidebarProps {
  // onModeChange: (mode: "light" | "dark") => void;
  // modeForChange: any;
  users: any;
}

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </Fragment>
  );
}

const Sidebar = ({ users }: SidebarProps) => {
  const { data: session, status } = useSession();
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [notificationOpened, setNotificationOpened] = useState(false);

  const router = useRouter();

  console.log(users);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const logout = () => {
    signOut();
  };

  const notificationOpen = () => {
    setNotificationOpened(!notificationOpened);
  };

  return (
    <Sheet
      sx={{
        width: "15vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        p: 2,
        gap: "1rem",
        borderRight: "1px solid lightgrey",
        minWidth: "fit-content",
        maxWidth: "100%",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton variant="outlined" onClick={() => notificationOpen()}>
          <NotificationsIcon />
        </IconButton>
        <Typography>Cégnév KFT...</Typography>
        <IconButton
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          variant="outlined"
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>

      <Autocomplete
        options={["Option1", "Option2", "Option3", "Option4", "Option5"]}
        sx={{ maxWidth: "100%" }}
      />
      <List
        sx={{
          gap: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <ListItem
          sx={{
            width: "100%",
          }}
          onClick={() => router.push("/dashboard")}
        >
          <ListItemButton>
            <HomeRoundedIcon />
            <ListItemContent>
              <Typography level="title-sm">Home</Typography>
            </ListItemContent>
          </ListItemButton>
        </ListItem>

        <ListItem
          nested
          sx={{
            width: "100%",
          }}
        >
          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ListItemButton onClick={() => setOpen(!open)}>
                <GroupsIcon />
                <ListItemContent>
                  <Typography level="title-sm">Teamwork</Typography>
                </ListItemContent>
                <KeyboardArrowDownIcon
                  sx={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </ListItemButton>
            )}
          >
            <List sx={{ gap: 0.5 }}>
              <ListItem sx={{ mt: 0.5 }}>
                <ListItemButton>Calendar</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Task management</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Ticket management</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Chat</ListItemButton>
              </ListItem>
            </List>
          </Toggler>
        </ListItem>

        <ListItem
          nested
          sx={{
            width: "100%",
          }}
        >
          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ListItemButton onClick={() => setOpen(!open)}>
                <ApartmentIcon />
                <ListItemContent>
                  <Typography level="title-sm">Company</Typography>
                </ListItemContent>
                <KeyboardArrowDownIcon
                  sx={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </ListItemButton>
            )}
          >
            <List sx={{ gap: 0.5 }}>
              <ListItem sx={{ mt: 0.5 }}>
                <ListItemButton>Team management with ps</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Customer man. (B2C)</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Partner man. (B2C)</ListItemButton>
              </ListItem>
            </List>
          </Toggler>
        </ListItem>

        <ListItem
          nested
          sx={{
            width: "100%",
          }}
        >
          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ListItemButton onClick={() => setOpen(!open)}>
                <InventoryIcon />
                <ListItemContent>
                  <Typography level="title-sm">Stock managament</Typography>
                </ListItemContent>
                <KeyboardArrowDownIcon
                  sx={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </ListItemButton>
            )}
          >
            <List sx={{ gap: 0.5 }}>
              <ListItem sx={{ mt: 0.5 }}>
                <ListItemButton>Inventory</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Manufacturing</ListItemButton>
              </ListItem>
            </List>
          </Toggler>
        </ListItem>

        <ListItem
          nested
          sx={{
            width: "100%",
          }}
        >
          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ListItemButton onClick={() => setOpen(!open)}>
                <StorefrontIcon />
                <ListItemContent>
                  <Typography level="title-sm">Commerce</Typography>
                </ListItemContent>
                <KeyboardArrowDownIcon
                  sx={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </ListItemButton>
            )}
          >
            <List sx={{ gap: 0.5 }}>
              <ListItem sx={{ mt: 0.5 }}>
                <ListItemButton>Buying</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Selling</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Renting</ListItemButton>
              </ListItem>
            </List>
          </Toggler>
        </ListItem>

        <ListItem
          nested
          sx={{
            width: "100%",
          }}
        >
          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ListItemButton onClick={() => setOpen(!open)}>
                <PaidIcon />
                <ListItemContent>
                  <Typography level="title-sm">Finance</Typography>
                </ListItemContent>
                <KeyboardArrowDownIcon
                  sx={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </ListItemButton>
            )}
          >
            <List sx={{ gap: 0.5 }}>
              <ListItem sx={{ mt: 0.5 }}>
                <ListItemButton>Invoicing</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Filing</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Bank overview</ListItemButton>
              </ListItem>
            </List>
          </Toggler>
        </ListItem>

        <ListItem
          nested
          sx={{
            width: "100%",
          }}
        >
          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ListItemButton onClick={() => setOpen(!open)}>
                <PhoneAndroidIcon />
                <ListItemContent>
                  <Typography level="title-sm">Repair shop module</Typography>
                </ListItemContent>
                <KeyboardArrowDownIcon
                  sx={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </ListItemButton>
            )}
          >
            <List sx={{ gap: 0.5 }}>
              <ListItem sx={{ mt: 0.5 }}>
                <ListItemButton>Cases</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Devices</ListItemButton>
              </ListItem>
            </List>
          </Toggler>
        </ListItem>

        <ListItem
          sx={{
            width: "100%",
          }}
          onClick={() => router.push("/dashboard/messages")}
        >
          <ListItemButton>
            <HomeRoundedIcon />
            <ListItemContent>
              <Typography level="title-sm">Messages</Typography>
            </ListItemContent>
            <Chip size="sm" color="primary" variant="solid">
              4
            </Chip>
          </ListItemButton>
        </ListItem>
      </List>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton size="sm" variant="plain" color="neutral" onClick={logout}>
          <AccountCircleIcon />
        </IconButton>
        <Typography level="title-sm">{users?.firstName}</Typography>
        <IconButton size="sm" variant="plain" color="neutral" onClick={logout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
};

export default Sidebar;
