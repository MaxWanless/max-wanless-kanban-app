import { useState, useEffect } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const handleSelectEmoji = (e) => {
    const sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  const handleShowPicker = () => setIsShowPicker(!isShowPicker);

  return (
    <Box position="relative" width="max-content">
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={handleShowPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        display={isShowPicker ? "block" : "none"}
        position="absolute"
        top="100%"
        zIndex="9999"
      >
        <Picker data={data} onEmojiSelect={handleSelectEmoji} theme="dark" />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
