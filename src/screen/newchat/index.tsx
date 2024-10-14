import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../../assets/icon/index';
import data from '../../data.json';
import Contact from '../../components/contact';
import styles from './styles';

interface NewChat{
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  };
}
interface ContactList{
  id: string;
  name: string;
 
}
const NewChat: React.FC<NewChat> = ({ navigation }) => {
  const [searched, setSearched] = useState<boolean>(false);
  const [searchFil, setSearchFil] = useState<string>('');
  const [filSearch, setFilSearch] = useState<ContactList[]>([]);
  const handleNavigation = (item: ContactList) => {
    navigation.navigate('Message', { data: item });
  };

  const filter = (input: string) => {
    setSearched(input.length > 0);
    setSearchFil(input);

    if (input) {
      const filteredList = data.filter((contact: ContactList) => contact.name.includes(input));
      setFilSearch(filteredList);
    } else {
      setFilSearch([]);
    }
  };


  return (
    <SafeAreaView style={styles.SafeView}>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={icon.arrwBackBlk} style={styles.backarrow} />
        </TouchableOpacity>
        <View style={styles.searchView}>
          <TextInput
            value={searchFil}
            placeholder="Search here..."
            onChangeText={text => filter(text)}
            style={styles.inputText}
          />

          {searched && searchFil.length > 0 && (
            <TouchableOpacity onPress={() => { setSearched(false); filter(''); }}>
              <Image source={icon.cross} style={styles.cross} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {searched ? (
          filSearch.length > 0 ? (
            <View style={styles.FlatListMainContainer}>
              <FlatList
                data={filSearch}
                renderItem={({ item }) => (
                  <Contact 
                    item={item}
                    onPress={() => handleNavigation(item)}
                  />
                )}
                keyExtractor={(item) => item.id} 
              />
            </View>
          ) : (
            <View style={styles.Noresult}>
              <Image source={icon.Noresult} style={styles.noresultimage} />
            </View>
          )
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewChat;

