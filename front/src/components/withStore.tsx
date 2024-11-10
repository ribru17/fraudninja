import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { persistor, store as reduxStore } from '../redux/configureStore';
import FullScreenSpinner from './FullScreenSpinner';

type Props = { [k: string]: never };

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
