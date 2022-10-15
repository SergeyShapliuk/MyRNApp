import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
} from 'react-native';
import WebView from 'react-native-webview';
import {HEIGHT, WIDTH} from '../../constants/constants';
import {WebViewProps} from '../../types/types';

const WebViewScreen = ({route}: WebViewProps) => {
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonPress,
      );
    };
  }, []);
  const handleBackButtonPress = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  };
  return (
    <WebView
      source={{uri: route.params.url}}
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator
          style={styles.activeIndicator}
          color={'red'}
          size={'large'}
        />
      )}
      ref={webviewRef}
    />
  );
};

const styles = StyleSheet.create({
  activeIndicator: {
    flex: 1,
    marginHorizontal: WIDTH / 2,
    marginVertical: HEIGHT / 2 - 50,
  },
});
export default WebViewScreen;
