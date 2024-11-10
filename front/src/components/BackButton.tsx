import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box display='flex' alignItems='center'>
      <Button
        variant='text'
        color='primary'
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
        sx={{
          textTransform: 'none',
          fontSize: '1rem',
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default BackButton;
