import { extendTheme } from "@chakra-ui/react";

export const chakraTheme = extendTheme({
  styles: {
    global: {
      body: {
        color: "black", // Set text color to black
      },
    },
  },
  components: {
    Modal: {
      baseStyle: {
        color: "black", // Set text color to black for the modal
      },
    },
    Input: {
      baseStyle: {
        borderColor: "#E2E8F0", // Set input border color to inherit default
      },
    },
  },
});
