import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBoards } from "../redux/features/boardSlice";
import { setFavouritesList } from "../redux/features/favouriteSlice";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

// Api
import axiosBoard from "../api/axiosBoard";

// Icons
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

// Components
import EmojiPicker from "../components/common/EmojiPicker";
import Kanban from "../components/common/Kanban";

const Board = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState("");
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector((state) => state.boards.value);
  const favourites = useSelector((state) => state.favourites.value);

  let timer;

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await axiosBoard.getOne(boardId);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.section);
        setIsFavourite(res.favourite);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getBoard();
  }, [boardId]);

  const handleIconChange = async (newIcon) => {
    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], icon: newIcon };

    if (isFavourite) {
      let tempFavourites = [...favourites];
      const favouriteIndex = tempFavourites.findIndex((e) => e.id === boardId);
      tempFavourites[favouriteIndex] = {
        ...tempFavourites[favouriteIndex],
        icon: newIcon,
      };
      dispatch(setFavouritesList(tempFavourites));
    }

    setIcon(newIcon);
    dispatch(setBoards(temp));
    try {
      await axiosBoard.update(boardId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };

  const handleTitleChange = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;

    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle };

    if (isFavourite) {
      let tempFavourites = [...favourites];
      const favouriteIndex = tempFavourites.findIndex((e) => e.id === boardId);
      tempFavourites[favouriteIndex] = {
        ...tempFavourites[favouriteIndex],
        title: newTitle,
      };
      dispatch(setFavouritesList(tempFavourites));
    }

    setTitle(newTitle);
    dispatch(setBoards(temp));

    timer = setTimeout(async () => {
      try {
        await axiosBoard.update(boardId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, 500);
  };

  const handleDescriptionChange = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await axiosBoard.update(boardId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, 500);
  };

  const handleAddFavourite = async (e) => {
    try {
      const board = await axiosBoard.update(boardId, {
        favourite: !isFavourite,
      });
      let newFavouriteList = [...favourites];

      if (isFavourite) {
        newFavouriteList = newFavouriteList.filter((e) => e.id !== boardId);
      } else {
        newFavouriteList.unshift(board);
      }
      dispatch(setFavouritesList(newFavouriteList));
      setIsFavourite(!isFavourite);
    } catch (err) {
      alert(err);
    }
  };

  const handleDeleteBoard = async (e) => {
    try {
      await axiosBoard.delete(boardId);
      if (isFavourite) {
        const newFavouriteList = favourites.filter((e) => e.id !== boardId);
        dispatch(setFavouritesList(newFavouriteList));
      }

      const newList = boards.filter((e) => e.id !== boardId);
      if (newList.length === 0) navigate("/boards");
      else navigate(`/boards/${newList[0].id}`);

      dispatch(setBoards(newList));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <IconButton onClick={handleAddFavourite}>
          {isFavourite ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleDeleteBoard}>
          <DeleteOutlinedIcon color="error" />
        </IconButton>
      </Box>
      <Box padding={"10px 50px"}>
        <Box>
          <EmojiPicker icon={icon} onChange={handleIconChange} />
          <TextField
            value={title}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            onChange={handleTitleChange}
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
              "& .MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: "700",
              },
            }}
          />
          <TextField
            value={description}
            placeholder="Add a description"
            variant="outlined"
            multiline
            fullWidth
            onChange={handleDescriptionChange}
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
              "& .MuiOutlinedInput-root": { fontSize: "0.8rem" },
            }}
          />
        </Box>
        <Box>
          <Kanban boardId={boardId} sections={sections} />
        </Box>
      </Box>
    </>
  );
};

export default Board;
