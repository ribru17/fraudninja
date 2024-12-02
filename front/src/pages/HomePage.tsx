import { Container, Paper, Button, Grid2, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FraudNinja from '../images/Fraudninja.png';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ padding: 5 }}>
      <Paper
        sx={{
          padding: 3,
          boxShadow: (theme) => `0px 4px 10px ${theme.palette.primary.main}`,
          backgroundColor: '#f9f9ff',
          borderRadius: 2,
        }}
      >
        <Grid2 container direction='column' alignItems='center'>
          <Box m={2}>
            <img
              src={FraudNinja}
              alt='App Icon'
              style={{ width: 550, height: 250 }}
            />
          </Box>
          <Grid2>
            <Button
              variant='contained'
              size='large'
              onClick={() => navigate('/play')}
              sx={{
                fontSize: '1.5rem',
                padding: '10px 30px',
                backgroundColor: 'secondary.main',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
            >
              Play
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default HomePage;
