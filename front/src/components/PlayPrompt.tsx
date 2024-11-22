import { Box, Button, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const PlayPrompt = ({ onPlay }: { onPlay: () => void }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 4,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant='h6' sx={{ mb: 2 }}>
        Ready to climb the leaderboard?
      </Typography>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Play the FraudNinja game now to detect scams and earn points to secure
        your rank!
      </Typography>
      <Button
        variant='contained'
        color='primary'
        startIcon={<PlayArrowIcon />}
        onClick={onPlay}
      >
        Play Now
      </Button>
    </Box>
  );
};

export default PlayPrompt;
