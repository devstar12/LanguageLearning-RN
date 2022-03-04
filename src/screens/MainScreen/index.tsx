import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {QuestionLayout} from '../../components/QuestionsLayout';
import {AnswersLayout} from '../../components/AnswersLayout';
import {AnswerLayout} from '../../components/AnswerLayout';
import {FooterLayout} from '../../components/FooterLayout';
import {BottomSheetLayout} from '../../components/BottomSheetLayout';
import {TestStatusType, Questions} from '../../types/question-types';

export const MainScreen: React.FC = () => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(-1);
  const [selectedAnswer, setAnswer] = useState<string>('');
  const [testStatus, setTestStatus] = useState<TestStatusType>(
    TestStatusType.Ready,
  );
  const [correctFit, setCorrectFit] = useState<boolean>(false);
  const {height: WINDOW_HEIGHT} = useWindowDimensions();

  // Sing in
  useEffect(() => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
        getQuestions();
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!questions || questions?.length < 1) {
      initQuestion();
    } else {
      onStart();
    }
  }, [questions]);

  // onSnapShot
  const getQuestions = () => {
    const unsubscribe = firestore()
      .collection('QUESTION')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot?.docs?.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
          };
        });

        setQuestions(threads || []);
      });

    return () => {
      unsubscribe();
    };
  };

  const initQuestion = () => {
    setAnswer('');
    setCorrectFit(false);
    setTestStatus(TestStatusType.Ready);
    setQuestionIndex(-1);
  };

  const onStart = () => {
    setAnswer('');
    setCorrectFit(false);
    setTestStatus(TestStatusType.InProgress);
    setQuestionIndex(0);
  };

  const onNextQuestion = () => {
    setAnswer('');
    setCorrectFit(false);
    setTestStatus(TestStatusType.InProgress);
    if (questionIndex > questions?.length - 2) {
      Alert.alert('Finished', 'Start again!', [
        {
          text: 'Ok',
          onPress: () => {
            onStart();
          },
        },
      ]);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const onPressAnswer = (answer: string) => {
    setAnswer(answer);
    setCorrectFit(questions[questionIndex].de.answer === answer);
  };

  const onPressAnswerNext = () => {
    setTestStatus(TestStatusType.Complete);
  };

  if (questionIndex < 0) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text style={styles.textAnswer}>No question data</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {flexDirection: 'column-reverse'}]}>
      <View style={[styles.body, {height: WINDOW_HEIGHT * 0.8}]}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Fill in the missing word</Text>
            <QuestionLayout
              questions={questions}
              questionIndex={questionIndex}
            />
            <AnswerLayout
              questions={questions}
              questionIndex={questionIndex}
              testStatus={testStatus}
              selectedAnswer={selectedAnswer}
              correctFit={correctFit}
            />
            <AnswersLayout
              questions={questions}
              questionIndex={questionIndex}
              testStatus={testStatus}
              selectedAnswer={selectedAnswer}
              onPressAnswer={onPressAnswer}
            />
          </ScrollView>
        </View>
        <FooterLayout
          testStatus={testStatus}
          selectedAnswer={selectedAnswer}
          onStart={onStart}
          onPressAnswerNext={onPressAnswerNext}
        />
        <BottomSheetLayout
          questions={questions}
          questionIndex={questionIndex}
          testStatus={testStatus}
          correctFit={correctFit}
          selectedAnswer={selectedAnswer}
          onNextQuestion={onNextQuestion}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 30,
  },
  body: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#406d82',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  textAnswer: {
    fontSize: 18,
    color: '#406d82',
    textAlign: 'center',
    fontWeight: '500',
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
