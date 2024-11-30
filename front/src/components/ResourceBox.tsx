import type React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface ResourceBoxProps {
  category: string;
  content: string;
  imageUrl: string | ArrayBuffer; // Either a URL or Buffer data as a string
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const ResourceBox: React.FC<ResourceBoxProps> = ({
  category,
  content,
  imageUrl,
  onClick,
}) => {
  const displayedContent =
    content.length > 280 ? `${content.slice(0, 280)}...` : content;

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer', // Makes the card look clickable
        '&:hover': {
          transform: 'scale(1.02)', // Optional hover effect for feedback
          transition: 'transform 0.2s ease-in-out',
        },
      }}
    >
      <Card
        sx={{
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        {/* Displaying Image */}
        <CardMedia
          component='img'
          height='200'
          image={
            typeof imageUrl === 'string'
              ? imageUrl
              : `data:image/jpeg;base64,${imageUrl}`
          }
          alt={category}
        />

        {/* Content */}
        <CardContent
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography
            variant='h5'
            textAlign='center'
            marginTop={1}
            marginBottom={1}
          >
            {category}
          </Typography>
          <Typography variant='body2'>{displayedContent}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResourceBox;
