import { CircularProgress } from "@mui/material";

function FullScreenSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size="10rem"></CircularProgress>
    </div>
  );
}

export default FullScreenSpinner;
