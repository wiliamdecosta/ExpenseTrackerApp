import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

//React Redux
import {store} from './redux/store';
import {Provider} from 'react-redux';
import AppNavigation from './navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    'poppins' : require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold' : require('./assets/fonts/Poppins-Bold.ttf'),
    'poppins-italic' : require('./assets/fonts/Poppins-Italic.ttf'),
    'poppins-semi-bold' : require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if(!fontsLoaded) {
    return <AppLoading/>;
  }

  return (
    <>
      <StatusBar style='light'/>
      <Provider store={store}>
        <AppNavigation /> 
      </Provider>
    </>
  );
}