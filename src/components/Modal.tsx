import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
const width = Dimensions.get('screen').width

const CustomModal = ({showModal,icon,text,setshowDeleteModal,HandleClick,desc}) => {
  return (
    <Modal
    isVisible={showModal}
    animationOutTiming = {500}
    animationOut = 'fadeOut'
    animationIn  = 'fadeIn'
    animationInTiming= {500}
    >
    <View style={styles.Dlt}>
      <View style={styles.container}>
      <Image
            source={icon}
            style={{
              alignSelf: 'center',
              margin: 15,
              width: 60,
              height: 60,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: 10,
            }}>
            {' '}
            {text}
          </Text>

          <Text style={styles.Msg}>{desc}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>

        
          <TouchableOpacity
            onPress={setshowDeleteModal}
            style={[styles.Btn,{backgroundColor:'#F6F7F7'}]}
            >
            <Text>No,Cancle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={HandleClick}
            style={[styles.Btn,{backgroundColor:'#2A7BBB'}]}
            >
            <Text 
            style={styles.BtnTxt}
            >Yes, Delete</Text>
          </TouchableOpacity>
          </View>
        
      </View>
    </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  container:{
    marginHorizontal:20,
    paddingHorizontal:20,
    paddingVertical:15,
    borderRadius:10,
    backgroundColor:'white',
  },
  Dlt: {
    justifyContent:'center',
  },
  modalContainer: {
    marginHorizontal:15,
    paddingVertical:15,
    borderRadius:10,
    marginVertical:10,
    paddingHorizontal:20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  modalContainer2:{
    flex:1,
    paddingTop:30,
    borderTopStartRadius:25,
    borderTopEndRadius:25,
    backgroundColor:'white',

  },
  Msg:{
    fontSize: 15,
    color:'#6A7985',
    textAlign:'center',
    fontWeight: '300',
    alignSelf: 'center',
    marginBottom: 10,
  },
  Btn:{
    fontSize: 15,
    marginVertical: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'grey',
    backgroundColor:'red',
    paddingHorizontal:(width > 400) ? 30 : 20,
    paddingVertical:15,
    borderRadius:10
  },
  BtnTxt:{
    color:'white'
  },
})