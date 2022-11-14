import { Grid, Input, Spacer, Checkbox, Button, Row, Text } from "@nextui-org/react";
import useInput from "../hooks/useInput";
import { AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { useRouter } from "next/router";
import { useContext, useState } from 'react';
import { AuthUserContext } from "../context/AuthUserContext"
import { logout, signUp, signIn, db, doc, getDoc, setDoc } from "../firebase/firebase";


export default function Login() {
  const { currentUser, updateUser } = useContext(AuthUserContext);
  const router = useRouter();
  const email = useInput("");
  const password = useInput("");

  const [error, setError] = useState(false);

  const login = async () => {

    signIn(email.value, password.value)
      .then((userCredential) => {
        setError(false);
        router.push("/");
      }).catch((err) => {
        console.log(err.message);
        setError(true);
      });

  };

  const register = async () => {
    signUp(email.value, password.value)
      .then((userCredential) => {
        setError(false);
        router.push("/");
      }).catch((err) => {
        console.log(err.message);
        setError(true);
      });
  };

  return (
    <>
      <Grid.Container
        gap={10}
        justify="center"
        css={{ maxWidth: "50%", margin: "0 auto" }}
      >
        <Grid css={{ marginBottom: "3vw" }}>
          <h3>Welcome to</h3>
          <h2>College Decision Planner</h2>

          <Spacer y={1.5} />

          <Input
            size="lg"
            {...email}
            labelPlaceholder="Username or Email"
            aria-label="email"
            contentLeft={<AiOutlineMail />}
            fullWidth
            id="inputEmail"
          />
          <Spacer y={1.5} />

          <Input.Password
            size="lg"
            {...password}
            labelPlaceholder="Password"
            aria-label="password"
            contentLeft={<BsKey />}
            fullWidth
            id="inputPassword"
          />

          <Spacer y={0.5} />
          <Row>
            <Button
              id="login"
              aria-label="log in"
              onPress={login}
            >
              Login
            </Button>
            <Button
              id="signUp"

              aria-label="sign up"
              onPress={register}
              css={{ marginLeft: "5px" }}
            >
              Sign Up
            </Button>
          </Row>
          <Spacer />
          {error && <Text h4 color="error">Error logging in. Please try again</Text>}
        </Grid>
      </Grid.Container>
    </>
  );
}
