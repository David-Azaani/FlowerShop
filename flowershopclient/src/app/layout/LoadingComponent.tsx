import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  loadingMessage?: string;
}
export default function LoadingComponent({
  loadingMessage = "Loading ...",
}: Props) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        height="30vh"
      >
        <CircularProgress size={100} color="secondary" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "50%" }}
        >
          {loadingMessage}
        </Typography>
      </Box>
    </Backdrop>
  );
}
