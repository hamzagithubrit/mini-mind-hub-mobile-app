// import React, { useState, useEffect, useContext } from 'react';
// import { View, StyleSheet, Alert, Image, FlatList, TouchableOpacity } from 'react-native';
// import { Card, Text } from 'react-native-paper';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../context/UserContext';
// import api from '../api/api';

// const ChatRoom = () => {
//     const { user } = useContext(UserContext);
//     const [users, setUsers] = useState([]);
//     const navigation = useNavigation();

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await api.get('/auth/users');
//                 const filteredUsers = response.data.filter((u) => u._id !== user.id);
//                 setUsers(filteredUsers);
//             } catch (error) {
//                 console.error('Error fetching users:', error.response?.data || error.message);
//                 Alert.alert('Error', error.response?.data?.error || 'Failed to fetch users.');
//             }
//         };
//         fetchUsers();
//     }, [user]);

//     const handleUserPress = (userId, userName) => {
//         navigation.navigate('ChatScreen', { userId, userName });
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Chats</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
//                     <MaterialIcons name="history" size={30} color="blue" />
//                 </TouchableOpacity>
//             </View>
//             <FlatList
//                 data={users}
//                 keyExtractor={(item) => item._id}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity onPress={() => handleUserPress(item._id, item.name)}>
//                         <Card style={styles.userCard}>
//                             <Card.Content style={styles.cardContent}>
//                                 <Image
//                                     source={{ uri: item.avatar.url }}
//                                     style={styles.avatar}
//                                 />
//                                 <View style={styles.textContainer}>
//                                     <Text style={styles.userName}>{item.name}</Text>
//                                     <Text style={styles.lastMessage}>Tap to chat</Text>
//                                 </View>
//                             </Card.Content>
//                         </Card>
//                     </TouchableOpacity>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#E6E6FA', // Light purple background
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingBottom: 15,
//     },
//     headerText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     userCard: {
//         marginBottom: 8,
//         borderRadius: 8,
//         paddingVertical: 8,
//         paddingHorizontal: 12,
//     },
//     cardContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     avatar: {
//         width: 52,
//         height: 52,
//         borderRadius: 26,
//         marginRight: 15,
//     },
//     textContainer: {
//         flex: 1,
//     },
//     userName: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: '#333',
//     },
//     lastMessage: {
//         fontSize: 13,
//         color: '#666',
//         marginTop: 2,
//     },
// });

// export default ChatRoom;


import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert, Image, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import api from '../api/api';
import { } from 'react-native-vector-icons/FontAwesome';

const ChatRoom = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/auth/users');
                const filteredUsers = response.data.filter((u) => u._id !== user.id);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error.response?.data || error.message);
                Alert.alert('Error', error.response?.data?.error || 'Failed to fetch users.');
            }
        };
        fetchUsers();
    }, [user]);

    const handleUserPress = (userId, userName) => {
        navigation.navigate('ChatScreen', { userId, userName });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Chats</Text>
                <TouchableOpacity
                    style={styles.profileIconContainer} // Added a container style for better spacing
                    onPress={() => navigation.navigate('ProfileScreen')}
                >
                    <MaterialIcons name="history" size={30} color="blue" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleUserPress(item._id, item.name)}>
                        <Card style={styles.userCard}>
                            <Card.Content style={styles.cardContent}>
                                <View>
                                    {item.avatar?.url ? (
                                        <Image
                                            source={{ uri: item.avatar.url }}
                                            style={styles.avatar}
                                        />
                                    ) : (
                                        <View style={styles.avatar}>
                                            <MaterialIcons name="person" size={50} color="#eee" />
                                        </View>
                                    )}
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    <Text style={styles.lastMessage}>Tap to chat</Text>
                                </View>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E6E6FA', // Light purple background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 20, // Added paddingTop to create space at the top
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileIconContainer: {
        padding: 10, // Added padding for better click area
    },
    userCard: {
        marginBottom: 8,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 52,
        height: 52,
        backgroundColor: '#d1d5db',
        borderRadius: 26,
        marginRight: 15,
        border: 2,
        borderColor: 'gray',
        borderRadius: 26,
        borderWidth: 1,
    },
    textContainer: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    lastMessage: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
});

export default ChatRoom;
