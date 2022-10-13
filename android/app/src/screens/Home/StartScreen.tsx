import {useEffect} from 'react';
import {useAppNavigation} from '../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {fetchUrl} from '../../api/api';

const StartScreen = () => {
  const navigation = useAppNavigation();

  useEffect(() => {
    fetchUrl().then(response =>
      getLocalStorage().then(() => {
        start('', response);
      }),
    );
  });

  const start = (localValue: string | null | undefined, url: string) => {
    console.log('local', localValue);
    if (!localValue) {
      loadFire(url);
    } else {
      return navigation.navigate('WebView', {url: localValue});
    }
  };
  const localStorage = async (value: string) => {
    await AsyncStorage.setItem('url', value);
  };
  const getLocalStorage = async () => {
    const jsonValue = await AsyncStorage.getItem('url');
    return jsonValue !== null ? jsonValue : null;
  };
  const loadFire = (url: string | null) => {
    const getUrl = url;
    console.log('url', url);
    const brandDevice = DeviceInfo.getBrand();
    const simDevice = DeviceInfo.getCarrierSync();
    if (!getUrl || brandDevice === 'google' || !simDevice) {
      console.log('empty');
      navigation.navigate('Home');
    } else {
      console.log('webview');
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
