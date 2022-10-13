import React from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/theme';
import {DataType} from '../../types/types';
import QuizPresent from './QuizPresent';

type QuizPropsType<T> = {
  allQuestions: DataType[];
  currentQuestionIndex: number;
  currentOptionSelected: string | null;
  correctOption: string | null;
  isOptionsDisabled: boolean;
  showNextButton: boolean;
  showScoreModal: boolean;
  score: number;
  progress: T | Animated.Value;
  validateAnswer: (option: any) => void;
  handleNext: () => void;
  restartQuiz: () => void;
};
const Quiz = ({
  allQuestions,
  currentQuestionIndex,
  restartQuiz,
  currentOptionSelected,
  correctOption,
  isOptionsDisabled,
  progress,
  showNextButton,
  showScoreModal,
  handleNext,
  score,
  validateAnswer,
}: QuizPropsType<Animated.Value>) => {
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });
  const renderQuestion = () => {
    return (
      <View style={style.questionContainer}>
        <View style={style.countQuestion}>
          <Text style={style.textCountQuestion}>
            {`${currentQuestionIndex + 1} / ${allQuestions.length}`}
          </Text>
        </View>
        <Text style={style.textQuestion}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.options.map(option => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={[
              style.options,
              {
                borderColor:
                  option === correctOption
                    ? COLORS.success
                    : option === currentOptionSelected
                    ? COLORS.error
                    : COLORS.secondary + '40',
                backgroundColor:
                  option === correctOption
                    ? COLORS.success + '20'
                    : option === currentOptionSelected
                    ? COLORS.error + '20'
                    : COLORS.secondary + '20',
              },
            ]}>
            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

            {option === correctOption ? (
              <View style={style.successOption} />
            ) : option === currentOptionSelected ? (
              <View style={style.errorOption} />
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity onPress={handleNext} style={style.button}>
          <Text style={style.textButton}>Next</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  const renderProgressBar = () => {
    return (
      <View style={style.progressBar}>
        <Animated.View style={[style.animated, {width: progressAnim}]} />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <QuizPresent
        restartQuiz={restartQuiz}
        score={score}
        showScoreModal={showScoreModal}
        allQuestions={allQuestions}
        renderProgressBar={renderProgressBar}
        renderNextButton={renderNextButton}
        renderOptions={renderOptions}
        renderQuestion={renderQuestion}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  questionContainer: {
    marginVertical: 40,
  },
  countQuestion: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  textCountQuestion: {
    color: COLORS.white,
    fontSize: 20,
    opacity: 0.6,
  },
  textQuestion: {
    color: COLORS.white,
    fontSize: 30,
  },
  options: {
    borderWidth: 3,
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  successOption: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorOption: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: COLORS.accent,
    padding: 20,
    borderRadius: 5,
  },
  textButton: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 20,
    borderRadius: 20,
    backgroundColor: '#00000020',
  },
  animated: {
    height: 20,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
  },
});
export default Quiz;
