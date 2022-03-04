import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TestStatusType, QuestionsProps} from '../../types/question-types';

export const AnswersLayout = ({
  questions,
  questionIndex = 0,
  testStatus,
  selectedAnswer,
  onPressAnswer,
}: QuestionsProps) => {
  return (
    <View style={styles.answersContainer}>
      {questions &&
        questions[questionIndex].de.answers.map((answer: string, i: number) => (
          <View key={i} style={styles.answerButtonContainer}>
            <TouchableOpacity
              style={
                selectedAnswer === answer
                  ? styles.answerButtonEmpty
                  : styles.answerButton
              }
              onPress={() => onPressAnswer && onPressAnswer(answer)}
              disabled={testStatus === TestStatusType.Ready}>
              <Text
                style={[
                  styles.textAnswer,
                  {
                    color:
                      selectedAnswer === answer ? 'transparent' : '#406d82',
                  },
                ]}>
                {answer}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  answersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  answerButtonContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  answerButton: {
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  answerButtonEmpty: {
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textAnswer: {
    fontSize: 18,
    color: '#406d82',
    textAlign: 'center',
    fontWeight: '500',
  },
});
