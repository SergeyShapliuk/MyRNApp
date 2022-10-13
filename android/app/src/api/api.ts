import remoteConfig from '@react-native-firebase/remote-config';

export const fetchUrl = async () => {
  await remoteConfig().setConfigSettings({
    minimumFetchIntervalMillis: 300,
    fetchTimeMillis: 100,
  });
  await remoteConfig().setDefaults({
    url: '',
  });
  await remoteConfig().fetchAndActivate();
  const url = await remoteConfig().getValue('url').asString();
  console.log('api', url);
  return url;
};
