import { NavigatorScreenParams } from '@react-navigation/native';

type LeaderboardEntry = {
  name: string;
  score: number;
};

export type RootStackParamList = {
  Home: undefined; // No params on HomeScreen
  Game: {
    playerName: string;
    difficulty: string;
    leaderboard: LeaderboardEntry[]; // Array of leaderboard entries
  };
  Result: {
    score: number;
    playerName: string;
    leaderboard: LeaderboardEntry[]; // Array of leaderboard entries
  }; 
};