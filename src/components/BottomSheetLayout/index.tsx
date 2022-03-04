import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import {TestStatusType, QuestionsProps} from '../../types/question-types';

export const BottomSheetLayout = ({
  questions,
  questionIndex = 0,
  testStatus,
  correctFit,
  onNextQuestion,
}: QuestionsProps) => {
  const RBSheetRef = useRef<any>();

  useEffect(() => {
    if (testStatus === TestStatusType.InProgress) {
      RBSheetRef.current.close();
    } else if (testStatus === TestStatusType.Complete) {
      RBSheetRef.current.open();
    }
  }, [testStatus]);

  return (
    <RBSheet
      closeOnDragDown={false}
      closeOnPressMask={false}
      ref={RBSheetRef}
      height={150}
      openDuration={250}
      customStyles={{
        container: {
          alignItems: 'center',
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          justifyContent: 'space-evenly',
          backgroundColor: correctFit ? '#38e1e8' : '#f97788',
        },
      }}>
      <View style={styles.container}>
        <View style={styles.bottomTitleContainer}>
          {correctFit ? (
            <Text style={styles.textGreatJob}>Great Job!</Text>
          ) : (
            <View style={styles.rowContainer}>
              <Text style={styles.textGreatJob}>Answer: {''}</Text>
              <Text style={styles.textGreatJob}>
                {questions && questions[questionIndex].de.answer}
              </Text>
            </View>
          )}
          <Image
            source={require('../../assets/image/flag.png')}
            style={styles.flag}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            onNextQuestion && onNextQuestion();
          }}
          style={styles.buttonContainer}>
          <Text
            style={[
              styles.textContinue,
              {color: correctFit ? '#38e1e8' : '#f97788'},
            ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContinue: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingVertical: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bottomTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  flag: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  textGreatJob: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
});
