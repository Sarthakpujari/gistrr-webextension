import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: () => ({
        dialog: {
          bg: "#F8F5F1",
        },
      }),
    },
    Input: {
      baseStyle: {
        bg: "#F2F2F2",
        _focus: { bg: "#F2F2F2" },
        _hover: { bg: "#F2F2F2" },
      },
    },
  },
});
