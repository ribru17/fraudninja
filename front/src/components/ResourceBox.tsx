import type React from 'react';
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
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

interface ResourceBoxProps {
  category: string;
  content: string;
  links: string[];
  imageUrl: string | ArrayBuffer; // Either a URL or Buffer data as a string
}

const ResourceBox: React.FC<ResourceBoxProps> = ({
  category,
  content,
  links,
  imageUrl,
}) => {
  const displayedContent =
    content.length > 350 ? `${content.slice(0, 350)}...` : content;

  return (
    <Card
      sx={{
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Displaying Image */}
      <CardMedia
        component="img"
        height="200"
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
          variant="h5"
          textAlign="center"
          marginTop={1}
          marginBottom={1}
        >
          {category}
        </Typography>
        <Typography variant="body2">{displayedContent}</Typography>

        {links && (
          <List>
            {links.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <LinkIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                    color="secondary"
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
  );
};

export default ResourceBox;
