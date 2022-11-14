import React, { useEffect, useContext } from 'react';
import { Grid, Text, Spacer, Collapse, Button } from "@nextui-org/react";
import HomeNavBar from '../components/HomeNavBar';
import CollegeInformationCard from "../components/CollegeInformationCard"

import { useRouter } from 'next/router';
import { AuthUserContext } from "../context/AuthUserContext";



export default function Home() {
  const { currentUser, userSchools, authed } = useContext(AuthUserContext);
  const router = useRouter();

    useEffect(() => {
      if(!authed) {
        router.push("/login");
      }
    })

  return (
    <>
      <HomeNavBar />
      <Spacer />
      <Spacer />

      <Grid.Container
        gap={0.5}
        justify="center"
        css={{ maxWidth: "67%", margin: "0 auto" }}
      >
        <Spacer />

        <Grid xs={12} justify="center" >
          <h1>My College List</h1>
        </Grid>

        <Grid xs={12} justify="center">
          {userSchools.length > 0 ? (
            <Collapse.Group splitted css={{ display: "block", width: "100%" }} justify="center">
            {userSchools.map((schoolDoc, index) => (
              <CollegeInformationCard
                name={schoolDoc.data().name}
                data={schoolDoc.data()}
                index={index}
                inMyList
                key={schoolDoc.id}
              ></CollegeInformationCard>
            ))}
          </Collapse.Group>
          ) : (
            <Grid justify="center">
              <Text h4 >You have no colleges on your list</Text>
              <Button onPress={() => router.push("/searchColleges")} auto ripple css={{margin: "auto"}}>Search for colleges</Button>
            </Grid>

          )}
        </Grid>
      </Grid.Container>
    </>
  );
}
