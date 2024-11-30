import { Box, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const ScoreDisplay = ({ score }: { score: number }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'color(srgb 0.7204 0.5789 0.4314)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        boxShadow: 3,
        maxWidth: 'fit-content',
        marginTop: '1rem',
        marginBottom: '2rem',
      }}
    >
      <EmojiEventsIcon sx={{ fontSize: '2rem', marginRight: '0.5rem' }} />
      <Typography variant='h6' fontWeight='bold'>
        Current Score: {score}
      </Typography>
    </Box>
  );
};

export default ScoreDisplay;
