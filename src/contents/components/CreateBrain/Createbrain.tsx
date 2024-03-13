import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import "./Createbrain.css";

export const CreateBrain = ({ openBrainModal, setOpenBrainModal }) => {
  const [brainName, setBrainName] = useState<string>("");
  const [collabEmail, setCollabEmail] = useState<string>("");

  return (
    <Modal isOpen={openBrainModal} onClose={() => setOpenBrainModal(false)}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Create Brain</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box className="bookmark-input">
            <Box className="input_container">
              <Text mb="12px" marginTop={2}>
                Brain:
              </Text>
              <Input
                placeholder="Enter the name of your brain"
                value={brainName}
                onChange={(e) => setBrainName(e.target.value)}
                marginLeft="31px"
              />
            </Box>
            <Box className="input_container1">
              <Text mb="12px" marginTop={2} width="100px">
                Share with:
              </Text>
              <Input
                placeholder="add collaborators by email address"
                value={collabEmail}
                onChange={(e) => setCollabEmail(e.target.value)}
              />
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
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
