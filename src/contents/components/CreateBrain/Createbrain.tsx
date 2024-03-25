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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { createBrain, insertUserBrain } from "~src/util/Api";
import { Storage } from "@plasmohq/storage";

import "./Createbrain.css";

export const CreateBrain = ({ openBrainModal, setOpenBrainModal }) => {
  const [brainName, setBrainName] = useState<string>("");
  const [collabEmail, setCollabEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const storage = new Storage();
  const toast = useToast();

  const handleCreateBrain = async () => {
    const userId = await storage.get("userId");
    if (userId) {
      setLoading(true);
      const { id } = await createBrain({ name: brainName });
      await insertUserBrain({
        userId,
        brainId: id,
      });
      setOpenBrainModal(false);
      setLoading(false);
      toast({
        title: "Bookmark saved successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      console.error("User not found");
    }
  };

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
            onClick={handleCreateBrain}
            isLoading={loading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
