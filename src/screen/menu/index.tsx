import {TextInput,TouchableOpacity,View,Dimensions,Image,Pressable,Text,FlatList,} from 'react-native';
import React, {useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './Styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import icon from '../../assets/icon/index';
import Contact from '../../components/contact';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Menu {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}
interface User {
  name: string;
}

const Menu: React.FC<Menu> = ({ navigation }) => {
  const [searched, setSearched] = useState<boolean>(false);
  const [searchfil, setSearchFil] = useState<string>('');
  const [chatList, setChatList] = useState<User[]>([]);
  const [filsearch, setFilSearch] = useState<User[]>([]);

  
  useEffect(() => {
    loadChatList();
  }, [chatList]);
  
  const filter = (input: string) => {
    if (input.length > 0) {
      setSearched(true);
    } else {
      setSearched(false);
    }
    setSearchFil(input);
    if (input) {
      const filteredChatList = chatList.filter(contact =>
        contact.name.toLowerCase().includes(input.toLowerCase()),
      );
      setFilSearch(filteredChatList);
    } else {
      setFilSearch([]);
    }
  };
  const handlenav = (item: User) => {
    navigation.navigate('Message', { data: item });
  };
  
  const loadChatList = async () => {
    const storedchat = await AsyncStorage.getItem('chatUsers');
    if (storedchat) {
      const chat: User[] = JSON.parse(storedchat);
      setChatList(chat);
    } else {
      setChatList([]);
    }
  };
  const refRB = useRef<RBSheet>(null);

  

  return (
    <>
      <SafeAreaView style={styles.safeview}>
        <View style={styles.mainContainer}>
          <View style={styles.subContainer}>
            <View style={styles.subContainer2}>
              <Text style={styles.txt1}>Messages</Text>
              <Text style={styles.txt2}>45 Contacts</Text>
            </View>
          </View>
          <View style={styles.bellView}>
            <Image source={icon.bell} style={styles.bell} />
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.mainContainer2}>
        <View style={styles.subCont}>
          <Image source={icon.search} style={styles.search} />
          <TextInput
            value={searchfil}
            onChangeText={filter}
            style={styles.inputcontainer}
            placeholder="Search messages..."
          />
        </View>

        {chatList.length > 0 ? (
          searched ? (
            filsearch.length > 0 ? (
              <View style={styles.FlatListMainContainer}>
                <FlatList
                  data={filsearch}
                  bounces={false}
                  renderItem={({ item }) => (
                    <Contact item={item} onPress={() => handlenav(item)} />
                  )}
                  keyExtractor={(item, index) => index.toString()} 
                />
              </View>
            ) : (
              <View style={styles.Noresult}>
                <Image source={icon.Noresult} style={styles.noresultimage} />
              </View>
            )
          ) : (
            <View style={styles.FlatListMainContainer}>
              <FlatList
                data={chatList}
                renderItem={({ item }) => (
                  <Contact item={item} onPress={() => handlenav(item)} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )
        ) : (
          <View style={styles.nochatView}>
            <View>
              <Image source={icon.nochat} style={styles.nochat} />
              <Pressable
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#2A7BBB' : '#2A7BBB' },
                  styles.pressable,
                ]}
                onPress={() => refRB.current?.open()}>
                <Text style={styles.txt3}>Start Chat</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      {chatList.length > 0 && (
        <TouchableOpacity onPress={() => navigation.navigate('NewChat')}>
          <Image source={icon.add} style={styles.addchat} />
        </TouchableOpacity>
      )}
      <RBSheet
        height={Dimensions.get('window').height / 5}
        ref={refRB}
        dragOnContent={true}
        useNativeDriver={false}
        style={{ overflow: 'hidden' }}
        customStyles={{
          container: {
            borderTopEndRadius: 30,
            borderTopLeftRadius: 30,
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.RBContainer}>
          <TouchableOpacity
            style={styles.RBContainer2}
            onPress={() => {
              navigation.navigate('NewChat');
              refRB.current?.close();
            }}>
            <Image source={icon.plus} style={styles.plus} />
            <Text style={styles.RBtext}>New Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.RBContainer2}
            >
            <Image source={icon.addAll} style={styles.plus} />
            <Text style={styles.RBtext}>New Group Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.RBContainer2}
            >
            <Image source={icon.announce} style={styles.plus} />
            <Text style={styles.RBtext}>New Announcement</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
  );
};

export default Menu;
