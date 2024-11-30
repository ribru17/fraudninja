// EmailCard.tsx
import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import './EmailCard.css';

interface EmailCardProps {
  sender: string;
  message: string;
}

const EmailCard: React.FC<EmailCardProps> = ({ sender, message }) => {
  return (
    <Paper elevation={3} className='paper-style'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 1,
        }}
      >
        <Typography variant='subtitle2' color='textSecondary'>
          From: {sender}
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          {new Date().toLocaleDateString()}
        </Typography>
      </Box>
      <Box>
        <Typography variant='subtitle2' color='textSecondary'>
          to me ▼
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
        {message}
      </Typography>
    </Paper>
  );
};

export default EmailCard;
