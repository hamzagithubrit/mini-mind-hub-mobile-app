// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator} from "@react-navigation/stack"
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
// import LoginScreen from '../components/LoginScreen';
// import RegisterScreen from '../components/RegisterScreen';
// import ChatScreen from '../components/ChatScreen';
// import ChatRoom from '../components/ChatRoom';
// import ProfileScreen from '../components/ProfileScreen';
// import HomeScreen from '../components/HomeScreen';
// import AccountScreen from '../components/AccountScreen';
// // import LogoutScreen from '../components/LogoutScreen';
// import DeafChildrenScreen from '../components/DeafChildren';
// import VirtualTourScreen from '../components/VirtualTourScreen';
// import TextToStoryScreen from '../components/TextToStoryScreen';
// import WelcomeScreen from '../components/Welcome';
// import Sign from '../components/Sign';
// import OTPScreen from '../components/OTPScreen';
// import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
// import ConfirmPasswordScreen from '../components/ConfirmPasswordScreen';
// import NotificationScreen from '../components/NotifcationScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Bottom Tab Navigator
// function BottomTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === 'HomeTab') {
//             iconName = 'home-outline';
//           } else if (route.name === 'Account') {
//             iconName = 'person-outline';
//           } 
          
//           // else if (route.name === 'Logout') {
//           //   iconName = 'log-out-outline';
//           // }
          
//           return <Icon name={iconName} size={size} color={color} />;
//         },
//         tabBarStyle: {
//           backgroundColor: '#E6E6FA', // Light purple background
//         },
//       })}
//     >
//       <Tab.Screen name="HomeTab" component={HomeScreen} options={{ headerShown: false }} />
//       <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }}/>
//       {/* <Tab.Screen name="Logout" component={LogoutScreen} /> */}
//     </Tab.Navigator>
//   );
// }

// // Stack Navigator
// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Welcome">
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
//         <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}  />
//         <Stack.Screen name="ChatRoom" component={ChatRoom}  />
//         <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="HomeTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
//         <Stack.Screen name="DeafChildren" component={DeafChildrenScreen}  options={{ headerShown: false }}/>
//         <Stack.Screen name="VirtualTour" component={VirtualTourScreen}  options={{ headerShown: false }}/>
//         <Stack.Screen name="TextToStory" component={TextToStoryScreen}  options={{ headerShown: false }} /> 
//         <Stack.Screen name="Welcome" component={WelcomeScreen}  options={{ headerShown: false }} /> 
//         <Stack.Screen name="Signscreen" component={Sign}  options={{ headerShown: false }} /> 
//         <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
//          <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false }} />
//          <Stack.Screen name="ConfirmPasswordScreen" component={ConfirmPasswordScreen} options={{ headerShown: false }}/>
//          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native'; // Import Image
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import ChatScreen from '../components/ChatScreen';
import ChatRoom from '../components/ChatRoom';
import ProfileScreen from '../components/ProfileScreen';
import HomeScreen from '../components/HomeScreen';
import AccountScreen from '../components/AccountScreen';
import DeafChildrenScreen from '../components/DeafChildren';
import VirtualTourScreen from '../components/VirtualTourScreen';
import TextToStoryScreen from '../components/TextToStoryScreen';
import WelcomeScreen from '../components/Welcome';
import Sign from '../components/Sign';
import OTPScreen from '../components/OTPScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import ConfirmPasswordScreen from '../components/ConfirmPasswordScreen';
import NotificationScreen from '../components/NotifcationScreen';
import VideoScreen from '../components/VideoScreen';
import { Avatar } from 'react-native-paper';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = 'home-outline';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Chat') {
            return (
<Avatar.Icon 
  icon="chat" 
  size={30} 
  style={{ backgroundColor: '#4169E1' }} // Optional: Change the background color of the icon
/>
            
            );
          } else if (route.name === 'Account') {
            iconName = 'person-outline';
            return <Icon name={iconName} size={size} color={color} />;
          }
          return null; // Default fallback
        },
        tabBarStyle: {
          backgroundColor: '#E6E6FF', // Light purple background
          borderWidth: 2, // Corrected
          borderTopColor: 'white',
          padding: 6,
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={ChatRoom} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Stack Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="DeafChildren" component={DeafChildrenScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VirtualTour" component={VirtualTourScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TextToStory" component={TextToStoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signscreen" component={Sign} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmPasswordScreen" component={ConfirmPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
