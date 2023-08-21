import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from 'react-native-safe-area-context';

import Navigation from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <RootSiblingParent> 
          <Navigation />
        </RootSiblingParent>
      </QueryClientProvider>
    </NavigationContainer>
  );
}