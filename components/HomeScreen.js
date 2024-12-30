
// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the search icon
// import api from '../api/api'; // Adjust the path as needed
// import { UserContext } from '../context/UserContext'; // Import UserContext

// const HomeScreen = ({ navigation }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const { user } = useContext(UserContext); // Access logged-in user info
//   const [userImage, setUserImage] = useState(''); // State to hold user image URL

//   // Features data
//   const features = [
//     { id: 1, name: 'Chat', screen: 'ChatRoom', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrI7o3UW-BfF1bsN2-Ddg7S5MOYJNhQpcDg&s' },
//     { id: 2, name: 'Deaf Children', screen: 'Signscreen', imageUrl: 'https://www.shutterstock.com/image-vector/children-hearing-aid-vector-illustration-260nw-2352617429.jpg' },
//     { id: 3, name: 'Virtual Tour', screen: 'VirtualTour', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4oaqcRXnTVztMYpTW69PpSCWobbOsQ8ENCd76URapckZadUBR3HaqEw&s' },
//     { id: 4, name: 'Text to Story', screen: 'TextToStory', imageUrl: 'https://e7.pngegg.com/pngimages/928/822/png-clipart-digital-storytelling-computer-icons-narrative-fairy-tale-sarah-connor-white-text.png' }
//   ];

//   // Fetch user image when the component mounts
//   useEffect(() => {
//     const fetchUserImage = async () => {
//       if (user && user.id) {
//         try {
//           console.log("Fetching user image for ID:", user.id); // Log the user ID
//           const response = await api.get(`/auth/users/${user.id}`); // Adjust this endpoint
//           setUserImage(response.data.avatar.url); // Assuming the user image is in the 'avatar' field
//         } catch (error) {
//           console.error('Error fetching user image:', error.response?.data || error.message); // Log detailed error
//           Alert.alert('Error', 'Failed to fetch user image.');
//         }
//       }
//     };

//     fetchUserImage();
//   }, [user]);

//   // Filter features based on the search query
//   const filteredFeatures = features.filter(feature =>
//     feature.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header Row: Text and Profile Image */}
//       <View style={styles.headerRow}>
//         <Text style={styles.headerText}>Welcome to Minimind!</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Account')}>
//           <Image
//             source={{ uri: userImage || 'https://images.pexels.com/photos/11619096/pexels-photo-11619096.jpeg?auto=compress&cs=tinysrgb&w=600'}} // Fallback image
//             style={styles.profileImage}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Search Input with Icon */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Features..."
//           value={searchQuery}
//           onChangeText={(text) => setSearchQuery(text)}
//         />
//       </View>

//       {/* Features Section */}
//       <Text style={styles.featuresText}>Features</Text>

//       {/* Image cards */}
//       <View style={styles.grid}>
//         {filteredFeatures.map((feature) => (
//           <TouchableOpacity
//             key={feature.id}
//             style={styles.card}
//             onPress={() => navigation.navigate(feature.screen)}
//           >
//             <Image
//               source={{ uri: feature.imageUrl }}
//               style={styles.image}
//             />
//             <Text style={styles.label}>{feature.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#E6E6FA', // Light purple background
//     padding: 20,
//   },
//   headerRow: {
//     flexDirection: 'row', // Align items horizontally
//     justifyContent: 'space-between', // Ensure space between text and image
//     alignItems: 'center', // Center items vertically in the row
//     width: '100%', // Take full width to space elements
//     paddingHorizontal: 10, // Add horizontal padding to prevent cutoff
//     marginBottom: 20, // Space below header row
//   },
//   profileImage: {
//     width: 50, // Size of the profile image
//     height: 50,
//     borderRadius: 25, // Make it circular
//     borderWidth: 2,
//     borderColor: '#e0bbff', // Light purple border around the image
//     marginRight: 10, // Increased margin to move image further from the edge
//   },
//   headerText: {
//     fontSize: 24, // Reduced size to fit better with image
//     fontWeight: 'bold',
//     color: '#4A0E77',
//     letterSpacing: 1, // Add letter spacing for a cleaner look
//     textTransform: 'uppercase', // Capitalize text for emphasis
//     marginTop: 20, // Add margin on top to give space for the image
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     borderColor: '#e0bbff',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//   },
//   searchIcon: {
//     padding: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     paddingLeft: 0, // Remove padding since icon already adds space
//   },
//   featuresText: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#4A0E77',
//     marginBottom: 25,
//     textAlign: 'center',
//     borderBottomWidth: 1, // Add underline
//     borderBottomColor: '#ddd',
//     paddingBottom: 10,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   card: {
//     width: '42%', // Adjust size of each card
//     backgroundColor: '#ffffff', // White card background
//     borderRadius: 15, // Softer border radius
//     padding: 20,
//     marginBottom: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10, // Softer shadow
//     elevation: 5, // Add slight elevation for depth
//     borderWidth: 1, // Add border
//     borderColor: '#e0bbff', // Light purple border
//   },
//   image: {
//     width: 85,  // Adjust the image size for better visibility
//     height: 85,
//     resizeMode: 'contain',
//     marginBottom: 10, // Add margin between image and text
//   },
//   label: {
//     marginTop: 5,
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#4A0E77', // Dark purple text
//     fontWeight: '600', // Make text bolder
//   },
// });

