import { Box, Button } from "@chakra-ui/react";

export const FloatingButtons = ({
  setOpenDrawer,
  setOpenModal,
  hideFloatingButtons,
  setHideFloatingButtons,
}) => {
  if (hideFloatingButtons) return null;
  return (
    <Box className="floating-container">
      <Button
        onClick={() => {
          setOpenDrawer(true);
          setHideFloatingButtons(true);
        }}
      >
        Open Drawer
      </Button>
      <Button
        onClick={() => {
          setOpenModal(true);
          setHideFloatingButtons(true);
        }}
      >
        Open Modal
      </Button>
    </Box>
  );
};
