
// import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
// import React, { useRef } from 'react';
// import { useNavigation } from '@react-navigation/native';

// const Sign = () => {
//   const navigation = useNavigation();
//   const bounceValues = useRef([...Array(50)].map(() => new Animated.Value(1))).current;

//   const bounceImage = (index) => {
//     Animated.sequence([
//       Animated.spring(bounceValues[index], {
//         toValue: 1.05,
//         friction: 3,
//         tension: 40,
//         useNativeDriver: true,
//       }),
//       Animated.spring(bounceValues[index], {
//         toValue: 1,
//         friction: 3,
//         tension: 40,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   const images = [
//     require('../assets/deaf101.jpg'),
//     require('../assets/3.jpg'),
//     require('../assets/4.jpg'),
//     require('../assets/5.jpg'),
//     require('../assets/14.jpg'),
//     require('../assets/15.jpg'),
//     require('../assets/16.jpg'),
//     require('../assets/17.jpg'),
//     require('../assets/18.jpg'),
//     require('../assets/19.jpg'),
//     require('../assets/20.jpg'),
//     require('../assets/21.jpg'),
//     require('../assets/22.jpg'),
//     require('../assets/23.jpg'),
//     require('../assets/24.jpg'),
//     require('../assets/25.jpg'),
//     require('../assets/26.jpg'),
//     require('../assets/27.jpg'),
//     require('../assets/28.jpg'),
//     require('../assets/29.jpg'),
//     require('../assets/30.jpg'),
//     require('../assets/31.jpg'),
//     require('../assets/32.jpg'),
//     require('../assets/33.jpg'),
//     require('../assets/34.jpg'),
//     require('../assets/35.jpg'),
//     require('../assets/36.jpg'),
//     require('../assets/37.jpg'),
//     require('../assets/38.jpg'),
//     require('../assets/39.jpg'),
//     require('../assets/deaf56.jpg'),
//     require('../assets/deaf60.jpg'),
//     require('../assets/deaf100.jpg'),
//     require('../assets/8.jpg'),
//     require('../assets/45.jpg'),
//     require('../assets/46.jpg'),
//     require('../assets/6.jpg'),
//     require('../assets/8.jpg'),
//     require('../assets/10.jpg'),
//     require('../assets/11.jpg'),
//     require('../assets/12.jpg'),
//     require('../assets/13.jpg')
//   ];

//   const AnimatedImage = ({ source, index }) => (
//     <TouchableOpacity onPress={() => bounceImage(index)}>
//       <Animated.Image
//         source={source}
//         style={[styles.image, { transform: [{ scale: bounceValues[index] }] }]}
//       />
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={require('../assets/1.png')} style={styles.bannerImage} />
//       <Text style={styles.title}>Sign Information</Text>

//       {Array.from({ length: Math.ceil(images.length / 2) }).map((_, rowIndex) => (
//         <View key={rowIndex} style={styles.imageRow}>
//           {images.slice(rowIndex * 2, rowIndex * 2 + 2).map((source, index) => (
//             <AnimatedImage key={index} source={source} index={rowIndex * 2 + index} />
//           ))}
//         </View>
//       ))}

//       <TouchableOpacity style={styles.guessButton} onPress={() => navigation.navigate('DeafChildren')}>
//         <Text style={styles.buttonText}>Guess Signs</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default Sign;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     alignItems: 'center',
//     backgroundColor: '#E6E6FA',
//   },
//   bannerImage: {
//     width: 430,
//     height: 520,
//     resizeMode: 'cover',
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#6a1b9a',
//     marginBottom: 16,
//   },
//   imageRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 8,
//   },
//   image: {
//     width: 180,
//     height: 250,
//     margin: 8,
//     borderRadius: 8,
//   },
//   guessButton: {
//     backgroundColor: '#6a1b9a',
//     paddingVertical: 20,
//     paddingHorizontal: 50,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
// });




import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

