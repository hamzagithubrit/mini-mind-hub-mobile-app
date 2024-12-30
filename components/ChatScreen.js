import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image
} from "react-native";
import { Text, Button, Appbar, TextInput } from "react-native-paper";
import { io } from "socket.io-client";
import api from "../api/api";
import { UserContext } from "../context/UserContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ChatScreen = () => {
  const { user } = useContext(UserContext);
  const route = useRoute();
  const { userId, userName } = route.params;
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = io("http://192.168.0.109:4000");

  useEffect(() => { 
    socket.emit("join_room", { senderId: user.id, receiverId: userId });

    const handleReceiveMessage = (message) => {
      if (message.senderId === userId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    const fetchMessages = async () => {
      try {
        const response = await api.get(`/chat/messages/${user.id}/${userId}`);
        setMessages(response.data);
      } catch (error) {
        console.error(
          "Error fetching messages:",
          error.response?.data || error.message
        );
      }
    };

    fetchMessages();

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.disconnect();
    };
  }, [user.id, userId]);

  const handleSendMessage = () => {
    if (!newMessage) return;

    const messageData = {
      senderId: user.id,
      receiverId: userId,
      text: newMessage,
      time: new Date(),
    };

    socket.emit("send_message", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage("");
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = dayjs(message.time).format("YYYY-MM-DD");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const renderDateHeader = (date) => (
    <View style={styles.dateHeader}>
      <Text style={styles.dateText}>{dayjs(date).format("MMMM DD, YYYY")}</Text>
    </View>
  );

  const renderMessage = ({ item }) => {
    const isMyMessage = item.receiverId._id === user.id;
    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.theirMessage : styles.myMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>{dayjs(item.time).format("h:mm a")}</Text>
      </View>
    );
  };

  const renderGroupedMessages = () => {
    const groupedMessages = groupMessagesByDate(messages);
    return Object.keys(groupedMessages).map((date) => (
      <View key={date}>
        {renderDateHeader(date)}
        {groupedMessages[date].map((message) => (
          <View key={message._id || message.time.toString()}>
            {renderMessage({ item: message })}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={5}
    >
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={() => navigation.navigate("ChatRoom")}
          size={20}
          color="white"
        />
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={44} color="#6a1b9a" />
        </View>
        <Appbar.Content
          title={userName || "Chat"}
          titleStyle={styles.titleStyle}
        />
      </Appbar.Header>

      <FlatList
        data={[]}
        ListHeaderComponent={renderGroupedMessages}
        keyExtractor={(item) => item._id?.toString() || item.time.toString()}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          style={styles.input}
          mode="outlined"
          dense
        />
        <Button mode="contained" onPress={handleSendMessage}>
          Send
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
  },
  messageList: {
    padding: 12,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
    borderTopRightRadius: 2,
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 2,
  },
  messageText: {
    fontSize: 15,
    maxWidth: "80%",
    display: "ruby-content",
  },
  timeText: {
    fontSize: 10,
    whiteSpace: "wrap",
    color: "#666666",
    display: "ruby-content",
    paddingLeft: 5,
    marginTop: 2,
  },
  dateHeader: {
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#E6E6FA",
  },
  inputContainer: {
    borderTopColor: "#c4b5fd",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    height: 40,
  },
  header: {
    flexDirection: "row",
    display: "flex",
    backgroundColor: "#6a1b9a",
    marginRight: 230,
    paddingBottom: 10,
  },
  profileImage:{
    width: 46,
    height: 46,
    backgroundColor: "#fbcfe8",
    borderRadius: 23,
    border: 2,
  },
  avatar: {
    width: 46,
    height: 46,
    backgroundColor: "#fbcfe8",
    borderRadius: 20,
    border: 2,
    borderColor: "gray",
    borderRadius: 23,
    borderWidth: 1,
  },
  titleStyle: {
    color: "white", // White color for the title text
    textAlign: "left", // Align title to the left
    fontWeight: "bold", // Optional: make the title bold
    textTransform: "capitalize", // Capitalize the first letter of each word
  },
});

export default ChatScreen;

// import React, { useContext, useEffect, useState } from 'react';
// import { View, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Image } from 'react-native';
// import { Text, Button, Appbar, TextInput } from 'react-native-paper';
// import { io } from 'socket.io-client';
// import api from '../api/api';
// import { UserContext } from '../context/UserContext';
// import { useRoute } from '@react-navigation/native';
// import dayjs from 'dayjs';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const ChatScreen = () => {
//     const { user } = useContext(UserContext);
//     const route = useRoute();
//     const { userId, userName, avatarUrl } = route.params;

//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const socket = io("http://10.135.54.132:4000");

//     useEffect(() => {
//         socket.emit('join_room', {
//             senderId: user.id,
//             receiverId: userId,
//         });

//         const handleReceiveMessage = (message) => {
//             if (message.senderId === userId || message.receiverId === user.id) {
//                 setMessages((prevMessages) => [...prevMessages, message]);
//             }
//         };

//         socket.on('receive_message', handleReceiveMessage);

//         const fetchMessages = async () => {
//             try {
//                 const response = await api.get(`/chat/messages/${user.id}/${userId}`);
//                 setMessages(response.data);
//             } catch (error) {
//                 console.error('Error fetching messages:', error.response?.data || error.message);
//             }
//         };

//         fetchMessages();

//         return () => {
//             socket.off('receive_message', handleReceiveMessage);
//             socket.disconnect();
//         };
//     }, [user.id, userId]);

//     const handleSendMessage = () => {
//         if (!newMessage) return;

//         const messageData = {
//             senderId: user.id,
//             receiverId: userId,
//             text: newMessage,
//             timestamp: new Date(),
//         };

//         socket.emit('send_message', messageData);
//         setMessages((prevMessages) => [...prevMessages, messageData]);
//         setNewMessage('');
//     };

//     const renderMessage = ({ item }) => {
//         const isMyMessage = item.senderId === user.id;
//         const formattedTime = dayjs(item.timestamp).format('h:mm A');
//         return (
//             <View style={[
//                 styles.messageContainer,
//                 isMyMessage ? styles.myMessage : styles.theirMessage,
//             ]}>
//                 <Text style={styles.messageText}>{item.text}</Text>
//                 <Text style={styles.messageTime}>{formattedTime}</Text>
//             </View>
//         );
//     };

//     const renderDateHeader = (date) => (
//         <View style={styles.dateHeader}>
//             <Text style={styles.dateHeaderText}>{dayjs(date).format('MMMM D, YYYY')}</Text>
//         </View>
//     );

//     const groupMessagesByDate = () => {
//         return messages.reduce((acc, message) => {
//             const messageDate = dayjs(message.timestamp).format('YYYY-MM-DD');
//             if (!acc[messageDate]) acc[messageDate] = [];
//             acc[messageDate].push(message);
//             return acc;
//         }, {});
//     };

//     const groupedMessages = groupMessagesByDate();

//     return (
//         <KeyboardAvoidingView
//             style={styles.container}
//             behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//             keyboardVerticalOffset={80}
//         >
//             <Appbar.Header style={styles.header}>
//                 <Appbar.BackAction onPress={() => console.log('Back pressed')} />
//                 {avatarUrl && <Image source={{ uri: avatarUrl }} style={styles.avatar} />}
//                 <View style={styles.avatar}>
//                     <MaterialIcons name="person" size={44} color="#6a1b9a" />
//                 </View>
//                 <Appbar.Content
//                     title={userName || 'Chat'}
//                     titleStyle={styles.titleStyle} // Apply the titleStyle to the content title
//                 />
//             </Appbar.Header>

//             <FlatList
//                 data={Object.keys(groupedMessages)}
//                 keyExtractor={(date) => date}
//                 renderItem={({ item: date }) => (
//                     <>
//                         {renderDateHeader(date)}
//                         {groupedMessages[date].map((message) => (
//                             <View key={message._id || message.timestamp} style={styles.messageList}>
//                                 {renderMessage({ item: message })}
//                             </View>
//                         ))}
//                     </>
//                 )}
//                 contentContainerStyle={styles.messageListContainer}
//             />

//             <View style={styles.inputContainer}>
//                 <TextInput
//                     value={newMessage}
//                     onChangeText={setNewMessage}
//                     placeholder="Type a message..."
//                     style={styles.input}
//                     mode="outlined"
//                     dense
//                 />
//                 <Button mode="contained" onPress={handleSendMessage} style={styles.sendButton}>
//                     Send
//                 </Button>
//             </View>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f3e5f5', // Light lavender background
//     },
//     header: {
//         flexDirection: 'row',
//         display: 'flex',
//         backgroundColor: '#6a1b9a',
//         marginRight: 230,
//         paddingBottom:10
//     },
//     avatar: {
//         width: 46,
//         height: 46,
//         backgroundColor: '#fbcfe8',
//         borderRadius: 20,
//         border: 2,
//         borderColor: 'gray',
//         borderRadius: 23,
//         borderWidth: 1,
//     },
//     titleStyle: {
//         color: 'white', // White color for the title text
//         textAlign: 'left', // Align title to the left
//         fontWeight: 'bold', // Optional: make the title bold
//         textTransform: 'capitalize', // Capitalize the first letter of each word
//     },
//     messageListContainer: {
//         paddingHorizontal: 10,
//     },
//     messageList: {
//         padding: 5,
//     },
//     messageContainer: {
//         maxWidth: '75%',
//         padding: 10,
//         borderRadius: 15,
//         marginVertical: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.3,
//         shadowRadius: 1,
//         elevation: 2,
//     },
//     myMessage: {
//         alignSelf: 'flex-end',
//         backgroundColor: '#d1c4e9', // Light purple
//         borderTopRightRadius: 0,
//     },
//     theirMessage: {
//         alignSelf: 'flex-start',
//         backgroundColor: '#e0e0e0',
//         borderTopLeftRadius: 0,
//     },
//     messageText: {
//         fontSize: 16,
//         color: '#333',
//     },
//     messageTime: {
//         fontSize: 12,
//         color: '#666',
//         marginTop: 5,
//         alignSelf: 'flex-end',
//     },
//     dateHeader: {
//         paddingVertical: 10,
//         alignItems: 'center',
//         backgroundColor: '#ede7f6',
//     },
//     dateHeaderText: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: '#6a1b9a',
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//         borderTopWidth: 1,
//         borderColor: '#ddd',
//     },
//     input: {
//         flex: 1,
//         marginRight: 10,
//         backgroundColor: '#fff',
//         borderRadius: 25,
//     },
//     sendButton: {
//         backgroundColor: '#6a1b9a',
//         borderRadius: 25,
//         paddingHorizontal: 15,
//     },
// });

// export default ChatScreen;
