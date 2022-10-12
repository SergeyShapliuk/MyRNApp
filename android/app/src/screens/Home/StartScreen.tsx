import {useEffect} from 'react';
import {useAppNavigation} from '../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const StartScreen = () => {
  const navigation = useAppNavigation();

  useEffect(() => {
    // remoteConfig()
    //   .setDefaults({
    //     url: '',
    //   })
    //   .then(() => remoteConfig().fetchAndActivate());
    // remoteConfig().setConfigSettings({
    //   minimumFetchIntervalMillis: 30000,
    // });
    getLocalStorage().then(() => start(''));
  });

  const start = (value: string | null | undefined) => {
    if (!value) {
      loadFire();
    } else {
      return navigation.navigate('WebView', {url: value});
    }
  };
  const localStorage = async (value: string) => {
    await AsyncStorage.setItem('url', value);
  };
  const getLocalStorage = async () => {
    const jsonValue = await AsyncStorage.getItem('url');
    return jsonValue !== null ? jsonValue : null;
  };
  const loadFire = () => {
    const getUrl = '';
    const brandDevice = DeviceInfo.getBrand();
    const simDevice = DeviceInfo.getCarrierSync();
    console.log('getUrl', getUrl);
    console.log('brandDevice', brandDevice);
    console.log('simDevice', simDevice);
    if (getUrl === '' || brandDevice === 'google' || !simDevice) {
      console.log('home');
      navigation.navigate('Home');
    } else {
      localStorage(getUrl);
      navigation.navigate('WebView', {url: getUrl});
    }
  };

  return null;
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
export default StartScreen;
