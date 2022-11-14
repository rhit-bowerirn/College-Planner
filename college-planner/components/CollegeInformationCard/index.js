import { Collapse, Spacer, Row, Avatar, Checkbox, Text, Button, } from "@nextui-org/react";
import { useContext } from "react";
import { AuthUserContext } from "../../context/AuthUserContext"
import { db, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "../../firebase/firebase";



export default function CollegeInformationCard({ name, data, index, inMyList }) {
    const { currentUser, updateUser } = useContext(AuthUserContext);

    const changeApplied = (checked) => {
        if (currentUser) {
            const userRef = doc(db, "User", currentUser.id);
            const newSchoolsApplied = currentUser.data().schoolsApplied;
            newSchoolsApplied[name] = checked;
            updateDoc(userRef, {
                schoolsApplied: newSchoolsApplied
            }).then(() => getDoc(userRef))
                .then((doc) => {
                    updateUser(doc);
                })
                .catch(err => console.log(err));
        }
    }

    const removeCollege = () => {
        if (currentUser) {
            const userRef = doc(db, "User", currentUser.id);
            updateDoc(userRef, {
                schools: arrayRemove(name),
            }).then(() => getDoc(userRef))
                .then((doc) => {
                    updateUser(doc);
                })
                .catch(err => console.log(err));
        }
    }

    const addCollege = () => {
        if (currentUser) {
            const newSchoolsApplied = currentUser.data().schoolsApplied;
            newSchoolsApplied[name] = newSchoolsApplied[name] || false;
            const userRef = doc(db, "User", currentUser.id);
            updateDoc(userRef, {
                schools: arrayUnion(name),
                schoolsApplied: newSchoolsApplied
            }).then(() => getDoc(userRef))
                .then((doc) => {
                    updateUser(doc);
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <div>
            <Collapse
                index={index}
                title={
                    <Row align="center">
                        <Text h3 css={{ width: "100%" }}>{name}</Text>
                        <Row justify="flex-end" css={{ marginLeft: "auto" }}>
                            {inMyList &&
                                <Checkbox defaultSelected={currentUser && currentUser.data().schoolsApplied[name]} onChange={(checked) => changeApplied(checked)} color="success" css={{zIndex: 1 }} >
                                    Applied?
                                </Checkbox>
                            }
                            <Spacer />
                            {currentUser.data().schools.includes(name) ? (
                                <Button auto ripple color="error" onPress={removeCollege} css={{zIndex: 1 }}>
                                    Remove
                                </Button>
                            ) : (
                                <Button auto ripple color="primary" onPress={addCollege} css={{zIndex: 1 }}>
                                    Add
                                </Button>
                            )}
                        </Row>
                    </Row>
                }
                showArrow={false}
                contentLeft={
                    <Row>
                        <Avatar
                            css={{ marginRight: "1vw", zIndex: 1 }}
                            squared
                            size="xl"
                            src={data && data.logo}
                            zoomed
                        />

                    </Row>
                }
            >
                {data && (
                <Text>
                    {data.website && (<><strong>Website: </strong> <a href={data.website} target="blank">{data.website}</a><br /></>)} 
                    {data.tuition && (<><strong>Tuition: </strong> {data.tuition}<br /></>)}
                    {data.netCost && (<><strong>Net Cost: </strong> {data.netCost}<br /></>)}
                    {data.state && (<><strong>State: </strong> {data.state}<br /></>)}
                    {data.totalStudents && (<><strong>Total Students: </strong> {data.totalStudents}<br /></>)}
                    {data.majors && (<><strong>Majors: </strong>{data.majors.join(", ")}<br /></>)}  
                    {data.division && (<><strong>NCAA Division: </strong> {data.division}<br /></>)}
                    {data.sports && (<><strong>Sports: </strong> {data.sports.join(", ")}<br /></>)}
                </Text>
                )}
            </Collapse>
        </div>
    );

}