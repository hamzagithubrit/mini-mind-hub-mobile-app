
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, FlatList, Dimensions, Modal, TextInput } from 'react-native';

const data = [
  { 
    id: '1', 
    name: 'Child A', 
    image: require('../assets/Sleep.jpg'), 
    flippedImage: require('../assets/s1.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'Sleeping', B: 'laughing' }, 
    correctAnswer: 'A' 
  },
  { 
    id: '2', 
    name: 'Child B', 
    image: require('../assets/small.jpg'), 
    flippedImage: require('../assets/s3.jpg'), 
    quizQuestion: 'What the sign is?', 
    options: { A: 'big', B: 'small' }, 
    correctAnswer: 'B' 
  },
  { 
    id: '3', 
    name: 'Child C', 
    image: require('../assets/spider.jpg'), 
    flippedImage: require('../assets/s4.jpg'), 
    quizQuestion: 'What the sign is?', 
    options: { A: 'spider', B: 'rabbit' }, 
    correctAnswer: 'A' 
  },
  { 
    id: '4', 
    name: 'Child D', 
    image: require('../assets/insect.jpg'), 
    flippedImage: require('../assets/s5.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'animal', B: 'insect' }, 
    correctAnswer: 'B' 
  },
  { 
    id: '5', 
    name: 'Child E', 
    image: require('../assets/flower.jpg'), 
    flippedImage: require('../assets/s7.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'flower', B: 'toys' }, 
    correctAnswer: 'A' 
  },
  { 
    id: '6', 
    name: 'Child F', 
    image: require('../assets/Color.jpg'), 
    flippedImage: require('../assets/s8.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'shade', B: 'color' }, 
    correctAnswer: 'B' 
  },
  { 
    id: '7', 
    name: 'Child G', 
    image: require('../assets/catterpillar.jpg'), 
    flippedImage: require('../assets/s9.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'catterpillar', B: 'tomato' }, 
    correctAnswer: 'A' 
  },
  { 
    id: '8', 
    name: 'Child H', 
    image: require('../assets/Butterfly.jpg'), 
    flippedImage: require('../assets/s10.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'beatle', B: 'butterfly' }, 
    correctAnswer: 'B' 
  },
  { 
    id: '9', 
    name: 'Child I', 
    image: require('../assets/bug.jpg'), 
    flippedImage: require('../assets/s11.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'bug', B: 'delay' }, 
    correctAnswer: 'A' 
  },
  { 
    id: '10', 
    name: 'Child J', 
    image: require('../assets/bee.jpg'), 
    flippedImage: require('../assets/s14.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'fly', B: 'bee' }, 
    correctAnswer: 'B' 
  },
  { 
    id: '11', 
    name: 'Child K', 
    image: require('../assets/beautiful.jpg'), 
    flippedImage: require('../assets/s16.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'beautiful', B: 'ugly' }, 
    correctAnswer: 'A' 
  },
  { 
    id: '12', 
    name: 'Child L', 
    image: require('../assets/Animal.jpg'), 
    flippedImage: require('../assets/s20.jpg'), 
    quizQuestion: 'What the sign is ?', 
    options: { A: 'insect', B: 'Animal' }, 
    correctAnswer: 'B' 
  },
];

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 40;

const DeafChildrenScreen = () => {
  const [allFlipped, setAllFlipped] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [finalScore, setFinalScore] = useState('');
  const rotateAnimation = new Animated.Value(0);

  const handleButtonClick = () => {
    setAllFlipped(!allFlipped);
    Animated.timing(rotateAnimation, {
      toValue: allFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const openQuiz = (card) => {
    setSelectedCard({ ...card, flipped: false });
    setQuizVisible(true);
    setFeedback(null);
  };

  const handleCancel = () => {
    setQuizVisible(false);
    setSelectedCard(null);
    setFeedback(null);
  };


  const handleAnswer = (answer) => {
    if (selectedCard.correctAnswer === answer) {
      setFeedback('😊 Correct!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback('😞 Wrong!');
    }

    setQuizCount((prevCount) => prevCount + 1);

    setTimeout(() => {
      setQuizVisible(false);
      setSelectedCard((prev) => ({ ...prev, flipped: true }));
      setFeedback(null);

      if (quizCount + 1 === data.length) {
        setFinalScore(`Your score is: ${score + (selectedCard.correctAnswer === answer ? 1 : 0)} out of ${data.length}`);
      }
    }, 1500);
  };

  const handleTryAgain = () => {
    setScore(0);
    setQuizCount(0);
    setFinalScore('');
    setAllFlipped(false);
    setSelectedCard(null);
  };

  const renderItem = ({ item }) => (
    <Card
      name={item.name}
      image={item.image}
      flippedImage={item.flippedImage}
      rotateAnimation={rotateAnimation}
      allFlipped={allFlipped}
      feedback={feedback}
      flipped={selectedCard?.id === item.id && selectedCard?.flipped}
      onPress={() => openQuiz(item)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Banner Image */}
      <Image
        source={require('../assets/tb3.png')} // Adjust the path as needed
        style={styles.bannerImage}
      />
      
      <Text style={styles.title}>Guess the Signs</Text>
      <TouchableOpacity style={styles.magicButton} onPress={handleButtonClick}>
        <Text style={styles.magicButtonText}>Click me to see magic</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.cardContainer}
      />

    
<Modal visible={quizVisible} transparent animationType="fade">
  <View style={styles.quizContainer}>
    <View style={styles.quizBox}>
      <Text style={styles.quizText}>Guess{"\n"}{selectedCard?.quizQuestion}</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => handleAnswer('A')} style={styles.optionButton}>
          <Text style={styles.optionText}>{`A: ${selectedCard?.options.A}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAnswer('B')} style={styles.optionButton}>
          <Text style={styles.optionText}>{`B: ${selectedCard?.options.B}`}</Text>
        </TouchableOpacity>
      </View>
      {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>




      {finalScore && (
        <View style={styles.scoreContainer}>
          <TextInput 
            style={styles.scoreInput} 
            value={finalScore} 
            editable={false} 
          />
          <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
            <Text style={styles.tryAgainButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Card = ({ name, image, flippedImage, rotateAnimation, allFlipped, feedback, flipped, onPress }) => {
  const interpolateRotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animatedStyle = {
    transform: [{ rotateY: allFlipped || flipped ? interpolateRotation : '0deg' }],
  };

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={feedback ? null : onPress}>
      <Animated.View style={[styles.cardInner, animatedStyle]}>
        <Image 
          source={allFlipped || flipped ? flippedImage : image} 
          style={styles.image} 
        />
        <Text style={styles.name}>{name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6FA',
  },
  bannerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  magicButton: {
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  magicButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  cardContainer: {
    justifyContent: 'space-around',
  },
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardInner: {
    backfaceVisibility: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },



  quizContainer: {
    flex: 1, // Takes up the available vertical space to center it
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly transparent background for overlay
    padding: 20,
    marginTop:70
  },

  quizBox: {
    width: '95%', // Adjusts width to fit within the screen with some padding
    maxWidth: 500, // Optional max width for larger screens
    backgroundColor: '#E6E6FA', // Light purple background
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 2, // Border around the quiz box
    borderColor: '#6A5ACD', // Border color
    borderRadius: 10,
    alignItems: 'center',
      marginTop: 50, // Adjust this value to control how far down the box appears

  },

  quizText: {
    color: '#6A5ACD',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },


  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  feedbackText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreInput: {
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#6A5ACD',
  },
  tryAgainButton: {
    backgroundColor: '#FF6347', // You can change the color as needed
    padding: 10,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  cancelButton: {
    backgroundColor: '#FF6347', // Change color as needed
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default DeafChildrenScreen;







