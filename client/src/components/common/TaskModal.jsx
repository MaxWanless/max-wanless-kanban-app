import { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";

import Moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Styles
import "../../css/custom-editor.css";

// Api
import axiosTasks from "../../api/axiosTasks";

// Icons
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";

let timer;
let isModalClosed = false;

const TaskModal = (props) => {
  const [task, setTask] = useState(props.task);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorWrapperRef = useRef();

  useEffect(() => {
    setTask(props.task);
    setTitle(props.task === undefined ? "" : props.task.title);
    setContent(props.task === undefined ? "" : props.task.content);

    if (props.task !== undefined) {
      isModalClosed = false;
    }
  }, [props.task]);

  const handleCloseModal = () => {
    isModalClosed = true;
    props.handleUpdate(task);
    props.handleClose();
  };

  const handleDelete = async () => {
    try {
      await axiosTasks.delete(props.boardId, task.id);
      props.handleDelete(task);
      setTask(undefined);
    } catch (err) {
      alert(err);
    }
  };

  const HandleUpdateTile = async (e) => {
    clearTimeout(timer);

    const newTitle = e.target.value;

    timer = setTimeout(async () => {
      try {
        await axiosTasks.update(props.boardId, task.id, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, 500);

    task.title = newTitle;
    setTitle(newTitle);
    props.handleUpdate(task);
  };

  const handleUpdateContent = async (event, editor) => {
    clearTimeout(timer);
    const data = editor.getData();

    console.log({ isModalClosed });

    if (!isModalClosed) {
      timer = setTimeout(async () => {
        try {
          await axiosTasks.update(props.boardId, task.id, { content: data });
        } catch (err) {
          alert(err);
        }
      }, 500);
      task.content = data;
      setContent(data);
      props.handleUpdate(task);
    }
  };

  return (
    <Modal
      open={task !== undefined}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={task !== undefined}>
        <Box sx={modalStyle}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            padding="2rem 5rem 5rem"
            height="100%"
          >
            <TextField
              value={title}
              placeholder="Untitled"
              variant="outlined"
              fullWidth
              onChange={HandleUpdateTile}
              sx={{
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
                "& .MuiOutlinedInput-root": {
                  fontSize: "2.5rem",
                  fontWeight: "700",
                },
                marginBottom: "10px",
              }}
            />
            <Typography variant="body2" fontWeight="700">
              {task !== undefined
                ? Moment(task.createdAt).format("yyyy-MM-DD")
                : ""}
            </Typography>
            <Divider sx={{ margin: "1.5rem 0" }} />
            <Box
              ref={editorWrapperRef}
              height="80%"
              sx={{ overflowX: "hidden", overflowY: "auto" }}
            >
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={handleUpdateContent}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TaskModal;

const modalStyle = {
  outline: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 1,
  height: "80%",
};
