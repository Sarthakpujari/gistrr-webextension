import { useContext, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";
import { UserContext } from "~src/contents/GistrrContentScript";

import { getUserBookmarks } from "~src/util/Api";
import { SingleHistory } from "./Singlehistory";
import { SearchBar } from "../Searchbar";

export const Historypanel = ({
  setShowCreateBrainModal,
}: {
  setShowCreateBrainModal: (show: boolean) => void;
}) => {
  const storage = new Storage();
  const [userBookmark, setUserBookmark] = useState<any[]>();
  const [filteredList, setFilteredList] = useState<any[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchUserBookmark();
  }, [user]);

  const fetchUserBookmark = async () => {
    const userId = await storage.get("userId");
    if (userId) {
      const response = await getUserBookmarks({ userId });
      response.sort(
        (a: { created_at: string }, b: { created_at: string }) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setUserBookmark(response);
      setFilteredList(response);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchParam = e.target.value.toLowerCase();
    setSearchTerm(searchParam);
    const filteredList = userBookmark.filter((item) => {
      if (searchParam === "") return true;
      return item.title.toLowerCase().includes(searchParam);
    });
    setFilteredList([...filteredList]);
  };

  return (
    <Box>
      <SearchBar
        searchTerm={searchTerm}
        onChangeHandler={onChangeHandler}
        setSearchTerm={setSearchTerm}
        setShowCreateBrainModal={setShowCreateBrainModal}
      />
      {filteredList?.map((bookmark, index) => (
        <SingleHistory key={index} bookmark={bookmark} />
      ))}
    </Box>
  );
};
