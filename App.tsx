import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

import {RecoilRoot} from 'recoil';
import Toast from "react-native-toast-message"
import { toastConfig } from "./config";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <SafeAreaProvider>
          <StatusBar style='light' />
          <Navigation />
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </RecoilRoot>
    );
  }
}
