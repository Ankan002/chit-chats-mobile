/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Socket } from 'socket.io-client';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: undefined;
  Profile: undefined;
  UpdateUsername: undefined;
  UpdateTagline: undefined;
  UpdateProfilePic: undefined;
  UserSearch: undefined;
  CreateGroup: undefined;
  SingleChat: undefined;
  GroupChat: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
  Group: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type UserType = {
  __v?: number;
  _id?: string;
  createdAt?: string;
  email?: string;
  image?: string;
  name?: string;
  notification?: Array<string | null>;
  pinnedChats?: Array<any>;
  providerId?: string;
  updatedAt?: string;
  username?: string;
  tagline?: string;
}

export type SearchedUserType = {
  __v?: number;
  _id?: string;
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  tagline?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type LatestMessageType = {
  __v: number;
  _id: string;
  sender: string;
  content: string;
  chat: string;
  media?: string;
  replyingTo?: string;
}

export type SingleChatType = {
  __v?: number;
  _id?: string;
  chatName: string;
  isGroupChat: boolean;
  createdAt: string;
  updatedAt: string;
  users: Array<SearchedUserType>;
  latestMessage?: LatestMessageType;
}

export type GroupChatType = {
  __v?: number;
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  createdAt: string;
  updatedAt: string;
  users: Array<SearchedUserType>;
  groupAdmin: SearchedUserType;
  groupImage: string;
  latestMessage?: LatestMessageType
}

export type FetchedMessageSenderType = {
  _id: string;
  name: string;
  username: string;
  image: string;
}

export type FetchedMessageChatType = {
  __v: number;
  _id: string;
  chatName: string;
  isGroupChat: string;
  users: Array<string>;
  groupAdmin: string;
  groupImage: string;
  createdAt: string;
  updatedAt: string;
  latestMessage?: string;
}

export type FetchedMessageType = {
  __v: number;
  _id: string;
  sender: FetchedMessageSenderType;
  content: string;
  media?: string;
  replyingTo?: string;
  createdAt: string;
  updatedAt: string;
  chat: string;
}

export type GroupSentMessageType = {
  __v: number;
  _id: string;
  sender: FetchedMessageSenderType;
  createdAt: string;
  updatedAt: string;
  content: string;
  media?: string;
  chat: GroupChatType;
}

export type SingleSentMessageType = {
  __v: number;
  _id: string;
  sender: FetchedMessageSenderType;
  createdAt: string;
  updatedAt: string;
  content: string;
  media?: string;
  chat: SingleChatType;
}

export type SocketInstance = {
  socket?: Socket
}
