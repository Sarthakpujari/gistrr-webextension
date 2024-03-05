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
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState, type SetStateAction } from "react";

export const BookmarkInput = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: SetStateAction<boolean>) => void;
}) => {
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setTitle(document.title);
    setUrl(window.location.href);
  }, []);

  return (
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add your Bookmark!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <FormControl>
              <FormLabel>Bookmark Title</FormLabel>
              <FormHelperText>Add your bookmark title</FormHelperText>
              <Input type="text" value={title} style={{ marginTop: "10px" }} />
            </FormControl>
          </div>
          <div style={{ marginTop: "30px" }}>
            <FormControl>
              <FormLabel>Bookmark URL</FormLabel>
              <FormHelperText>Paste your bookmark URL here</FormHelperText>
              <Input type="text" value={url} style={{ marginTop: "10px" }} />
            </FormControl>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => console.log("Bookmark saved")}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
