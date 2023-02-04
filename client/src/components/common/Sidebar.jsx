import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBoards } from "../../redux/features/boardSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

// Api
import axiosBoard from "../../api/axiosBoard";

// Icons
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Components
import FavouritesList from "./FavouritesList";
import ColorModeToggle from "./ColorModeToggle";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.boards.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await axiosBoard.getAll();
        dispatch(setBoards(res));
      } catch (err) {
        alert(err);
      }
    };
    getBoards();
  }, [dispatch]);

  useEffect(() => {
    const activeItem = boards.findIndex((e) => e.id === boardId);
    if (boards.length > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0].id}`);
    }
    setActiveIndex(activeItem);
  }, [boards, boardId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDragEnd = async ({ source, destination }) => {
    const newList = [...boards];
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const activeItem = newList.findIndex((e) => e.id === boardId);
    setActiveIndex(activeItem);
    dispatch(setBoards(newList));

    try {
      await axiosBoard.updatePosition({ boards: newList });
    } catch (err) {
      alert(err);
    }
  };

  const handleAddBoard = async () => {
    try {
      const res = await axiosBoard.create();
      const newList = [res, ...boards];
      dispatch(setBoards(newList));
      navigate(`/boards/${res.id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: "250px",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <List
        disablePadding
        sx={{
          width: "250px",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <ListItem>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <Tooltip title="Colapse">
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </ListItem>
        <Box paddingTop="10px" />
        <FavouritesList />
        <Box paddingTop="10px" />
        <ListItem>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontWeight="700">
              Private
            </Typography>
            <IconButton onClick={handleAddBoard}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            key={"list-board-droppable"}
            droppableId={"list-board-droppable"}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item.id}`}
                        sx={{
                          pl: "20px",
                          cursor: snapshot.isDragging
                            ? "grab"
                            : "pointer!important",
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{
                            whiteSpace: "nowrap",
                            overFlow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
      <ListItem sx={{ alignSelf: "flex-end" }}>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Tooltip title="Signout">
            <IconButton onClick={handleLogout}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <ColorModeToggle />
        </Box>
      </ListItem>
    </Drawer>
  );
};

export default Sidebar;
