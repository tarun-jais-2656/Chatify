import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hey...I'm Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center', flex: 1},
  text: {fontSize: 20},
});
