import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

// Api
import axiosSections from "../../api/axisoSections";
import axiosTask from "../../api/axiosTasks";

// Icons
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

// Components
import TaskModal from "./TaskModal";

const Kanban = ({ sections, boardId }) => {
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(undefined);
  let timer;

  useEffect(() => {
    setData(sections);
  }, [sections]);

  const handleCreateSection = async () => {
    try {
      const section = await axiosSections.create(boardId);
      setData([...data, section]);
    } catch (err) {
      alert(err);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      await axiosSections.delete(boardId, sectionId);
      const newData = [...data].filter((e) => e.id !== sectionId);
      setData(newData);
    } catch (err) {
      alert(err);
    }
  };

  const handleTitleChange = async (e, sectionId) => {
    clearTimeout(timer);

    const newTitle = e.target.value;

    let temp = [...data];
    const index = temp.findIndex((e) => e.id === sectionId);
    temp[index] = { ...temp[index], title: newTitle };

    setData(temp);

    timer = setTimeout(async () => {
      try {
        await axiosSections.update(boardId, sectionId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, 500);
  };

  const handleCreateTask = async (sectionId) => {
    try {
      const task = await axiosTask.create(boardId, { sectionId });
      const newData = [...data];

      const index = newData.findIndex((e) => e.id === sectionId);
      newData[index].tasks.unshift(task);

      setData(newData);
    } catch (err) {
      alert(err);
    }
  };

  const handleDragEnd = async ({ source, destination }) => {
    if (!destination) return;

    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);

    const destinationColIndex = data.findIndex(
      (e) => e.id === destination.droppableId
    );

    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceSectionId = sourceCol.id;
    const destinationSectionId = destinationCol.id;

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTasks;
      data[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[destinationColIndex].tasks = destinationTasks;
    }
    try {
      await axiosTask.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
      });
      setData(data);
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdateModal = (task) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e.id === task.section.id);
    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e.id === task.id
    );

    newData[sectionIndex].tasks[taskIndex] = task;
    setData(newData);
  };

  const handleDeleteModal = (task) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex((e) => e.id === task.section.id);

    const taskIndex = newData[sectionIndex].tasks.findIndex(
      (e) => e.id === task.id
    );
    newData[sectionIndex].tasks.splice(taskIndex, 1);
    setData(newData);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button onClick={handleCreateSection}>Add section</Button>
        <Typography variant="body2" fontWeight="700">
          {data?.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          display="flex"
          alignItems="flex-start"
          width="cal(100vw - 400px)"
          sx={{ overflowX: "auto" }}
        >
          {data.map((section) => (
            <div key={section.id} style={{ width: "300px" }}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    width="300px"
                    padding="10px"
                    marginRight="10px"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      marginBottom="10px"
                    >
                      <TextField
                        value={section.title}
                        placeholder="Untitled"
                        variant="outlined"
                        onChange={(e) => handleTitleChange(e, section.id)}
                        sx={{
                          flexGrow: 1,
                          "& .MuiOutlinedInput-input": { padding: 0 },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset",
                          },
                          "& .MuiOutlinedInput-root": { fontSize: "0.8rem" },
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleCreateTask(section.id)}
                        sx={{ color: "gray", "&:hover": { color: "green" } }}
                      >
                        <AddBoxOutlinedIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteSection(section.id)}
                        sx={{ color: "gray", "&:hover": { color: "red" } }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Box>
                    {/* Tasks */}
                    {section.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => setSelectedTask(task)}
                            sx={{
                              padding: "10px",
                              margin: "10px",
                              cursor: snapshot.isDragging
                                ? "grab"
                                : "pointer!important",
                            }}
                          >
                            <Typography>
                              {task.title === "" ? "Untitled" : task.title}
                            </Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
      <TaskModal
        task={selectedTask}
        boardId={boardId}
        handleClose={() => setSelectedTask(undefined)}
        handleUpdate={handleUpdateModal}
        handleDelete={handleDeleteModal}
      />
    </>
  );
};

export default Kanban;
