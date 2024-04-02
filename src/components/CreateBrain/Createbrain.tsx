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
import { useContext, useState } from "react";
import { createBrain, insertUserBrain } from "~src/util/Api";
import { Storage } from "@plasmohq/storage";
import { CreateUser } from "~src/util/Api/ClubbedRequests";

import "./Createbrain.css";
import { BrainContext } from "~src/sidepanel";

export const CreateBrain = ({ openBrainModal, setOpenBrainModal }) => {
  const [brainName, setBrainName] = useState<string>("");
  const [brainNameError, setBrainNameError] = useState<string>("");
  const [collabEmail, setCollabEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const storage = new Storage();
  const toast = useToast();
  const { getBrainList } = useContext(BrainContext);

  const CreateBrain = async () => {
    const userId = await storage.get("userId");
    if (userId) {
      setLoading(true);
      const { id } = await createBrain({ name: brainName });
      await insertUserBrain({
        userId,
        brainId: id,
      });
      if (collabEmail !== "") {
        const dummyName = collabEmail.match(/^([^@]+)/)[1];
        const newUserId = await CreateUser({
          email: collabEmail,
          name: dummyName,
          profileImageUrl: "",
        });
        if (newUserId) {
          await insertUserBrain({
            userId: newUserId,
            brainId: id,
          });
        }
      }
      setOpenBrainModal(false);
      setLoading(false);
      getBrainList();
      toast({
        title: "New Brain created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setBrainName("");
      setCollabEmail("");
    } else {
      console.error("User not found");
    }
  };

  const handleCreateBrain = async () => {
    if (validateInputFields()) return;

    CreateBrain();
  };

  const validateInputFields = () => {
    let errorExists = false;
    if (!brainName) {
      errorExists = true;
      setBrainNameError("Name can't be empty");
    }

    return errorExists;
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
              <Box
                display="flex"
                flexDirection="column"
                marginLeft="31px"
                width="100%"
              >
                <Input
                  placeholder="Enter name of the brain"
                  value={brainName}
                  onChange={(e) => {
                    setBrainNameError("");
                    setBrainName(e.target.value);
                  }}
                  isInvalid={!!brainNameError}
                />
                {brainNameError && (
                  <Box fontSize="12px" marginTop="5px" color="red.500">
                    {brainNameError}
                  </Box>
                )}
              </Box>
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
