import { Container, Typography, Paper, Button, Grid2 } from "@mui/material";

function HomePage() {
  return (
    <Container sx={{ padding: 5 }}>
      <Paper sx={{ padding: 3 }}>
        <Grid2 container direction="column" alignItems="center">
          <Typography variant="body2" fontSize={80} margin={5} align="center">
            Welcome to the game FraudNinja!
          </Typography>
          <Grid2>
            <Button variant="contained" size="large">
              Play
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
}

export default HomePage;
