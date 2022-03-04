import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {QuestionsProps} from '../../types/question-types';

export const QuestionLayout = ({
  questions,
  questionIndex = 0,
}: QuestionsProps) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.question}>
        {questions && questions[questionIndex].en.sentence1}{' '}
        <Text style={[styles.questionKeyword]}>
          {questions && questions[questionIndex].en.answer}
        </Text>{' '}
        {questions && questions[questionIndex].en.sentence2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  questionKeyword: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  questionContainer: {
    paddingTop: 30,
  },
});
