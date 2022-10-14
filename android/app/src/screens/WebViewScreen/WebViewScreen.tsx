import React, { useEffect, useRef, useState } from "react";
import {ActivityIndicator, BackHandler, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {GAP, PADDING, WIDTH} from '../../constants/constants';
import {WebViewProps} from '../../types/types';

const WebViewScreen = ({route}: WebViewProps) => {
  // const navigation = useAppNavigation();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const webviewRef = useRef(null);
  console.log('web', canGoBack);
  console.log('web', canGoForward);
  console.log('web', currentUrl);
  console.log('web', route.name);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('web', canGoBack);
      console.log('web', canGoForward);
      console.log('web', currentUrl);
      if (currentUrl !== route.params.url) {
        return canGoForward;
      } else {
        return canGoBack;
      }
    });
  }, [canGoBack, canGoForward, currentUrl]);
  BackHandler.addEventListener('hardwareBackPress', () => {
    return route.params.url === currentUrl ? true : false;
  });

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: route.params.url}}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator color={'black'} size={'large'} />
        )}
        ref={webviewRef}
        onNavigationStateChange={navState => {
          setCanGoBack(navState.canGoBack);
          setCanGoForward(navState.canGoForward);
          setCurrentUrl(navState.url);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  item: {
    width: WIDTH - PADDING - GAP,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  title: {
    color: 'blue',
    fontSize: 14,
    fontWeight: '700',
  },
  text: {
    width: WIDTH / 2,
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
});
export default WebViewScreen;
