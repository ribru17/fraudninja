import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface EndGameProps {
  totalScore: number;
  isGraduating: boolean;
}

const EndGame: React.FC<EndGameProps> = ({ totalScore, isGraduating }) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const handleLearnMore = () => {
    navigate('/resources');
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        backgroundColor: '#f4f6f8',
        borderRadius: '8px',
        boxShadow: 3,
        width: '80%',
        margin: 'auto',
      }}
    >
      {isGraduating ? (
        <>
          <Typography variant='h4' sx={{ marginBottom: 2 }}>
            Congratulations, you just graduated ! 🎉 🎓
          </Typography>
          <Typography variant='body1' sx={{ marginBottom: 3 }}>
            You will received soon an email to confirm your graduation ! Your
            total score is :
          </Typography>
        </>
      ) : (
        <>
          <Typography variant='h4' sx={{ marginBottom: 2 }}>
            Congratulations ! 🎉
          </Typography>
          <Typography variant='body1' sx={{ marginBottom: 3 }}>
            You just completed a set of 10 cards! Your total score is:
          </Typography>
        </>
      )}

      <Typography variant='h6' sx={{ marginBottom: 3, fontWeight: 'bold' }}>
        {totalScore}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant='contained'
          color='primary'
          onClick={handlePlayAgain}
          sx={{ padding: '10px 20px' }}
        >
          Play Again
        </Button>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleLearnMore}
          sx={{ padding: '10px 20px' }}
        >
          Learn More About Scams
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleLeaderboard}
          sx={{ padding: '10px 20px' }}
        >
          Check Leaderboard
        </Button>
      </Box>
    </Box>
  );
};

export default EndGame;
