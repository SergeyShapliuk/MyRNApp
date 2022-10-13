import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';
import {DataType} from '../../types/types';

type QuizPresentPropsType = {
  renderProgressBar: () => JSX.Element;
  renderQuestion: () => JSX.Element;
  renderOptions: () => JSX.Element;
  renderNextButton: any;
  showScoreModal: boolean;
  score: number;
  allQuestions: DataType[];
  restartQuiz: () => void;
};
const QuizPresent = ({
  renderProgressBar,
  renderQuestion,
  renderOptions,
  renderNextButton,
  showScoreModal,
  score,
  allQuestions,
  restartQuiz,
}: QuizPresentPropsType) => {
  return (
    <View style={style.container}>
      {renderProgressBar()}

      {renderQuestion()}

      {renderOptions()}

      {renderNextButton()}

      <Modal animationType="slide" transparent={true} visible={showScoreModal}>
        <View style={style.modalContainer}>
          <View style={style.modal}>
            <Text style={style.textModal}>
              {score > allQuestions.length / 2 ? 'Congratulations!' : 'Oops!'}
            </Text>

            <View style={style.countModal}>
              <Text
                style={[
                  style.scoreModal,
                  {
                    color:
                      score > allQuestions.length / 2
                        ? COLORS.success
                        : COLORS.error,
                  },
                ]}>
                {score}
              </Text>
              <Text style={style.allQuestionsModal}>
                /{allQuestions.length}
              </Text>
            </View>
            <TouchableOpacity onPress={restartQuiz} style={style.restartButton}>
              <Text style={style.textRestartButton}>Retry Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image
        source={require('../../assets/olympicBg.png')}
        style={style.image}
        resizeMode={'contain'}
      />
      <Image
        source={require('../../assets/dottedBg.png')}
        style={style.dottedImage}
        resizeMode={'contain'}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  textModal: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  countModal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreModal: {
    fontSize: 30,
  },
  allQuestionsModal: {
    fontSize: 25,
    color: COLORS.black,
  },
  restartButton: {
    backgroundColor: COLORS.accent,
    padding: 20,
    width: '100%',
    borderRadius: 20,
  },
  textRestartButton: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 20,
  },
  image: {
    width: SIZES.width,
    height: SIZES.height,
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.2,
  },
  dottedImage: {
    width: SIZES.width,
    height: 130,
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
});
export default QuizPresent;
