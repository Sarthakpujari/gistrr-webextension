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
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const storage = new Storage();

  let copyEventListener;

  useEffect(() => {
    setEventListener();
    setTitle(document.title);
    setUrl(window.location.href);

    () => {
      document.removeEventListener("copy", copyEventListener);
    };
  }, []);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

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
        note_url: "abcd",
        note: "abcd",
        owner_id: userId,
        tags: "tags",
      });
      // insert brain bookmark
      const { id: insertBrainBookmarkId } = await insertBrainBookmark({
        brainId: "21d984f5-c5f5-4447-8a6e-3cfc2291afff",
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
              />
            </Box>
            <Box className="input_container_textarea">
              <Text mb="12px" marginTop={2}>
                Notes:
              </Text>
              <Textarea
                placeholder="Enter your comments here"
                value={comments}
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
              />
            </Box>
            <Box className="input_container">
              <Text mb="12px" marginTop={2}>
                Tags:
              </Text>
              <Input placeholder="Enter Tags" marginLeft="7px" />
            </Box>
            <Box className="input_container">
              <Text mb="12px" marginTop={2}>
                Brain:
              </Text>
              <Box width="100%">
                <Select
                  size="lg"
                  options={[
                    { value: "1", label: "Brain 1" },
                    { value: "2", label: "Brain 2" },
                  ]}
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
