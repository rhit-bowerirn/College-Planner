import React from "react";
import { Dropdown, Row, Text, Spacer } from "@nextui-org/react";

export default function FilterDropdown({name, options, setOptions, setUpdated}) {
  const [selected, setSelected] = React.useState(new Set([]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  return (
    <Row justify="center" css={{ marginBottom: "10px"}}>
      <Text h4>{name}: </Text>
      <Spacer />
      <Dropdown>
        <Dropdown.Button shadow color="black" css={{ tt: "capitalize", backgroundColor: "lightGray", zIndex: 1}}>
          {selectedValue}
        </Dropdown.Button>
        <Dropdown.Menu bordered css={{ backgroundColor: "lightGray" }}
          aria-label="Multiple selection actions"
          color="default"
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={keys => {
            
            if(keys.size > selected.size && selected.has("Any")) {
              keys.delete("Any");
            } else if(keys.size > selected.size && keys.has("Any")) {
              keys.clear();
              keys.add("Any");
            }
            setOptions(keys);
            setUpdated(true);
            setSelected(keys);
            
          }}
        >
          <Dropdown.Item key="Any">Any</Dropdown.Item>
          {options.map((option) => (
            <Dropdown.Item withDivider key={option} aria-label={option}>{option}</Dropdown.Item>
          ))}

        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );

}