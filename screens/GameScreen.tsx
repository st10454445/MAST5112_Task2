import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;
type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

type Props = {
  route: GameScreenRouteProp;
  navigation: GameScreenNavigationProp;
};

const GameScreen: React.FC<Props> = ({ route, navigation }) => {
  const { playerName, difficulty, leaderboard } = route.params;

  const [equation, setEquation] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [hint, setHint] = useState<string | null>(null);

  // Difficulty settings
  const difficultySettings: Record<string, { time: number; scoreMultiplier: number }> = {
    Apprentice: { time: 30, scoreMultiplier: 1 },
    Wizard: { time: 20, scoreMultiplier: 2 },
    Sorcerer: { time: 15, scoreMultiplier: 3 },
  };

  useEffect(() => {
    if (difficulty in difficultySettings) {
      setTimeLeft(difficultySettings[difficulty].time); // Get time based on difficulty
    } else {
      console.warn(`Unknown difficulty: ${difficulty}`); // Log a warning for unknown difficulty
      setTimeLeft(30); // Fallback time
    }
    generateEquation();
    setIsTimerActive(true);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          handleEndGame();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [difficulty]);

  const generateEquation = () => {
    const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    let num1, num2;

    if (operator === '/') {
      num2 = Math.floor(Math.random() * 10) + 1; // Random number from 1 to 10
      const multiple = Math.floor(Math.random() * 10) + 1; // Random multiplier from 1 to 10
      const dividend = num2 * multiple; // Ensure the division yields a whole number
      setEquation(`${dividend} / ${num2}`);
    } else {
      num1 = Math.floor(Math.random() * 10) + 1; // Random number from 1 to 10
      num2 = Math.floor(Math.random() * 10) + 1; // Random number from 1 to 10
      setEquation(`${num1} ${operator} ${num2}`);
    }
  };

  const validateAnswer = () => {
    const correctAnswer = eval(equation); // Calculate the correct answer based on the equation
    if (parseInt(answer) === correctAnswer) {
      // If the answer is correct, update the score
      const newScore = score + 10 * (difficultySettings[difficulty]?.scoreMultiplier || 1);
      setScore(newScore); // Update the score state
      generateEquation(); // Generate a new equation
      setAnswer(''); // Clear the answer input
      setTimeLeft((prev) => Math.min(prev + 5, difficultySettings[difficulty]?.time || 30)); // Add time
    } else {
      Alert.alert('Incorrect!', 'Try again!'); // Alert for incorrect answer
      setAnswer(''); // Clear the answer input
      setTimeLeft((prev) => Math.max(prev - 5, 0)); // Deduct time
    }
  };

  const revealHint = () => {
    const correctAnswer = eval(equation);
    setHint(`Hint: The answer is ${correctAnswer}.`);
  };

  const handleEndGame = () => {
    // Update leaderboard with the new score
    const newLeaderboard = [...leaderboard, { name: playerName, score }];
    // Sort leaderboard
    newLeaderboard.sort((a, b) => b.score - a.score);
    // Keep only the top 3
    const updatedLeaderboard = newLeaderboard.slice(0, 3);

    navigation.navigate('Result', { score, playerName, leaderboard: updatedLeaderboard });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good Luck {playerName} !</Text>
      <Text style={styles.equation}>{equation}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter your answer"
        value={answer}
        onChangeText={setAnswer}
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit Answer" onPress={validateAnswer} />
        <TouchableOpacity onPress={revealHint} style={styles.powerUpButton}>
          <Text style={styles.powerUpText}>Reveal Hint</Text>
        </TouchableOpacity>
      </View>
      {hint && <Text style={styles.hint}>{hint}</Text>}
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      <Text style={styles.score}>Score: {score}</Text>
      {timeLeft === 0 && (
        <Button title="End Game" onPress={handleEndGame} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  equation: {
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  powerUpButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  powerUpText: {
    color: 'white',
  },
  hint: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
  timer: {
    fontSize: 18,
    marginTop: 20,
  },
  score: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default GameScreen;