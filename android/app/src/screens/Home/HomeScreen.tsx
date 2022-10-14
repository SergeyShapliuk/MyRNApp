import React, {useRef, useState, useEffect} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {data} from '../../data/data';
import Quiz from './Quiz';
import {useAppNavigation} from '../../types/types';

const HomeScreen = () => {
  const navigation = useAppNavigation();
  useEffect(() => {
    navigation.addListener('beforeRemove', e => e.preventDefault());
  }, [navigation]);
  console.log('home');
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState<
    string | null
  >(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);
  const progress = useRef(new Animated.Value(0)).current;

  const validateAnswer = (selectedOption: string) => {
    let correct_option = allQuestions[currentQuestionIndex].correct_option;
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption === correct_option) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  };
  const handleNext = () => {
    if (currentQuestionIndex === allQuestions.length - 1) {
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  console.log('homescreen');
  return (
    <View style={style.container}>
      <Quiz
        allQuestions={data}
        currentQuestionIndex={currentQuestionIndex}
        currentOptionSelected={currentOptionSelected}
        correctOption={correctOption}
        handleNext={handleNext}
        isOptionsDisabled={isOptionsDisabled}
        restartQuiz={restartQuiz}
        score={score}
        progress={progress}
        showNextButton={showNextButton}
        showScoreModal={showScoreModal}
        validateAnswer={validateAnswer}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default HomeScreen;
