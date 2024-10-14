import React, { useState, useCallback, useEffect, useRef } from 'react';
import {Dimensions,Image,Platform,SafeAreaView,Text,TouchableOpacity,View,} from 'react-native';
import styles from './Styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Bubble, GiftedChat, InputToolbar, IMessage } from 'react-native-gifted-chat';
import icon from '../../assets/icon/index';
import fontFamily from '../../assets/fonts';
import RBContent from '../../components/rbContent';
import Modal from 'react-native-modal';
import CustomModal from '../../components/Modal';
import Emoji from '../../components/emj';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width;

interface User {
  id: string;
  name: string;
  profileImg: string;
  color: string;
}

interface Message{
  route: {
    params: {
      data: User;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
}

const Message: React.FC<Message> = ({ route, navigation }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<string>('');
  const [showDltModal, setShowDltModal] = useState<boolean>(false);
  const [msgId, setMsgId] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState<boolean>(false);
  const user = route.params.data;
  const { color, profileImg, name, id } = user;
  const chatId = user.id;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const refRB = useRef<RBSheet>(null);

  const loadMsgs = async () => {
    const storedMsgs = await AsyncStorage.getItem(`messages_${chatId}`);
    if (storedMsgs) {
      setMessages(JSON.parse(storedMsgs));
    } else {
      setMessages([
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ]);
    }
  };

  useEffect(() => {
    loadMsgs();
  }, [chatId, toggle]);

  const onSend = async (newMsgs: IMessage[] = []) => {
    setMessages(previousMessages => {
      const updatedMsgs = GiftedChat.append(previousMessages, newMsgs);
      AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMsgs));
      storeChatList(user);
      return updatedMsgs;
    });
  };
  
