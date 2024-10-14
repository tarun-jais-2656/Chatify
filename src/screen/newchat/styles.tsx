import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    SafeView: {
      backgroundColor: '#E7EDF3',
      flex: 1,
    },
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginHorizontal: 16,
      marginVertical: 7,
    },
    searchView: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      paddingVertical: Platform.OS === 'ios' ? 15 : 0,
      paddingHorizontal: 13,
      marginLeft: 10,
      width: '85%',
    },
    container2: {
      marginLeft: 10,
      justifyContent: 'space-between',
    },
    backBtn: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 13,
    },
    backarrow: {
      height: 20,
      width: 20,
    },
    inputText: {
      width: '85%',
    },
    FlatListMainContainer: {
      backgroundColor: '#FFFFFF',
      marginHorizontal: 20,
      marginTop: 16,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    Noresult: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noresultimage: {
      height: 200,
      width: 180,
    },
    cross: {
      marginHorizontal: 20,
      marginTop: Platform.OS === 'ios' ? 0 : 15,
      height: 18,
      width: 18,
    },
  });

  export default styles;
  