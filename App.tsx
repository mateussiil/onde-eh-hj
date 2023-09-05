import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimelineScreen from './src/pages/TimelineScreen';

export default function App() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <TimelineScreen />
      </SafeAreaView>
    </>
  );
}