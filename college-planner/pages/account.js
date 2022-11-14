
import { BoxUpload, ImagePreview } from "../components/FileBox";
import HomeNavBar from "../components/HomeNavBar";
import { storage, ref, uploadBytes, getDownloadURL, db, doc, updateDoc, getDoc } from "../firebase/firebase";

import { Text, Image, Avatar, Grid, Row, Spacer, Input } from "@nextui-org/react";
import { Modal, Button } from '@nextui-org/react';
const FolderIcon = "../FolderIcon.png";
const CloseIcon = "../CloseIcon.svg";
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthUserContext } from "../context/AuthUserContext"
import { useRouter } from "next/router";

export default function Account() {
  const router = useRouter();
  const { currentUser, updateUser, authed } = useContext(AuthUserContext);
  const usernameRef = useRef(null);
  const [image, setImage] = useState("");

  const [updatedUsername, setUpdatedUsername] = useState(false);

  const [isUploaded, setIsUploaded] = useState(false);
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    setIsValid(true);

  };

  const saveHandler = () => {
    uploadPhotoToStorage();
    closeHandler();
  }

  const cancelUpload = () => {
    setIsUploaded(false);
    setFilename("");
    setImage("");
    closeHandler();
  }

  function handleImageChange(e) {
    if (e.target.files[0].type.includes("image")) { //ensure the file is an image
      setIsValid(true);
      if (e.target.files && e.target.files[0]) {
        setFilename(e.target.files[0].name);
        setFile(e.target.files[0]);
        let reader = new FileReader();
        reader.onload = function (e) {
          setImage(e.target.result);
          setIsUploaded(true);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setIsValid(false); //set the state to false if the file isn't an image
    }
  }


  function uploadPhotoToStorage() {
    const storageRef = ref(storage, `/users/${currentUser.id}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      }).then((url) => {
        updateUserPhoto(url)
      }).catch(err => console.log(err));
  }

  function updateUserPhoto(newUrl) {
    const userRef = doc(db, "User", currentUser.id);
    updateDoc(userRef, {
      photoURL: newUrl
    }).then(() => getDoc(userRef))
      .then((doc) => updateUser(doc))
      .catch(err => console.log(err));
  }

  function updateUsername(newUsername) {
    const userRef = doc(db, "User", currentUser.id);
    updateDoc(userRef, {
      name: newUsername
    }).then(() => getDoc(userRef))
      .then((doc) => {
        updateUser(doc);
        setUpdatedUsername(true);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {

    if (!authed) {
      router.push("/login");
    }
    const detectKey = (event) => {
      if (event.key == "Enter") {
        updateUsername(event.target.value);
        event.target.blur();
      }
    };
    const element = usernameRef.current;

    element.addEventListener('keypress', detectKey);
    return () => {
      element.removeEventListener('keypress', detectKey);

    };
  }, []);

  return (
    <>
      <HomeNavBar />
      <Spacer />
      <Grid.Container gap={1} justify="center" css={{ margin: "0 auto" }}>
        <Text h1 b>Edit Profile</Text>
        <Row justify="center">
          <Grid xs={4} justify="center">
            <Input
              size="lg"
              bordered
              ref={usernameRef}
              fullWidth
              value={currentUser && currentUser.data().name}
              label="Username"
              clearable

            />
          </Grid>
        </Row>
        {updatedUsername && <Text h6 color="success">Username changed to: {currentUser.data().name}</Text>}
        <Row justify="center">
          <Grid justify="center">
            <Avatar
              src={currentUser && (currentUser.data().photoURL || "../DefaultAvatar.png")}
              bordered
              css={{ width: "150px", height: "150px", borderColor: "black", margin: "auto" }}
            >
            </Avatar>
          </Grid>
        </Row>
        <Row justify="center">
          <Grid justify="center">
            <Button auto size="lg" onPress={handler} ripple css={{ margin: "auto" }}>
              Upload Image
            </Button>
            <Modal
              closeButton
              aria-labelledby="modal-title"
              width="350px"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Body css={{ placeItems: "center" }}>
                <BoxUpload error={!isValid && "#E9085F"}> 
                  <div className="image-upload">
                    {!isUploaded ? (
                      <>
                        <label htmlFor="upload-input" style={{ justify: "center" }}>
                          <Image
                            src={FolderIcon}
                            draggable={"false"}
                            alt="placeholder"
                            width={"150px"}
                            height={"150px"}
                          />
                          <Text css={{ textAlign: "center" }}>Click to upload image</Text>
                        </label>

                        <input
                          id="upload-input"
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleImageChange}
                        />
                      </>
                    ) : (
                      <ImagePreview>
                        <Image
                          className="close-icon"
                          src={CloseIcon}
                          alt="CloseIcon"
                          onClick={() => {
                            setIsUploaded(false);
                            setImage(null);
                          }}
                        />
                        <Image
                          id="uploaded-image"
                          src={image || currentUser.data().photoURL}
                          draggable={false}
                          alt="uploaded-img"
                        >
                        </Image>
                      </ImagePreview>
                    )}
                  </div>
                </BoxUpload>
                {isUploaded && <Text h3 css={{ textAlign: "center" }}>{filename}</Text>}
                {!isValid && <Text h4 color="error" css={{ textAlign: "center" }}>{"Invalid file. Please choose an image file (.jpg, .jpeg, .png)"}</Text>}

              </Modal.Body>
              <Modal.Footer >
                <Row justify="flex-end">
                  <Button color="error" ripple auto onPress={cancelUpload}>
                    CANCEL
                  </Button>

                  <Button color="primary" ripple auto css={{ marginLeft: "10px" }} onPress={saveHandler}>
                    SAVE
                  </Button>
                </Row>

              </Modal.Footer>
            </Modal>

          </Grid>
        </Row>
      </Grid.Container>
    </>
  );
}
