import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import FullScreenSpinner from './FullScreenSpinner';
import { store as reduxStore, persistor } from '../redux/configureStore';

type Props = {};

export function withStore<P extends Props>(Component: React.ComponentType<P>) {
  const WithStore = ({ ...props }: P) => {
    return (
      <Provider store={reduxStore}>
        <PersistGate loading={<FullScreenSpinner />} persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>
    );
  };
  return WithStore;
}
