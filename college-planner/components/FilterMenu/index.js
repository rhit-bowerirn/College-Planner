import { useState, useEffect } from "react";
import FilterRange from "./FilterRange";
import FilterDropdown from "./FilterDropdown";

export default function FilterMenu(props) {


    const [tuitionRange, setTuitionRange] = useState({});
    const [populationRange, setPopulationRange] = useState({});
    const [majorSet, setMajors] = useState(new Set([]));
    const [sportSet, setSports] = useState(new Set([]));
    const [stateSet, setStates] = useState(new Set([]));
    const [updated, setUpdated] = useState(false);

    const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    const sports = ["Swimming", "Football", "Track & Field", "Soccer"];
    const majors = ["Computer Science", "Mechanical Engineering", "Computer Engineering", "Business", "English"];
    useEffect(() => {
        if (updated) {
            props.updateFilters({
                tuitionRange: tuitionRange,
                majorSet: majorSet
            })
            
            setUpdated(false);
        }
    });




    return (
        <div hidden={props.hidden}>
            <FilterRange name="Tuition" label="$" setRange={setTuitionRange} setUpdated={setUpdated} />
            <FilterDropdown name="Majors" options={majors} setOptions={setMajors} setUpdated={setUpdated} />
        </div>

    );
}