// export default HomeScreen;

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import api from '../api/api'; // Adjust the path as needed
import { UserContext } from '../context/UserContext'; // Import UserContext

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(UserContext); // Access logged-in user info
  const [userImage, setUserImage] = useState(''); // State to hold user image URL

  // Features data
  const features = [
    { id: 1, name: 'Chat', screen: 'ChatRoom', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrI7o3UW-BfF1bsN2-Ddg7S5MOYJNhQpcDg&s' },
    { id: 2, name: 'Deaf Children', screen: 'Signscreen', imageUrl: 'https://www.shutterstock.com/image-vector/children-hearing-aid-vector-illustration-260nw-2352617429.jpg' },
    { id: 3, name: 'Virtual Tour', screen: 'VirtualTour', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4oaqcRXnTVztMYpTW69PpSCWobbOsQ8ENCd76URapckZadUBR3HaqEw&s' },
    { id: 4, name: 'Text to Story', screen: 'TextToStory', imageUrl: 'https://e7.pngegg.com/pngimages/928/822/png-clipart-digital-storytelling-computer-icons-narrative-fairy-tale-sarah-connor-white-text.png' }
  ];

  useEffect(() => {
    const fetchUserImage = async () => {
      if (user && user.id) {
        try {
          console.log("Fetching user image for ID:", user.id);
          const response = await api.get(`/auth/users/${user.id}`);
          console.log('API Response:', response.data); // Log the full response
          setUserImage(response.data.avatar?.url || ''); // Handle potential undefined avatar
        } catch (error) {
          console.error('Error fetching user image:', error.response?.data || error.message);
          Alert.alert('Error', error.response?.data?.message || 'Failed to fetch user image.');
        }
      }
    };
  
    fetchUserImage();
  }, [user]);
    // Filter features based on the search query
  const filteredFeatures = features.filter(feature =>
    feature.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header Row: Text and Profile Image */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Welcome to Minimind!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Image
            source={{ uri: userImage || 'https://images.pexels.com/photos/11619096/pexels-photo-11619096.jpeg?auto=compress&cs=tinysrgb&w=600'}} // Fallback image
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Search Input with Icon */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Features..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Features Section with Bell Icon */}
      <View style={styles.featuresHeader}>
        <Text style={styles.featuresText}>Features</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Ionicons name="notifications" size={24} color="#FFD700" style={styles.bellIcon} />
        </TouchableOpacity>
      </View>

      {/* Image cards */}
      <View style={styles.grid}>
        {filteredFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={styles.card}
            onPress={() => navigation.navigate(feature.screen)}
          >
            <Image
              source={{ uri: feature.imageUrl }}
              style={styles.image}
            />
            <Text style={styles.label}>{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA', // Light purple background
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e0bbff',
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A0E77',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#e0bbff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 0,
  },
  featuresHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted to space out the elements
    width: '100%', // Ensures the header takes full width
    paddingHorizontal: 10, // Adds padding to both sides for better alignment
    marginBottom: 20,
  },
  featuresText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A0E77',
    textAlign: 'center',
  },
  bellIcon: {
    marginLeft: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    width: '42%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0bbff',
  },
  image: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  label: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    color: '#4A0E77',
    fontWeight: '600',
  },
});

export default HomeScreen;
