import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Video } from 'expo-av';
import videoA from '../assets/b.mp4';
import videoB from '../assets/a.mp4';
import videoC from '../assets/h.mp4';
import videoD from '../assets/horse.mp4';

const TextToStoryScreen = () => {
  const [paragraph, setParagraph] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showVideoIndex, setShowVideoIndex] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    const lines = paragraph.split('.').filter((line) => line.trim() !== '');

    try {
      const response = await fetch(
        'https://26d0-34-125-168-40.ngrok-free.app/generate-video',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompts: lines }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setImages(data.images || []); // Fallback to empty array if undefined
        setVideoUrl(data.videoUrl || ''); // Fallback to empty string if undefined
      } else {
        console.error('Error fetching data:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const videoTitles = [
    'House of Zainab',
    'Dog is sleeping on the road',
    'Story of Horses',
    'The Horse is Flying',
  ];

  const questions1 = [
    {
      question: 'Where did the fisherman used to go?',
      options: ['Cottage', 'Seaside', 'Park'],
      answer: 'Seaside',
    },
    {
      question: 'What was the color of the flounder?',
      options: ['Golden', 'Orange', 'Red'],
      answer: 'Golden',
    },
    {
      question: 'What was the first wish of the fisherman?',
      options: ['Car', 'Home', 'Garden'],
      answer: 'Home',
    },
  ];

  const questions2 = [
    {
      question: 'What did the little sparrow decorate?',
      options: ['Nest', 'Tree', 'Garden'],
      answer: 'Nest',
    },
    {
      question: "What destroyed the sparrow's nest?",
      options: ['Water waves', 'Volcano', 'Strong wind'],
      answer: 'Strong wind',
    },
    {
      question: 'What was the name of the King of Birds?',
      options: ['Guruda', 'Narato', 'Solcates'],
      answer: 'Guruda',
    },
  ];

  const handleAnswerChange = (index, selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    setIsQuizCompleted(true);
  };

  const calculateScore = () => {
    const allQuestions = [...questions1, ...questions2];
    let score = 0;
    allQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        score += 1;
      }
    });
    return score;
  };

  const videoSources = [videoA, videoB, videoC, videoD];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Generate Video from Paragraph</Text>
        <TextInput
          value={paragraph}
          onChangeText={setParagraph}
          placeholder="Enter your paragraph."
          multiline
          style={styles.textInput}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Generate Video</Text>
          )}
        </TouchableOpacity>

        {images.length > 0 && (
          <View>
            <Text style={styles.subHeading}>Generated Images</Text>
            {images.map((imgUrl, index) => (
              <TouchableOpacity key={index} onPress={() => Linking.openURL(imgUrl)}>
                <Text style={styles.link}>Image {index + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {videoUrl && (
          <View>
            <Text style={styles.subHeading}>Generated Video</Text>
            <TouchableOpacity onPress={() => Linking.openURL(videoUrl)}>
              <Text style={styles.link}>Watch Video</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.videoHeading}>The fisherman and his wife</Text>
      <WebView
        style={styles.video}
        source={{ uri: 'https://www.youtube.com/embed/Y5EL8g2u11M' }}
      />

      <Text style={styles.quizHeading}>Answer the Questions Below:</Text>
      <View style={styles.quizContainer}>
        {questions1.map((q, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.boldText}>{q.question}</Text>
            {q.options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleAnswerChange(index, option)}
                style={styles.optionContainer}
              >
                <Text style={styles.boldText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <Text style={styles.videoHeading}>The little sparrow's unbreakable will!!</Text>
      <WebView
        style={styles.video}
        source={{ uri: 'https://www.youtube.com/embed/h8dz4yhvYVo' }}
      />

      <TouchableOpacity onPress={handleSubmitQuiz} style={[styles.button, styles.submitButton]}>
        <Text style={styles.buttonText}>Submit Answers</Text>
      </TouchableOpacity>

      {isQuizCompleted && (
        <View>
          <Text style={styles.scoreText}>
            Your Total Score: {calculateScore()}/{questions1.length + questions2.length}
          </Text>
        </View>
      )}

      <Text style={styles.videoLinksHeading}>Watch Local Videos</Text>
      {videoSources.map((video, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => setShowVideoIndex(index)}>
            <Text style={styles.link}>{videoTitles[index]}</Text>
          </TouchableOpacity>
          {showVideoIndex === index && (
            <Video
              source={video}
              style={styles.videoPlayer}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6E6FA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: '#E6E6FA',
    padding: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 20,
  },
  submitButton: {
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  subHeading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginVertical: 10,
  },
  videoHeading: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 20,
  },
  video: {
    height: 315,
  },
  videoPlayer: {
    height: 200,
    backgroundColor: 'black',
    marginVertical: 20,
  },
  quizHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  quizContainer: {
    marginTop: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    borderColor: '#007bff',
  },
  checkmark: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  scoreText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  videoLinksHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default TextToStoryScreen;








// import React, { useState } from 'react';
// import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Linking } from 'react-native';
// import { WebView } from 'react-native-webview';

// const TextToStoryScreen = () => {
//   const [paragraph, setParagraph] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userAnswers, setUserAnswers] = useState(Array(6).fill(''));
//   const [isQuizCompleted, setIsQuizCompleted] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     const lines = paragraph.split('.').filter(line => line.trim() !== "");

//     try {
//       const response = await fetch('https://33a4-34-127-92-161.ngrok-free.app/generate-video', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompts: lines }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setImages(data.images);
//         setVideoUrl(data.videoUrl);
//       } else {
//         console.error('Error fetching data:', data);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const questions1 = [
//     { question: "Where did the fisherman used to go?", options: ['Cottage', 'Seaside', 'Park'], answer: 'Seaside' },
//     { question: "What was the color of the flounder?", options: ['Golden', 'Orange', 'Red'], answer: 'Golden' },
//     { question: "What was the first wish of the fisherman?", options: ['Car', 'Home', 'Garden'], answer: 'Home' },
//   ];

//   const questions2 = [
//     { question: "What did the little sparrow decorate?", options: ['Nest', 'Tree', 'Garden'], answer: 'Nest' },
//     { question: "What destroyed the sparrow's nest?", options: ['Water waves', 'Volcano', 'Strong wind'], answer: 'Strong wind' },
//     { question: "What was the name of the King of Birds?", options: ['Guruda', 'Narato', 'Solcates'], answer: 'Guruda' },
//   ];

//   const handleAnswerChange = (index, selectedOption) => {
//     const updatedAnswers = [...userAnswers];
//     updatedAnswers[index] = selectedOption;
//     setUserAnswers(updatedAnswers);
//   };

//   const handleSubmitQuiz = () => {
//     setIsQuizCompleted(true);
//   };

//   const calculateScore = () => {
//     const allQuestions = [...questions1, ...questions2];
//     let score = 0;
//     allQuestions.forEach((q, index) => {
//       if (userAnswers[index] === q.answer) {
//         score += 1;
//       }
//     });
//     return score;
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
//       {/* Video and Images Generation Form */}
//       <View style={styles.formContainer}>
//         <Text style={styles.heading}>Generate Video from Paragraph</Text>
//         <TextInput
//           value={paragraph}
//           onChangeText={setParagraph}
//           placeholder="Enter your paragraph."
//           multiline
//           style={styles.textInput}
//         />
//         <TouchableOpacity
//           onPress={handleSubmit}
//           style={styles.button}
//           disabled={loading}
//         >
//           {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Generate Video</Text>}
//         </TouchableOpacity>

//         {images.length > 0 && (
//           <View>
//             <Text style={styles.subHeading}>Generated Images</Text>
//             {images.map((imgUrl, index) => (
//               <TouchableOpacity key={index} onPress={() => Linking.openURL(imgUrl)}>
//                 <Text style={styles.link}>Image {index + 1}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}

//         {videoUrl && (
//           <View>
//             <Text style={styles.subHeading}>Generated Video</Text>
//             <TouchableOpacity onPress={() => Linking.openURL(videoUrl)}>
//               <Text style={styles.link}>Watch Video</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* First YouTube Video and Quiz */}
//       <Text style={styles.videoHeading}>The fisherman and his wife</Text>
//       <WebView
//         style={styles.video}
//         source={{ uri: 'https://www.youtube.com/embed/Y5EL8g2u11M' }}
//       />

//       <Text style={styles.quizHeading}>Answer the Questions Below:</Text>
//       <View style={styles.quizContainer}>
//         {questions1.map((q, index) => (
//           <View key={index} style={styles.questionContainer}>
//             <Text style={styles.boldText}>{q.question}</Text>
//             {q.options.map((option, idx) => (
//               <TouchableOpacity 
//                 key={idx} 
//                 onPress={() => handleAnswerChange(index, option)} 
//                 style={styles.optionContainer}
//               >
//                 <View style={styles.checkboxContainer}>
//                   <View style={[styles.checkbox, userAnswers[index] === option && styles.checkedCheckbox]}>
//                     {userAnswers[index] === option && <Text style={styles.checkmark}>✓</Text>}
//                   </View>
//                   <Text style={styles.boldText}>{option}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         ))}
//       </View>

//       {/* Second YouTube Video and Quiz */}
//       <Text style={styles.videoHeading}>The little sparrow's unbreakable will!!</Text>
//       <WebView
//         style={styles.video}
//         source={{ uri: 'https://www.youtube.com/embed/h8dz4yhvYVo' }}
//       />

//       <Text style={styles.quizHeading}>Answer the Questions Below:</Text>
//       <View style={styles.quizContainer}>
//         {questions2.map((q, index) => (
//           <View key={index} style={styles.questionContainer}>
//             <Text style={styles.boldText}>{q.question}</Text>
//             {q.options.map((option, idx) => (
//               <TouchableOpacity 
//                 key={idx} 
//                 onPress={() => handleAnswerChange(index + questions1.length, option)} 
//                 style={styles.optionContainer}
//               >
//                 <View style={styles.checkboxContainer}>
//                   <View style={[styles.checkbox, userAnswers[index + questions1.length] === option && styles.checkedCheckbox]}>
//                     {userAnswers[index + questions1.length] === option && <Text style={styles.checkmark}>✓</Text>}
//                   </View>
//                   <Text style={styles.boldText}>{option}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         ))}

//       </View>

//       {/* Submit Button */}
//       <TouchableOpacity
//         onPress={handleSubmitQuiz}
//         style={[styles.button, styles.submitButton]}
//       >
//         <Text style={styles.buttonText}>Submit Answers</Text>
//       </TouchableOpacity>

//       {/* Show final score if quiz is completed */}
//       {isQuizCompleted && (
//         <View>
//           <Text style={styles.scoreText}>Your Total Score: {calculateScore()}/{questions1.length + questions2.length}</Text>

//         </View>
//       )}.

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   scrollContent: {
//     paddingBottom: 40,
//   },
//   formContainer: {
//     backgroundColor: '#D3D3D3',
//     padding: 20,
//   },
//   heading: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   textInput: {
//     height: 100,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginTop: 10,
//     padding: 10,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     marginTop: 20,
//   },
//   submitButton: {
//     marginBottom: 40,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   subHeading: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginTop: 20,
//   },
//   link: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
//   videoHeading: {
//     fontWeight: 'bold',
//     fontSize: 22,
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   video: {
//     height: 315,
//   },
//   quizHeading: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   quizContainer: {
//     marginTop: 20,
//   },
//   questionContainer: {
//     marginBottom: 20,
//   },
//   optionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: 'gray',
//     marginRight: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkedCheckbox: {
//     borderColor: '#007bff',
//   },
//   checkmark: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   scoreText: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default TextToStoryScreen;





