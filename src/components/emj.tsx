import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { ImageSourcePropType } from 'react-native';


interface Emoj{
  icon: ImageSourcePropType;
  onPress: () => void;       
}

const Emoji: React.FC<Emoj> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={icon} style={styles.emj} />
    </TouchableOpacity>
  );
};

export default Emoji;

const styles = StyleSheet.create({
  emj: {
    height: 35,
    width: 35,
  },
});
