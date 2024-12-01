import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { Grid2, Modal } from '@mui/material';
import ResourceBox from '../components/ResourceBox';
import ContainerPage from '../components/ContainerPage';
import type { Resource } from '@shared_types';
import ApiSdk from '../api/apiSdk';
import { useAppSelector } from '../redux/hook';
import FullScreenSpinner from '../components/FullScreenSpinner';
import ResourceDetail from '../components/ResourceDetail';

const ResourcePage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>();
  const hasFetched = useRef(false);
  const api = new ApiSdk();
  const { token } = useAppSelector((state) => state.session);
  const [openHelpModal, setOpenHelpModal] = useState<boolean>(false);
  const [resourceSelected, setResourceSelected] = useState<Resource>();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      api.getAllResources(token).then((resources) => {
        setResources(resources);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const openModalResource = (resource: Resource) => {
    setResourceSelected(resource);
    setOpenHelpModal(true);
  };

  if (!resources) return <FullScreenSpinner />;
  return (
    <ContainerPage title='Scam Resources'>
      <Grid2 container spacing={2}>
        {resources.map((resource) => (
          <Grid2 size={6} columns={2} flexDirection='row' key={resource._id}>
            <ResourceBox
              category={resource.category}
              content={resource.content}
              imageUrl={
                resource.image ? `data:image/jpeg;base64,${resource.image}` : ''
              }
              onClick={() => openModalResource(resource)}
            />
            <Modal
              open={openHelpModal}
              onClose={() => setOpenHelpModal(false)}
              slotProps={{
                backdrop: {
                  sx: {
                    backgroundColor: 'rgba(256, 256, 256, 0.3)', // Semi-transparent black
                  },
                },
              }}
            >
              <ResourceDetail resource={resourceSelected} />
            </Modal>
          </Grid2>
        ))}
      </Grid2>
    </ContainerPage>
  );
};

export default ResourcePage;
