import {useEffect} from 'react';
import {useAppNavigation} from '../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUrl} from '../../api/api';
import DeviceInfo from 'react-native-device-info';
import OneSignal from 'react-native-onesignal';

const StartScreen = () => {
  const navigation = useAppNavigation();

  useEffect(() => {
    fetchUrl().then(response =>
      getLocalStorage().then(localStorage => {
        start(localStorage, response);
      }),
    );
  }, []);

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
  const loadFire = async (url: string | null) => {
    await OneSignal.setLogLevel(6, 0);
    await OneSignal.setAppId('f3fea758-bcfc-4fc8-b971-c5a16cb69d9f');
    await OneSignal.setNotificationOpenedHandler;
    const brandDevice = DeviceInfo.getBrand();
    const simDevice = DeviceInfo.getCarrierSync();
    const emulator = await DeviceInfo.isEmulator();
    console.log('url', url);
    console.log('brandDevice', brandDevice);
    console.log('simDevice', simDevice);
    console.log('emulator', emulator);
    if (!url || brandDevice === 'google' || !simDevice || emulator) {
      console.log('empty');
      navigation.navigate('Home');
    } else {
      console.log('webview');
      await localStorage(url);
      navigation.navigate('WebView', {url: url});
    }
  };
  return null;
};

export default StartScreen;
