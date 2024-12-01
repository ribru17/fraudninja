import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Box,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { Resource } from '@shared_types';

interface ResourceDetailProps {
  resource: Resource | undefined;
}

// Wrapping with React.forwardRef to accept refs
const ResourceDetail = React.forwardRef<HTMLDivElement, ResourceDetailProps>(
  ({ resource }, ref) => {
    if (!resource) {
      return <Typography>You must choose a resource</Typography>;
    }

    const imageUrl = resource.image
      ? `data:image/jpeg;base64,${resource.image}`
      : '';

    return (
      <Box
        ref={ref} // Now the ref is passed to Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%', // Adjust the width for responsiveness
          maxWidth: 600, // Limit max width for better aesthetics
          backgroundColor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Displaying Larger Image */}
          <CardMedia
            component='img'
            image={
              typeof imageUrl === 'string'
                ? imageUrl
                : `data:image/jpeg;base64,${imageUrl}`
            }
            alt={resource.category}
            sx={{
              borderRadius: 1,
              maxHeight: 300,
              objectFit: 'cover',
            }}
          />

          {/* Content */}
          <CardContent>
            <Typography
              variant='h5'
              textAlign='center'
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              {resource.category}
            </Typography>
            <Typography variant='body1' component='p'>
              {resource.content}
            </Typography>

            {resource.links && (
              <List>
                {resource.links.map((link) => (
                  <ListItem key={link} disablePadding>
                    <ListItemIcon>
                      <OpenInNewIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>
                      <Link
                        href={link}
                        target='_blank'
                        rel='noopener'
                        underline='hover'
                        color='secondary'
                      >
                        {link}
                      </Link>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  },
);

export default ResourceDetail;
