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
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { createBrain, insertUserBrain } from "~src/util/Api";
import { Storage } from "@plasmohq/storage";
import { CreateUser } from "~src/util/Api/ClubbedRequests";
import { BrainContext } from "~src/sidepanel";

import "./Createbrain.css";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string) => EMAIL_REGEXP.test(email);

export const CreateBrain = ({ openBrainModal, setOpenBrainModal }) => {
  const [brainName, setBrainName] = useState<string>("");
  const [brainNameError, setBrainNameError] = useState<string>("");
  const [collabEmail, setCollabEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [emailList, setEmailList] = useState<string[]>([]);
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

  const removeEmail = (email) => {
    const index = emailList.findIndex((e) => e === email);
    if (index !== -1) {
      const newEmails = [...emailList];
      newEmails.splice(index, 1);
      setEmailList(newEmails);
    }
  };

  const handleCloseClick = (email) => {
    removeEmail(email);
  };

  const Chip = ({ email, onCloseClick }) => (
    <Tag key={email} borderRadius="full" variant="solid" colorScheme="green">
      <TagLabel>{email}</TagLabel>
      <TagCloseButton
        onClick={() => {
          onCloseClick(email);
        }}
      />
    </Tag>
  );

  const ChipList = ({ emails = [], onCloseClick }) => (
    <Wrap spacing={1} mb={3}>
      {emails.map((email) => (
        <Chip email={email} key={email} onCloseClick={onCloseClick} />
      ))}
    </Wrap>
  );

  const emailChipExists = (email) => emailList.includes(email);

  const addEmails = (emailsToAdd) => {
    const validatedEmails = emailsToAdd
      .map((e) => e.trim())
      .filter((email) => isValidEmail(email) && !emailChipExists(email));

    const newEmails = [...emailList, ...validatedEmails];

    setEmailList(newEmails);
    setEmailInput("");
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text");
    const pastedEmails = pastedData.split(",");
    addEmails(pastedEmails);
  };

  const handleKeyDown = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();

      addEmails([emailInput]);
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
                Enter email:
              </Text>
              <Input
                placeholder="add collaborators by email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Box>
            <ChipList emails={emailList} onCloseClick={handleCloseClick} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
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
