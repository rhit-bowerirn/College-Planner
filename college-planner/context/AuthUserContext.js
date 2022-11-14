import { useEffect, useState, createContext } from "react";
import { auth, onAuthStateChanged, db, doc, getDoc, getDocs, where, query, collection, setDoc } from "../firebase/firebase";


const AuthUserContext = createContext();



const AuthUserProvider = ({ children }) => {
    const [authorized, setAuthorized] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userSchools, setUserSchools] = useState([]);


    const updateUser = (user) => {

        setCurrentUser(user);
        let schoolList = [];
        if (user.data().schools.length > 0) {
            getDocs(query(collection(db, "School"), where("name", "in", user.data().schools)))
                .then((docs) => {
                    docs.forEach((schoolDoc) => {
                        schoolList.push(schoolDoc);
                    });
                    setUserSchools(schoolList);
                })
        } else {
            setUserSchools([]);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthorized(true);
                const userRef = doc(db, "User", user.uid);
                getDoc(userRef).then(doc => {
                    if (doc.exists()) {
                        updateUser(doc);
                    } else {
                        setDoc(userRef, {
                            name: user.displayName || user.email,
                            photoURL: user.photoURL || "",
                            schools: [],
                            schoolsApplied: {}
                        })
                            .then(() => getDoc(userRef))
                            .then(doc => updateUser(doc))
                            .catch(err => console.log(err));
                    }
                });
            } else {
                setAuthorized(false);
            }
        });
    }, []);

    return (
        <AuthUserContext.Provider value={{ "currentUser": currentUser, "userSchools": userSchools, "updateUser": updateUser, "authed": authorized }}>
            {children}
        </AuthUserContext.Provider>
    )
}

export {
    AuthUserContext,
    AuthUserProvider
}