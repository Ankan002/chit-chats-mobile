import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

import {RecoilRoot} from 'recoil';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <SafeAreaProvider>
          <StatusBar style='dark' />
          <Navigation />
        </SafeAreaProvider>
      </RecoilRoot>
    );
  }
}
