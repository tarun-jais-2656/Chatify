import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import fontFamily from '../assets/fonts';
const width = Dimensions.get('screen').width;

const Contact = ({onPress, item}) => {
  return (
    <TouchableOpacity style={styles.MainContainer} onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.profileImg, {backgroundColor: item.color}]}>
          <Text style={styles.txt}>{item.profileImg}</Text>
        </View>
        <View>
          <Text style={styles.txt1}>{item.name}</Text>
          <Text style={styles.txt2}>You: i don't remember anything</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Contact;

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBlockColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileImg: {
    borderRadius: 100,
    padding: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Platform.OS === 'ios'? width > 400 ? '80%' : '95%': '85%',
  },

  txt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: fontFamily.Bold,
  },
  txt1: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fontFamily.Bold,
  },
  txt2: {
    fontSize: 13,
    fontWeight: '400',
    color: '#85929C',
    fontFamily:Platform.OS === 'ios'? fontFamily.thin: fontFamily.medium,
  },
});