  const handlePress = async (id: string) => {
    setShowDltModal(false);
    const storedMsg = await AsyncStorage.getItem(`messages_${chatId}`);
    const msgArray: IMessage[] = JSON.parse(storedMsg || '[]');

    if (Array.isArray(msgArray)) {
      const updatedMessagesArray = msgArray.filter(message => message._id !== id);
      await AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessagesArray));
      setToggle(!toggle);
    }
  };

  const handleModal = (message: IMessage) => {
    if (message) {
      setShowModal(true);
      setShowMsg(message.text);
      setMsgId(message._id);
    }
  };

  const handleDltModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setShowDltModal(true);
    }, 500);
  };
  const handleDltChatModal = () => {
    refRB.current?.close();
    setTimeout(() => {
      setShowDeleteChatModal(true);
    }, 700);
  };
  
  const storeChatList = async (user: User) => {
    const storedChatList = await AsyncStorage.getItem('chatUsers');
    const chatList: User[] = storedChatList ? JSON.parse(storedChatList) : [];

    const userExists = chatList.find(u => u.id === user.id);
    if (!userExists) {
      chatList.push({
        id: user.id,
        name: user.name,
        profileImg: user.profileImg,
        color: user.color,
      });
      await AsyncStorage.setItem('chatUsers', JSON.stringify(chatList));
    }
  };
  const Actions =() => {
    return (
      <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 10 }}>
        <Image source={icon.plusmessage} style={styles.plusmessage} />
      </TouchableOpacity>
    );
  };


  const handleAllChat = async () => {
    setShowDltModal(false);
    const storedChatList = await AsyncStorage.getItem('chatUsers');
    const chatArray: User[] = JSON.parse(storedChatList || '[]');

    if (Array.isArray(chatArray)) {
      const updatedChatArray = chatArray.filter(chatUser => chatUser.id !== user.id);
      await AsyncStorage.setItem('chatUsers', JSON.stringify(updatedChatArray));
    }

    await AsyncStorage.setItem(
      `messages_${chatId}`,
      JSON.stringify([
        {
          _id: 1,
          text: 'Hello',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    );

    navigation.navigate('BottomNavigation', 'Menu');
  };

  const Message = (props: { currentMessage: IMessage }) => {
    const { currentMessage } = props;
    const isUserMessage = currentMessage.user._id === 1;
    const messageTime = new Date(currentMessage.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return (
      <>
        <TouchableOpacity
          onLongPress={() => handleModal(currentMessage)}
          style={{
            alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
            backgroundColor: isUserMessage ? '#0084ff' : '#f0f0f0',
            borderRadius: 10,
            maxWidth: '80%',
            marginHorizontal: 15,
            marginBottom: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            position: 'relative',
          }}
        >
          <Text
            style={{
              color: isUserMessage ? 'white' : 'black',
              fontSize: 16,
              fontFamily:fontFamily.medium,
            }}
          >
            {currentMessage.text}
          </Text>
          {currentMessage.avatar && (
            <View
              style={{
                top: -12,
                position: 'absolute',
                left: isUserMessage ? -12 : 50,
                padding: 5,
                backgroundColor: 'white',
                borderRadius: 10,
              }}
            >
              <Text style={{ color: isUserMessage ? 'white' : 'black' }}>
                {currentMessage.avatar}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            fontSize: 10,
            color: 'black',
            textAlign: isUserMessage ? 'right' : 'left',
          }}
        >
          {messageTime}
        </Text>
      </>
    );
  };

  const handleEmojiPress = (emoji: string) => {
    if (msgId) {
      setMessages(previousMessages => {
        return previousMessages.map(msg => {
          if (msg._id === msgId) {
            return {
              ...msg,
              text: `${msg.text}`,
              avatar: `${emoji}`,
            };
          }
          return msg;
        });
      });
    }
    setShowModal(false);
  };

  const renderSend = (props: any) => {
    return (
      <TouchableOpacity
        style={{ alignSelf: 'center', paddingHorizontal: 10 }}
        onPress={() => {
          const messageText = props?.text;
          if (messageText && messageText.trim()) {
            onSend();
            props?.onSend([
              {
                _id: Math.random(),
                text: messageText,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },
            ]);
          }
        }}
      >
        <Image source={icon.sendicon} style={styles.sendicon} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={icon.arrwBackBlk} style={styles.backArrow} />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <View style={[styles.profileImg, { backgroundColor: color }]}>
                <Text style={styles.profileText}>{profileImg}</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userStatus}>Clocked in</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => refRB.current?.open()}
          >
            <Image source={icon.dot} style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{ _id: 1 }}
          placeholder="Message..."
          textInputStyle={{
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 10,
            fontFamily: fontFamily.medium,
          }}
          renderInputToolbar={props => (
            <InputToolbar
              containerStyle={{
                backgroundColor: '#F8F9F9',
                paddingBottom: Platform.OS === 'ios' ? (width > 400 ? 50 : 20) : 30,
                paddingTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              {...props}
            />
          )}
          renderBubble={props => (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  fontFamily: fontFamily.medium,
                  
                },
                left: {
                  fontFamily: fontFamily.medium,
                },
              }}
              wrapperStyle={{
                left: {},
              }}
            />
          )}
          renderMessage={Message}
          renderActions={Actions}
          renderSend={renderSend}
        />
      </View>
      <RBSheet
        ref={refRB}
        height={
          width > 400
            ? Dimensions.get('window').height / 3
            : Dimensions.get('window').height / 2.3
        }
        useNativeDriver={false}
        dragOnContent={true}
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
        }}
      >
        <View style={styles.RBContainer}>
          <RBContent
            icon={icon.eye}
            txt="View details"
            stl={{
              height: 18,
              width: 24,
            }}
          />
          <RBContent
            icon={icon.pin}
            txt="Pin Chart"
            stl={{ height: 23, width: 16, marginLeft: 4 }}
          />
          <RBContent
            icon={icon.search}
            txt="Search Chat"
            stl={{
              height: 22,
              width: 21,
              marginLeft: 2,
            }}
          />
          <RBContent
            icon={icon.deleteimage}
            onPress={handleDltChatModal}
            txt="Delete"
            dltTxt={true}
            stl={{
              height: 22,
              width: 21,
              marginLeft: 4,
            }}
          />
        </View>
      </RBSheet>

      <Modal
        isVisible={showModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: 'transparent',
        }}
        onBackdropPress={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={{ fontFamily: fontFamily.medium }}>{showMsg}</Text>
          </View>
          <View style={styles.modalContainer2}>
            <View>
              <View style={styles.emojiContainer}>
                <Emoji icon={icon.e1} onPress={() => handleEmojiPress('👍')}/>
                <Emoji icon={icon.e2} onPress={() => handleEmojiPress('♥️')}/>
                <Emoji icon={icon.e3} onPress={() => handleEmojiPress('😂')}/>
                <Emoji icon={icon.e4} onPress={() => handleEmojiPress('🎉')}/>
                <Emoji icon={icon.e5} onPress={() => handleEmojiPress('👎')}/>
              </View>
              <View style={styles.optioncontainer}>
                <RBContent icon={icon.reply} txt="Reply" />
                <RBContent icon={icon.forward} txt="Forward" />
                <RBContent icon={icon.copy} txt="Copy" />
                <RBContent icon={icon.stars} txt="Star" />
                <RBContent icon={icon.report} txt="Report" />
                <RBContent
                  icon={icon.deleteimage}
                  txt="Delete"
                  dltTxt={true}
                  onPress={handleDltModal}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <CustomModal
        showModal={showDltModal}
        icon={icon.deletemodal}
        desc="Are you sure you want to delete this message?"
        text="Delete message?"
        setshowDeleteModal={() => setShowDltModal(false)}
        HandleClick={() => handlePress(msgId)}
      />

      <CustomModal
        showModal={showDeleteChatModal}
        icon={icon.deletemodal}
        desc="Are you sure you want to delete whole chat?"
        text="Delete message?"
        setshowDeleteModal={() => setShowDeleteChatModal(false)}
        HandleClick={handleAllChat}
      />
    </>
  );
};

export default Message;
