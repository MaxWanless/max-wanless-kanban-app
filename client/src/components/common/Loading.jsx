import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = (props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height={props.fullHeight ? "100vh" : "100%"}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
