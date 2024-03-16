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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, type SetStateAction } from "react";
import "./BookmarkInput.css";

export const BookmarkInput = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: SetStateAction<boolean>) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [brain, setBrain] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const fileInputRef = useRef(null);
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setTitle(document.title);
    setUrl(window.location.href);
  }, []);

  return (
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Save Bookmark</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box className="bookmark-input">
            <Box>
              <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                  <Tab>Links</Tab>
                  <Tab>Documents</Tab>
                  <Tab>Notes</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel paddingLeft={0} paddingRight={0}>
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
                  </TabPanel>
                  <TabPanel paddingLeft={0} paddingRight={0}>
                    <Box className="input_container_textarea">
                      <Text mb="12px" marginTop={2}>
                        Notes:
                      </Text>
                      <Textarea
                        placeholder="Enter your comments here"
                        value={comments}
                      />
                    </Box>
                  </TabPanel>
                  <TabPanel paddingLeft={0} paddingRight={0}>
                    <Box className="input_container">
                      <Text mb="12px" marginTop={2}>
                        Upload:
                      </Text>
                      <Box className="upload_field">
                        <Box>
                          <Input
                            value={fileName}
                            marginLeft="5px"
                            placeholder="Supported files .jpg .png .doc .docx .pdf"
                          />
                        </Box>
                        <Box>
                          <Button
                            colorScheme="blue"
                            size="sm"
                            variant="outline"
                            onClick={handleFileUploadClick}
                          >
                            Browse
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
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
              <Input
                placeholder="Enter name of your Brain"
                value={brain}
                marginLeft="5px"
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
