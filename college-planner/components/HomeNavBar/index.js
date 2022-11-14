import { Text, Avatar, Navbar, Button, Dropdown } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthUserContext } from "../../context/AuthUserContext"
import { logout } from "../../firebase/firebase"


export default function HomeNavBar() {
  const { currentUser } = useContext(AuthUserContext);
  const router = useRouter();
  const defaultAvatar = "/DefaultAvatar.png"
  const collapseItems = [
    "My Colleges",
    "Search For Colleges",
    "Help & Feedback",
  ];

  const signOut = async () => {
    logout().then(() => {
      router.push("/login");
    });

  };

  return (
    <Navbar css={{ zIndex: 100 }} variant="sticky" isBordered disableBlur maxWidth="fluid">
      <Navbar.Toggle />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          }, margin: "auto"
        }}
      >
        <Text b color="inherit" hideIn="xs">
          College Decision Planner
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar

                zoomed
                size="lg"
                src={currentUser && (currentUser.data().photoURL || defaultAvatar)}
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            onAction={(actionKey) => {
              if (actionKey == 'logout') {
                signOut();
              } else if (actionKey == 'settings' || actionKey == 'profile') {
                router.push("/account");
              }
            }}
          >
            <Dropdown.Item textValue="signed in as username" key="profile" css={{ height: "$18" }} aria-Label="account name">
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text color="primary" css={{ d: "flex" }}>
                {currentUser && currentUser.data().name}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider aria-label="settings">Account Settings</Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error" aria-label="logout">Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse disableAnimation>
        <Navbar.CollapseItem
          key="My College List"
          activeColor="primary"
        >
          <Button
            bordered
            ripple
            ghost
            color="inherit"
            css={{
              maxWidth: "100%",
            }}
            onPress={() => router.push("/")}
          >
            My College List
          </Button>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem
          key="Search For Colleges"
          activeColor="primary"
        >
          <Button
            bordered
            ripple
            ghost
            color="inherit"
            css={{
              maxWidth: "100%",
            }}
            onPress={() => router.push("/searchColleges")}
          >
            Search For Colleges
          </Button>
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
}