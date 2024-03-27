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
  useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState, type SetStateAction } from "react";
import { validLink } from "~src/util/regex";
import { Storage } from "@plasmohq/storage";
import {
  createBookmark,
  insertBrainBookmark,
  insertChat,
  insertContent,
} from "~src/util/Api";

import "./BookmarkInput.scss";

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
  const toast = useToast();
  const [title, setTitle] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [brainId, setBrainId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  let copyEventListener;

  useEffect(() => {
    setEventListener();
    setTitle(document.title);
    setUrl(window.location.href);

    () => {
      document.removeEventListener("copy", copyEventListener);
    };
  }, []);

  const handleCloseModal = () => {
    setOpenBookmarkModal(false);
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
    const user: { displayName: string } = await storage.get("user");
    if (userId) {
      setLoading(true);
      try {
        const { id } = await createBookmark({
          title,
          url,
          note: notes,
          ownerId: userId,
        });
        setLoading(false);
        handleCloseModal();
        toast({
          title: "Bookmark saved successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        await insertBrainBookmark({
          brainId,
          bookmarkId: id,
        });
        await insertContent({
          userId,
          brainId,
          title,
          contentUrl: url,
          notes,
        });
        await insertChat({
          senderUserId: userId,
          receiverUserId: brainId,
          text: `${user.displayName} has added ${title}`,
          url,
          chatType: "notif",
          responseSourceUrl: [],
        });
      } catch (error) {
        console.error("BookmarkInput.tsx >>> ", error);
      }
    } else {
      console.error("User not found");
    }
  };

  return (
    <Modal isOpen={openBookmarkModal} onClose={handleCloseModal}>
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
                    const { name, id } = item.brain;
                    return { value: id, label: name };
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
          <Button
            colorScheme="green"
            mr={3}
            onClick={handleSaveBookMark}
            isLoading={loading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
