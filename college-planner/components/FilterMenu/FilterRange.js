import { Text, Input, Spacer, Row } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
export default function FilterRange(props) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const minRef = useRef(null);
  const maxRef = useRef(null);

  const updateValues = (event) => {

  }

  useEffect(() => {
    const detectKey = (event) => {
      if (event.key == "Enter") {
        props.setUpdated(true);
        event.target.blur();
      }
    };

    const min = minRef.current;
    const max = maxRef.current;

    min.addEventListener('keypress', detectKey);
    max.addEventListener('keypress', detectKey);

    return () => {
      min.removeEventListener('keypress', detectKey);
      max.removeEventListener('keypress', detectKey);
    };
  });


  return (
    <Row css={{ marginBottom: "10px" }}>
      <Input ref={minRef} bordered labelLeft={props.label} aria-label={props.label + " min"}
        onChange={(event) => {
          
          setMin(event.target.value);
          props.setRange({ min: event.target.value, max: max });
          props.setUpdated(true);
          
        }}
      ></Input>
      <Spacer />
      <Text h4>{"<"}</Text>
      <Spacer />
      <Text h4 css={{ margin: "0 auto", width: "10vw", textAlign: "center" }}>
        {props.name}
      </Text>
      <Spacer />
      <Text h4>{"<"}</Text>
      <Spacer />
      <Input ref={maxRef} bordered labelLeft={props.label} aria-label={props.label + " max"}
        onChange={(event) => {
          
          setMax(event.target.value);
          props.setRange({ min: min, max: event.target.value });
          props.setUpdated(true);
          
        }}
      ></Input>
    </Row>
  );
}
