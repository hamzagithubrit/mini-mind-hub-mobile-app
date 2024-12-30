
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Platform, Alert, Image } from 'react-native';
import { Text, Card, Button, Divider, ActivityIndicator, Avatar } from 'react-native-paper';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage) {
  Alert.alert('Error', errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId = "6864edfa-90a5-47e1-8eb3-fc4af71ec583";
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export default function NotificationScreen() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState([]);
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token || ''))
      .catch(error => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotifications(prevNotifications => [
        ...prevNotifications,
        {
          title: notification.request.content.title || 'No Title',
          body: notification.request.content.body || 'No Body',
        },
      ]);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to the Kids Notification Center!</Text>

      {/* Add the banner image from local assets */}
      <Image
        source={require('../assets/notification.jpg')} // Replace with the correct path to your image
        style={styles.bannerImage}
      />

      <Card style={styles.card}>
        <Card.Title
          title="Your Expo Push Token"
          subtitle="Share this with the server to receive notifications!"
          left={(props) => <Avatar.Icon {...props} icon="bell" style={styles.icon} />}
        />
        <Card.Content>
          {expoPushToken ? (
            <Text style={styles.token}>{expoPushToken}</Text>
          ) : (
            <ActivityIndicator animating={true} size="small" />
          )}
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      <Card style={styles.card}>
        <Card.Title
          title="Your Notifications"
          subtitle="See all your notifications here"
          left={(props) => <Avatar.Icon {...props} icon="email" style={styles.icon} />}
        />
        <Card.Content>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <View key={index} style={styles.notificationItem}>
                <Text style={styles.label}>Title:</Text>
                <Text style={styles.value}>{notification.title}</Text>

                <Text style={styles.label}>Body:</Text>
                <Text style={styles.value}>{notification.body}</Text>

                <Divider style={styles.innerDivider} />
              </View>
            ))
          ) : (
            <Text style={styles.noNotifications}>No notifications received yet. Check back soon!</Text>
          )}
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => setNotifications([])}
            buttonColor="#FFC0CB"
            labelStyle={styles.buttonLabel}
          >
            Clear Notifications
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#E6E6FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'center',
    marginBottom: 14,
    marginTop: 40,
  },
  bannerImage: {
    width: '100%',
    height: 200, // Adjust the height to your preference
    marginBottom: 20,
    borderRadius: 8,
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 4,
    padding: 8,
  },
  icon: {
    backgroundColor: '#FFD700',
  },
  label: {
    fontWeight: 'bold',
    color: '#4B0082',
    marginTop: 8,
  },
  token: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  value: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationItem: {
    marginBottom: 16,
  },
  innerDivider: {
    marginVertical: 8,
    backgroundColor: '#D8BFD8',
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#DDA0DD',
  },
  noNotifications: {
    textAlign: 'center',
    color: '#4B0082',
    marginTop: 16,
  },
  buttonLabel: {
    color: '#4B0082',
    fontWeight: 'bold',
  },
});
