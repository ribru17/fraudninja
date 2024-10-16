import { Provider } from "react-redux";
import FullScreenSpinner from "./FullScreenSpinner";
import { store as reduxStore } from "../redux/configureStore";

type Props = {};

// Use a generic type for the withStore function
export function withStore<P extends Props>(Component: React.ComponentType<P>) {
  const WithStore = ({ ...props }: P) => {
    const store = reduxStore;

    if (!store) return <FullScreenSpinner />;

    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
  return WithStore;
}
