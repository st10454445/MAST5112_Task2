import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;
type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;

type Props = {
  route: ResultScreenRouteProp;
  navigation: ResultScreenNavigationProp;
};

const ResultScreen: React.FC<Props> = ({ route, navigation }) => {
    const { score, playerName, leaderboard } = route.params;

    console.log('Received Props in ResultScreen:', route.params); // Log received props

    const handlePlayAgain = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thanks for playing! Try again?</Text>
            <Text style={styles.score}>Your Score: {score}</Text>
            <Text style={styles.playerName}>{playerName}</Text>

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

            <Button title="Play Again" onPress={handlePlayAgain} />
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
  score: {
    fontSize: 18,
    marginTop: 10,
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
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

export default ResultScreen;