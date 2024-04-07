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
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState, type SetStateAction } from "react";
import { Storage } from "@plasmohq/storage";
import {
  createBookmark,
  insertBrainBookmark,
  insertChat,
  insertContent,
} from "~src/util/Api";

import "./BookmarkInput.scss";

export const BookmarkInput = ({
  brainList,
  openBookmarkModal,
  setOpenBookmarkModal,
}: {
  brainList: any[];
  openBookmarkModal: boolean;
  setOpenBookmarkModal: (value: SetStateAction<boolean>) => void;
}) => {
  const storage = new Storage();
  const toast = useToast();
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [brainId, setBrainId] = useState<string>("");
  const [brainError, setBrainError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUploadTitle, setFileUploadTitle] = useState<string>("");

  useEffect(() => {
    getBookmarkDetails();
  }, []);

  const getBookmarkDetails = async () => {
    const pageTitle = await storage.get("bookmark-page-title");
    const pageUrl = await storage.get("bookmark-page-url");
    setTitle(pageTitle);
    setUrl(pageUrl);
  };

  const handleCloseModal = () => {
    setOpenBookmarkModal(false);
  };

  const saveBookmark = async () => {
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
        toast({
          title: "Bookmark added successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        handleCloseModal();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("User not found");
    }
  };

  const handleSaveBookmark = async () => {
    if (validateInputFields()) return;

    saveBookmark();
  };

  const validateInputFields = () => {
    let errorExists = false;
    if (!title) {
      errorExists = true;
      setTitleError("Title can't be empty");
    }

    if (!url) {
      errorExists = true;
      setUrlError("URL can't be empty");
    }

    if (!brainId) {
      errorExists = true;
      setBrainError("You need to select a brain");
    }

    return errorExists;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setUploadedFile(file);
  };

  return (
    <Modal isOpen={openBookmarkModal} onClose={handleCloseModal}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Add To Your Brain</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant='soft-rounded' colorScheme='blue'>
            <TabList>
              <Tab>Save Bookmark</Tab>
              <Tab>Upload Document</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box className="bookmark-input">
                  <Box className="input_container">
                    <Text mb="12px" marginTop={2}>
                      URL:
                    </Text>
                    <Box
                      display="flex"
                      flexDirection="column"
                      marginLeft="10px"
                      width="100%"
                    >
                      <Input
                        placeholder="Enter bookmark URL"
                        value={url}
                        onChange={(e) => {
                          setUrl(e.target.value);
                          setUrlError("");
                        }}
                        isInvalid={!!urlError}
                      />
                      {urlError && (
                        <Box fontSize="12px" marginTop="5px" color="red.500">
                          {urlError}
                        </Box>
                      )}
                    </Box>
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
                    <Box
                      display="flex"
                      flexDirection="column"
                      marginLeft="10px"
                      width="100%"
                    >
                      <Input
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          setTitleError("");
                        }}
                        isInvalid={!!titleError}
                      />
                      {titleError && (
                        <Box fontSize="12px" marginTop="5px" color="red.500">
                          {titleError}
                        </Box>
                      )}
                    </Box>
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
                          setBrainError("");
                          setBrainId(selectedOption.value);
                        }}
                      />
                    </Box>
                  </Box>
                  {brainError && (
                    <Box fontSize="12px" color="red.500" marginLeft="51px">
                      {brainError}
                    </Box>
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
              <Box className="bookmark-input">
                  <Box className="input_container">
                    <Text mb="12px" marginTop={2}>
                      Upload:
                    </Text>
                    <Box
                      display="flex"
                      flexDirection="column"
                      marginLeft="10px"
                      width="100%"
                    >
                      <Input
                        type = "file"
                        placeholder="Supports .docx, .pdf, .jpg, .png"
                        onChange={handleFileChange}
                      />
                      {urlError && (
                        <Box fontSize="12px" marginTop="5px" color="red.500">
                          {urlError}
                        </Box>
                      )}
                    </Box>
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
                    <Box
                      display="flex"
                      flexDirection="column"
                      marginLeft="10px"
                      width="100%"
                    >
                      <Input
                        placeholder="Enter new title"
                        value={fileUploadTitle}
                        onChange={(e) => {
                          setFileUploadTitle("");
                        }}
                        isInvalid={!!titleError}
                      />
                      {titleError && (
                        <Box fontSize="12px" marginTop="5px" color="red.500">
                          {titleError}
                        </Box>
                      )}
                    </Box>
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
                          setBrainError("");
                          setBrainId(selectedOption.value);
                        }}
                      />
                    </Box>
                  </Box>
                  {brainError && (
                    <Box fontSize="12px" color="red.500" marginLeft="51px">
                      {brainError}
                    </Box>
                  )}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSaveBookmark}
            isLoading={loading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

