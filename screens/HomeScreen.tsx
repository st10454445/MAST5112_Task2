import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { Picker } from '@react-native-picker/picker';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type LeaderboardEntry = {
  name: string;
  score: number;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [playerName, setPlayerName] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('Apprentice');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Placeholder data for leaderboard
  const mockLeaderboard = [
    { name: 'Ben', score: 100 },
    { name: 'Jess', score: 85 },
    { name: 'Amy', score: 75 }
  ];

  useEffect(() => {
    setLeaderboard(mockLeaderboard);
  }, []);

  const handleStartTraining = () => {
    if (playerName) {
      navigation.navigate('Game', { playerName, difficulty, leaderboard });
    } else {
      alert('Please enter your name to start the game.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Arithmetica's Magical Training</Text>
      <Text style={styles.label}>Help her become the top student by shaperpening her magical arithmetic skills!</Text>

      {/* Input for Player's Name */}
      <TextInput
        style={styles.input}
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="Enter your name"
      />

      {/* Difficulty Picker */}
      <Text style={styles.label}>Select Difficulty:</Text>
      <Picker
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Apprentice" value="Apprentice" />
        <Picker.Item label="Wizard" value="Wizard" />
        <Picker.Item label="Sorcerer" value="Sorcerer" />
      </Picker>

      {/* Start Training Button */}
      <Button title="Start Training" onPress={handleStartTraining} />

      {/* Leaderboard Section */}
      <Text style={styles.leaderboardTitle}>Leaderboard:</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.leaderboardText}>
              {item.name}: {item.score} pts
            </Text>
          </View>
        )}
      />
    </View>
  );
};

// Styles
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
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 20,
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  leaderboardItem: {
    marginBottom: 5,
  },
  leaderboardText: {
    fontSize: 18,
  },
});
export default HomeScreen;