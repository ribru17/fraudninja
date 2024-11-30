// TextCard.tsx
import { Box, Typography } from '@mui/material';
import React from 'react';
import './TextCard.css';

interface TextCardProps {
  sender: string;
  message: string;
}

const TextCard: React.FC<TextCardProps> = ({ sender, message }) => {
  return (
    <div className='text-wrapper'>
      <div className='title-sender'>
        <Typography
          variant='subtitle2'
          sx={{
            color: '#63380a',
          }}
        >
          From: {sender}
        </Typography>
      </div>
      <div className='bubble left'>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant='body1'
            sx={{
              color: '#fff',
              wordBreak: 'break-word',
            }}
          >
            {message}
          </Typography>
          <Typography
            variant='caption'
            sx={{
              color: 'rgba(255,255,255,0.7)',
              alignSelf: 'flex-end',
              marginTop: 0.5,
            }}
          >
            {new Date().toLocaleTimeString()}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default TextCard;