const Sign = () => {
  const navigation = useNavigation();
  const bounceValues = useRef([...Array(50)].map(() => new Animated.Value(1))).current;

  const bounceImage = (index) => {
    Animated.sequence([
      Animated.spring(bounceValues[index], {
        toValue: 1.05,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(bounceValues[index], {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const images = [
    require('../assets/deaf101.jpg'),
    require('../assets/3.jpg'),
    require('../assets/4.jpg'),
    require('../assets/5.jpg'),
    require('../assets/14.jpg'),
    require('../assets/15.jpg'),
    require('../assets/16.jpg'),
    require('../assets/17.jpg'),
    require('../assets/18.jpg'),
    require('../assets/19.jpg'),
    require('../assets/20.jpg'),
    require('../assets/21.jpg'),
    require('../assets/22.jpg'),
    require('../assets/23.jpg'),
    require('../assets/24.jpg'),
    require('../assets/25.jpg'),
    require('../assets/26.jpg'),
    require('../assets/27.jpg'),
    require('../assets/28.jpg'),
    require('../assets/29.jpg'),
    require('../assets/30.jpg'),
    require('../assets/31.jpg'),
    require('../assets/32.jpg'),
    require('../assets/33.jpg'),
    require('../assets/34.jpg'),
    require('../assets/35.jpg'),
    require('../assets/36.jpg'),
    require('../assets/37.jpg'),
    require('../assets/38.jpg'),
    require('../assets/39.jpg'),
    require('../assets/deaf56.jpg'),
    require('../assets/deaf60.jpg'),
    require('../assets/deaf100.jpg'),
    require('../assets/8.jpg'),
    require('../assets/45.jpg'),
    require('../assets/46.jpg'),
    require('../assets/6.jpg'),
    require('../assets/8.jpg'),
    require('../assets/10.jpg'),
    require('../assets/11.jpg'),
    require('../assets/12.jpg'),
    require('../assets/13.jpg'),
  ];
  
  const videoData = [
    { source: require('../assets/hungry.mp4'), description: ' Learn about  hungry sign.' },
    { source: require('../assets/look.mp4'), description: 'Learn about look sign.' },
    { source: require('../assets/sky.mp4'), description: 'Learn about sky sign.' },
    { source: require('../assets/under.mp4'), description: 'Learn about under sign.' },
    { source: require('../assets/dinasour.mp4'), description: 'Learn about dinasour sign.' },
    { source: require('../assets/green.mp4'), description: 'Learn about green sign.' },
    { source: require('../assets/fire.mp4'), description: 'Learn about fire sign.' },
    { source: require('../assets/sun.mp4'), description: 'Learn about sun sign.' },
    { source: require('../assets/giggle.mp4'), description: 'Learn about giggle sign.' },
    { source: require('../assets/house.mp4'), description: 'Learn about house sign.' },
    { source: require('../assets/now.mp4'), description: 'Learn about now sign.' },
    { source: require('../assets/chop.mp4'), description: 'Learn about chop sign.' },
    { source: require('../assets/spider.mp4'), description: 'Learn about spider sign.' },
    { source: require('../assets/swim.mp4'), description: 'Learn about swim sign.' },
    { source: require('../assets/banana.mp4'), description: 'Learn about banana sign.' },
    { source: require('../assets/dirt.mp4'), description: 'Learn about dirt sign.' },
    { source: require('../assets/children.mp4'), description: 'Learn about children sign.' },
    { source: require('../assets/tomorrow.mp4'), description: 'Learn about tomorrow sign.' },
    { source: require('../assets/eat.mp4'), description: 'Learn about eat sign.' },
    { source: require('../assets/no.mp4'), description: 'Learn about no sign.' },
    { source: require('../assets/elephant.mp4'), description: 'Learn about elephant sign.' },
    { source: require('../assets/bird.mp4'), description: 'Learn about bird sign.' },
    { source: require('../assets/blue.mp4'), description: 'Learn about blue sign.' },
    { source: require('../assets/cookie.mp4'), description: 'Learn about cookie sign.' },
    { source: require('../assets/red.mp4'), description: 'Learn about red sign.' },
    { source: require('../assets/butterfly.mp4'), description: 'Learn about butterfly sign.' },
    { source: require('../assets/question.mp4'), description: 'Learn about question sign.' },
    { source: require('../assets/pull.mp4'), description: 'Learn about pull sign.' },
    { source: require('../assets/top.mp4'), description: 'Learn about top sign.' },
    { source: require('../assets/time.mp4'), description: 'Learn about time sign.' },
    { source: require('../assets/feeling.mp4'), description: 'Learn about feeling sign.' },
    { source: require('../assets/push.mp4'), description: 'Learn about push sign.' },
    { source: require('../assets/giggle.mp4'), description: 'Learn about giggle sign.' },
    { source: require('../assets/name.mp4'), description: 'Learn about name sign.' },
    { source: require('../assets/plane.mp4'), description: 'Learn about plane sign.' },
    { source: require('../assets/parents.mp4'), description: 'Learn about parents sign.' },
    { source: require('../assets/paper.mp4'), description: 'Learn about paper sign.' },
    { source: require('../assets/name.mp4'), description: 'Learn about name sign.' },
    { source: require('../assets/stairs.mp4'), description: 'Learn about stairs sign.' },
    { source: require('../assets/quiet.mp4'), description: 'Learn about quiet sign.' },
    { source: require('../assets/jump.mp4'), description: 'Learn about jump sign.' },
    { source: require('../assets/soda.mp4'), description: 'Learn about soda pop sign.' },





























  ];
  
  const AnimatedImage = ({ source, index }) => (
    <TouchableOpacity
      onPress={() => {
        bounceImage(index);
        navigation.navigate('VideoScreen', {
          videoSource: videoData[index]?.source, // Ensures the correct video is played
          description: videoData[index]?.description,
        });
      }}
    >
      <Animated.Image
        source={source}
        style={[styles.image, { transform: [{ scale: bounceValues[index] }] }]}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/1.png')} style={styles.bannerImage} />
      <Text style={styles.title}>Sign Information</Text>

      {Array.from({ length: Math.ceil(images.length / 2) }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.imageRow}>
          {images.slice(rowIndex * 2, rowIndex * 2 + 2).map((source, index) => (
            <AnimatedImage key={index} source={source} index={rowIndex * 2 + index} />
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.guessButton} onPress={() => navigation.navigate('DeafChildren')}>
        <Text style={styles.buttonText}>Guess Signs</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
  },
  bannerImage: {
    width: 430,
    height: 520,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 16,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
    width: 180,
    height: 250,
    margin: 8,
    borderRadius: 8,
  },
  guessButton: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

