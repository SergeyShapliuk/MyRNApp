import React from 'react';
import {StyleSheet, View} from 'react-native';
import Main from './android/app/src/Main';

const App = () => {
  return (
    <View style={styles.sectionContainer}>
      <Main />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    // marginTop: 32,
    // paddingHorizontal: 24,
    // alignSelf: "center",
  },
});

export default App;
