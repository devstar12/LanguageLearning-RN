import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TestStatusType, QuestionsProps} from '../../types/question-types';

export const AnswerLayout = ({
  questions,
  questionIndex = 0,
  testStatus,
  selectedAnswer,
  correctFit,
}: QuestionsProps) => {
  return (
    <View style={styles.answerContainer}>
      <View>
        <Text style={styles.question}>
          {questions && questions[questionIndex].de.sentence1}
          {'  '}
        </Text>
      </View>

      {!selectedAnswer ? (
        <Text style={[styles.answerKeyword]}>{'_______'}</Text>
      ) : (
        <View
          style={[
            styles.answerButton,
            {
              backgroundColor:
                testStatus === TestStatusType.Complete && !correctFit
                  ? '#f97788'
                  : '#fff',
              marginTop: -10,
            },
          ]}>
          <Text style={[styles.textAnswer]}>{selectedAnswer}</Text>
        </View>
      )}

      <View>
        <Text style={styles.question}>
          {'  '}
          {questions && questions[questionIndex].de.sentence2}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  answerKeyword: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
  answerContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  textAnswer: {
    fontSize: 18,
    color: '#406d82',
    textAlign: 'center',
    fontWeight: '500',
  },
});
