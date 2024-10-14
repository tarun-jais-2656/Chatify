import { StyleSheet, Text, TouchableOpacity, View, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import family from '../assets/fonts';


interface RBContentProps {
  txt: string;        
  stl?: object;        
  icon: ImageSourcePropType; 
  dltTxt?: boolean;  
  onPress?: () => void;       
}

const RBContent: React.FC<RBContentProps> = ({ stl, dltTxt,icon, txt, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Image source={icon} style={stl ? stl : styles.img} />
      </View>
      <Text style={[styles.txt, { color: dltTxt ? 'red' : 'black' }]}>
        {txt}
      </Text>
    </TouchableOpacity>
  );
};

export default RBContent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 23,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: family.medium,
  },
  img: {
    height: 24,
    width: 24,
    marginLeft: 2,
  },
});
