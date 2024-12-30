import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const VideoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();  // Use the useNavigation hook

  const { videoSource, description } = route.params;

  return (  
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
      <Video
        source={videoSource}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Signscreen')}  // Navigate to Sign screen
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6FA',
    padding: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6a1b9a',
    marginBottom: 16,
  },
  video: {
    width: '100%',
    maxWidth: 400,  // Limit the video width
    height: 600, // Adjust height based on aspect ratio
    aspectRatio: 1.78, // 16:9 aspect ratio
    borderRadius: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#6a1b9a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
