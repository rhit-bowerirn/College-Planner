import React, { useState, useEffect, useContext, useRef } from 'react';
import { Grid, Input, Spacer, Collapse, Tooltip, Button } from "@nextui-org/react";
import HomeNavBar from '../components/HomeNavBar';
import CollegeInformationCard from "../components/CollegeInformationCard"

import { FaFilter } from 'react-icons/fa';
import FilterMenu from '../components/FilterMenu';

import { AuthUserContext } from "../context/AuthUserContext";
import { db, collection, query, where, limit, getDocs } from "../firebase/firebase";
import { useRouter } from "next/router";

export default function SearchColleges() {
  const { currentUser, authed } = useContext(AuthUserContext);
  const ref = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const [filterInformation, setFilterInformation] = useState({
    tuitionRange: { min: "", max: "" },
    majorSet: (new Set([])),
  });


  const [filtersHidden, toggleFilters] = useState(true);

  const filterButtonAction = () => {
    toggleFilters(!filtersHidden);
  };


  const [schools, setSchools] = useState([]);

  const buildSchoolQuery = (searchString, filters) => {
    let q = query(collection(db, "School"));
    if (searchInput) {
      q = query(q, where("name", "==", searchString));
    }

    if (filters.tuitionRange.min) {
      q = query(q, where("tuition", ">", parseInt(filters.tuitionRange.min)));
    }
    if (filters.tuitionRange.max) {
      q = query(q, where("tuition", "<", parseInt(filters.tuitionRange.max)));
    }
    if (filters.majorSet.size > 0 && !filters.majorSet.has("Any")) {
      q = query(q, where("majors", "array-contains-any", Array.from(filters.majorSet)));
    }

    return query(q, limit(100));

  }

  const searchCollege = (searchString, filters) => {
    let q = buildSchoolQuery(searchString, filters);
    const qs = getDocs(q).then((res) => {
      let schoolList = [];
      res.forEach((doc) => schoolList.push(doc));
      setSchools(schoolList);
    });

  };

  const updateFilters = (newFilters) => {
    setFilterInformation(newFilters);
    searchCollege(searchInput, newFilters);
  }



  useEffect(() => {
    if (!authed) {
      router.push("/login");
    }
    const detectKey = (event) => {
      if (event.key == "Enter") {
        setSearchInput(event.target.value);
        searchCollege(event.target.value, filterInformation);
        event.target.blur();
      }
    };

    const element = ref.current;

    element.addEventListener('keypress', detectKey);

    return () => {
      element.removeEventListener('keypress', detectKey);
    };
  });

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
        <Grid xs={12}>
          <Input
            size="lg"
            css={{ zIndex: 1 }}
            ref={ref}
            fullWidth
            clearable
            contentRightStyling={false}
            labelPlaceholder="Search for colleges"
            contentRight={
              //<FilterButton action={filterButtonAction}/>
              <Tooltip content="Filters" color="invert">
                <Button
                  onPress={filterButtonAction}
                  auto
                  iconRight={<FaFilter color="black" />}
                  css={{ backgroundColor: "inherit" }}
                ></Button>
              </Tooltip>
            }
          />
        </Grid>

        <Grid xs={10} justify="center">
          <FilterMenu hidden={filtersHidden} updateFilters={updateFilters} />
        </Grid>
        <Spacer />

        {schools.length > 0 && (<Grid xs={12} justify="center" >
          <h1>Search Results:</h1>
        </Grid>)}

        <Grid xs={12} justify="center">
          {schools && (
            <Collapse.Group splitted css={{ display: "block", width: "100%" }} justify="center">
              {schools.map((doc, index) => (

                <CollegeInformationCard
                  name={doc.id}
                  data={doc.data()}
                  index={index}
                  key={doc.id}
                ></CollegeInformationCard>
              ))}
            </Collapse.Group>
          )}
        </Grid>
      </Grid.Container>
    </>
  );
}
