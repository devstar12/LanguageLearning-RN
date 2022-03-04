import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TestStatusType, QuestionsProps} from '../../types/question-types';

export const FooterLayout = ({
  testStatus,
  selectedAnswer,
  onStart,
  onPressAnswerNext,
}: QuestionsProps) => {
  return (
    <View style={styles.container}>
      {testStatus === TestStatusType.Ready && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onStart && onStart()}>
          <Text style={styles.textContinue}>Start</Text>
        </TouchableOpacity>
      )}

      {testStatus === TestStatusType.InProgress && (
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor: '#38e1e8',
              opacity: selectedAnswer === '' ? 0.2 : 1.0,
            },
          ]}
          disabled={selectedAnswer === ''}
          onPress={() => {
            onPressAnswerNext && onPressAnswerNext();
          }}>
          <Text style={styles.textContinue}>
            {selectedAnswer === '' ? 'Continue' : 'CHECK ANSWER'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 30,
  },
  textContinue: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    backgroundColor: '#6792a6',
    borderRadius: 100,
    paddingVertical: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
