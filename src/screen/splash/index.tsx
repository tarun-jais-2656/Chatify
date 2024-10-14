import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import family from '../../assets/fonts';
import icon from '../../assets/icon/index';

const width = Dimensions.get('screen').width;
export function Splash({navigation}) {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('BottomNavigation', 'Menu');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
        <Image
          source={icon.Splashimage}
          style={styles.image}
        />
        <Text
          style={styles.text}>
          Let's Chat
        </Text>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    height: 150, 
    width: 150,
    marginBottom: 20,
  },
  text:{
    fontSize: 24,
    fontFamily: family.Bold
  },

  Quivio: {
    padding: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
