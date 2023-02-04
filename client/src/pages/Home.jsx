import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBoards } from "../redux/features/boardSlice";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

// Api
import axiosBoard from "../api/axiosBoard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateBoard = async () => {
    setLoading(true);
    try {
      const res = await axiosBoard.create();
      dispatch(setBoards([res]));
      navigate(`/boards/${res.id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={handleCreateBoard}
        sx={{ mt: 3 }}
        loading={loading}
      >
        Click here to create your first board
      </LoadingButton>
    </Box>
  );
};

export default Home;
