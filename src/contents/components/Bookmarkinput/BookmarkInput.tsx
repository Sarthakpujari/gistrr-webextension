import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useRef, useState, type SetStateAction } from "react";
import { validLink } from "~src/util/regex";

import "./BookmarkInput.scss";
import { Storage } from "@plasmohq/storage";
import { createBookmark, insertBrainBookmark } from "~src/util/Api";

export const BookmarkInput = ({
  openBookmarkModal,
  setOpenBookmarkModal,
  brainList,
}: {
  openBookmarkModal: boolean;
  setOpenBookmarkModal: (value: SetStateAction<boolean>) => void;
  brainList: any[];
}) => {
  const storage = new Storage();
  const [title, setTitle] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [brainId, setBrainId] = useState<string>("");

  let copyEventListener;

  useEffect(() => {
    setEventListener();
    setTitle(document.title);
    setUrl(window.location.href);

    () => {
      document.removeEventListener("copy", copyEventListener);
    };
  }, []);

  const setEventListener = () => {
    copyEventListener = document.addEventListener("copy", (e) => {
      e.preventDefault();
      const text = window.getSelection().toString();
      if (validLink(text)) {
        setUrl(text);
      }
    });
  };

  const handleSaveBookMark = async () => {
    const userId = await storage.get("userId");
    console.log("userId >>> ", userId);
    if (userId) {
      const { id } = await createBookmark({
        title,
        url,
        noteUrl: "abcd",
        note: notes,
        ownerId: userId,
      });
      console.log("bookmark id >>> ", id);
      const { id: insertBrainBookmarkId } = await insertBrainBookmark({
        brainId,
        bookmarkId: id,
      });
      console.log("Success! >>> ", insertBrainBookmarkId);
    } else {
      console.error("User not found");
    }
  };

  return (
    <Modal
      isOpen={openBookmarkModal}
      onClose={() => setOpenBookmarkModal(false)}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Save Bookmark</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box className="bookmark-input">
            <Box className="input_container">
              <Text mb="12px" marginTop={2}>
                URL:
              </Text>
              <Input
                placeholder="Enter bookmark URL"
                value={url}
                marginLeft="10px"
                onChange={(e) => setUrl(e.target.value)}
              />
            </Box>
            <Box className="input_container_textarea">
              <Text mb="12px" marginTop={2}>
                Notes:
              </Text>
              <Textarea
                placeholder="Enter your notes here"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Box>
            <Box className="input_container">
              <Text mb="12px" marginTop={2}>
                Title:
              </Text>
              <Input
                placeholder="Enter Title"
                value={title}
                marginLeft="10px"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box className="input_container">
              <Text mb="12px" marginTop={2}>
                Brain:
              </Text>
              <Box width="100%">
                <Select
                  size="lg"
                  options={brainList?.map((item) => {
                    const { Name, id } = item.brain;
                    return { value: id, label: Name };
                  })}
                  onChange={(selectedOption) => {
                    setBrainId(selectedOption.value);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSaveBookMark}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
