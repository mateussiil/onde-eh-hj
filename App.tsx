import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimelineScreen from './src/pages/TimelineScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <TimelineScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
}