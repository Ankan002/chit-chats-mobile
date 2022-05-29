import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import { GroupChatType, RootStackParamList, RootTabParamList, SearchedUserType, SingleChatType, UserType } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';
import LoginScreen from '../screens/Login';
import {isAuthenticatedAtom} from "../atom";
import { useRecoilState } from 'recoil';
import { verifyIfAuthenticated } from '../helpers/verify-authenticated';
import { isDarkModeAtom } from '../atom';
import { getLastTheme } from '../helpers/is-dark-mode';
import LightNavigatorTheme from '../theme/LightNavigatorTheme';
import DarkNavigatorTheme from '../theme/DarkNavigatorTheme';
import { userLoadingAtom } from '../atom/userLoadingAtom';
import { userAtom } from '../atom/userAtom';
import { fetchUser } from "../helpers/fetch-user";
import ProfileScreen from '../screens/Profile';
import UpdateUsernameScreen from '../screens/UpdateUsername';
import UpdateTaglineScreen from '../screens/UpdateTagline';
import UpdateProfilePicScreen from '../screens/UpdateProfilePic';
import GroupScreen from "../screens/Group";
import UserSearchScreen from '../screens/UserSearch';
import CreateGroupScreen from "../screens/CreateGroup";
import SingleChatScreen from '../screens/SingleChat';
import GroupChatScreen from "../screens/GroupChat";
import { chatsLoadingAtom } from "../atom/chatsLoadingAtom";
import { singleChatsAtom } from "../atom/singleChatsAtom";
import { groupChatsAtom } from "../atom/groupChatsAtom";
import { fetchChats } from "../helpers/fetch-chats";
import { toastMessage } from '../helpers/toast-message/toast-message';
import { serializeChats } from "../helpers/serialize-chats";

export default function Navigation() {

  const [ isAuthenticated, setIsAuthenticated ] = useRecoilState<boolean>(isAuthenticatedAtom);
  const [ isDarkMode, setIsDarkMode ] = useRecoilState<boolean>(isDarkModeAtom);

  useEffect(() => {
    const onLoadEvents = async () => {
      const hasToken = await verifyIfAuthenticated();
      setIsAuthenticated(hasToken);
      const lastMode = await getLastTheme();
      setIsDarkMode(lastMode);
    };
    onLoadEvents();
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={isDarkMode ? DarkNavigatorTheme : LightNavigatorTheme}
    >
      {
        (isAuthenticated) ? (
          <RootNavigator />
        ) : (
          <AuthenticationNavigator />
        )
      }
    </NavigationContainer>
  );
}


const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthenticationNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function RootNavigator() {

  const [isUserLoading, setIsUserLoading] = useRecoilState<boolean>(userLoadingAtom);
  const [user, setUser] = useRecoilState<UserType>(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState<boolean>(isAuthenticatedAtom);
  const [isChatsLoading, setIsChatsLoading] = useRecoilState<boolean>(chatsLoadingAtom);
  const [singleChats, setSingleChats] = useRecoilState<Array<SingleChatType>>(singleChatsAtom);
  const [groupChats, setGroupChats] = useRecoilState<Array<GroupChatType>>(groupChatsAtom);

  useEffect(() => {
    const onFetchUser = async() => {
      const fetchedUser = await fetchUser(isUserLoading, setIsUserLoading);
      if(!fetchedUser?.success){
        setIsAuthenticated(false);
        return;
      }

      setUser(fetchedUser.user);
    };

    const onFetchChats = async() => {
      const response = await fetchChats(isChatsLoading, setIsChatsLoading);

      if(!response.success){
        toastMessage("error", "Error Occurred", response.error);
        return
      }

      serializeChats(response.chats, setSingleChats, setGroupChats, isChatsLoading, setIsChatsLoading);
    }
 
    if(isAuthenticated) {
      onFetchUser();
      onFetchChats();
    }
  }, [isAuthenticated]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
      <Stack.Screen name="UpdateUsername" component={UpdateUsernameScreen} options={{headerShown: false}} />
      <Stack.Screen name="UpdateTagline" component={UpdateTaglineScreen} options={{headerShown: false}} />
      <Stack.Screen name="UpdateProfilePic" component={UpdateProfilePicScreen} options={{headerShown: false}} />
      <Stack.Screen name="UserSearch" component={UserSearchScreen} options={{headerShown: false}} />
      <Stack.Screen name="CreateGroup" component={CreateGroupScreen} options={{headerShown: false}} />
      <Stack.Screen name="SingleChat" component={SingleChatScreen} options={{headerShown: false}} />
      <Stack.Screen name="GroupChat" component={GroupChatScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#FC5A31",
        tabBarInactiveTintColor: "#ADB4C1",
        tabBarShowLabel: false
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="chatbox-ellipses-outline" size={30} color={color} />,
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name="Group"
        component={GroupScreen}
        options={{
          title: 'Group',
          tabBarIcon: ({ color }) => <FontAwesome name="group" size={30} color={color} />,
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={30} color={color} />,
          headerShown: false
        }}
      />
    </BottomTab.Navigator>
  );
}
