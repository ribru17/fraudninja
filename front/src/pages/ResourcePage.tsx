import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { Grid2 } from '@mui/material';
import ResourceBox from '../components/ResourceBox';
import ContainerPage from '../components/ContainerPage';
import type { Resource } from '@shared_types';
import ApiSdk from '../api/apiSdk';
import { useAppSelector } from '../redux/hook';
import FullScreenSpinner from '../components/FullScreenSpinner';

const ResourcePage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>();
  const hasFetched = useRef(false);
  const api = new ApiSdk();
  const { token } = useAppSelector((state) => state.session);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      api.getAllResources(token).then((resources) => {
        setResources(resources);
        console.log(resources);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!resources) return <FullScreenSpinner />;
  return (
    <ContainerPage title='Scam Resources'>
      <Grid2 container spacing={2}>
        {resources.map((resource) => (
          <Grid2 size={6} columns={2} flexDirection='row' key={resource._id}>
            <ResourceBox
              category={resource.category}
              content={resource.content}
              links={resource.links}
              imageUrl={
                resource.image ? `data:image/jpeg;base64,${resource.image}` : ''
              }
            />
          </Grid2>
        ))}
      </Grid2>
    </ContainerPage>
  );
};

export default ResourcePage;
