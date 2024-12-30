
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Animatable from 'react-native-animatable';

const videos = [
  {
    id: '1',
    title: 'Virtual Tour of the Zoo',
    url: 'https://youtu.be/rTqg2hEjGdE?si=Y740SXiIsAUahr4-',
    thumbnail: 'https://img.youtube.com/vi/rTqg2hEjGdE/0.jpg',
  },
  {
    id: '2',
    title: 'Exploring Space: The Universe',
    url: 'https://youtu.be/MkRSmynqonM?si=pyjT5Fl0p1W2FYXq',
    thumbnail: 'https://img.youtube.com/vi/MkRSmynqonM/0.jpg',
  },
  {
    id: '3',
    title: 'Underwater Adventure',
    url: 'https://youtu.be/v64KOxKVLVg?si=0ty5LqBYu1ak9o8i',
    thumbnail: 'https://img.youtube.com/vi/v64KOxKVLVg/0.jpg',
  },
  {
    id: '4',
    title: 'Peppa Pig - The Museum',
    url: 'https://youtu.be/fuofW6vCSys?si=83Ze4Ea1ezfBsf6F',
    thumbnail: 'https://img.youtube.com/vi/fuofW6vCSys/0.jpg',
  },
  {
    id: '5',
    title: 'The Magic School Bus - Inside Ralphie',
    url: 'https://youtu.be/gbUkxDI7gOU?si=rgiOC6PRSwuvmuSq',
    thumbnail: 'https://img.youtube.com/vi/gbUkxDI7gOU/0.jpg',
  },
  {
    id: '6',
    title: 'National Geographic Kids - Weird But True!',
    url: 'https://youtu.be/LzAN4mHl5Pc?si=NRQljp6w84-YypwJ',
    thumbnail: 'https://img.youtube.com/vi/LzAN4mHl5Pc/0.jpg',
  },
];

const VirtualTourScreen = () => {
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  
  // Add your banner image URL here
  const bannerImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4oaqcRXnTVztMYpTW69PpSCWobbOsQ8ENCd76URapckZadUBR3HaqEw&s'; 

  const renderVideoItem = ({ item }) => (
    <Animatable.View 
      animation="pulse" 
      easing="ease-in-out" 
      iterationCount="infinite" 
      duration={1500} 
      style={styles.videoItem}
    >
      <TouchableOpacity 
        onPress={() => { setSelectedVideo(item.url); setLoading(true); }}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <Text style={styles.videoTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Animatable.Text 
        animation="fadeInDown" 
        duration={1000} 
        style={styles.header}
      >
        Virtual Tour
      </Animatable.Text>

      {/* Conditionally render the Banner Image */}
      {!selectedVideo && ( // Hide the banner image when a video is selected
        <Animatable.View 
          animation="fadeInUp" 
          duration={1000} 
          style={styles.bannerContainer}
        >
          <Animatable.Image 
            source={{ uri: bannerImageUrl }} 
            style={styles.bannerImage} 
            resizeMode="cover" 
            animation="bounceIn"
            iterationCount="infinite"
            direction="alternate"
          />
        </Animatable.View>
      )}

      {selectedVideo ? (
        <Animatable.View 
          animation="fadeIn" 
          style={styles.webViewContainer}
        >
          {loading && <ActivityIndicator size="large" color="#4A0E77" style={styles.loader} />}
          <WebView 
            source={{ uri: selectedVideo }} 
            style={styles.webView} 
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onLoadEnd={() => setLoading(false)} // Hide loader when video loads
          />
        </Animatable.View>
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.videoList}
        />
      )}

      {selectedVideo && (
        <Animatable.View 
          animation="fadeInUp" 
          duration={800}
        >
          <TouchableOpacity 
            onPress={() => setSelectedVideo(null)} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Animatable.Text 
              animation="rubberBand" 
              iterationCount="infinite" 
              style={styles.backButtonText}
            >
              Back to Videos
            </Animatable.Text>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA', // Light purple background
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4A0E77',
    textAlign: 'center',
    marginBottom: 10, // Reduced margin for header
    marginTop: 40,
  },
  bannerContainer: {
    marginBottom: 15, // Margin below the banner
  },
  bannerImage: {
    width: '100%',
    height: 200, // Adjust height as needed
    borderRadius: 10,
  },
  videoList: {
    paddingBottom: 20,
  },
  videoItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  videoTitle: {
    fontSize: 18,
    color: '#4A0E77',
    fontWeight: '600',
    textAlign: 'center',
  },
  webViewContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
  },
  webView: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#4A0E77',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VirtualTourScreen;
