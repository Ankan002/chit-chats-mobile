import { View, Text, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { darkStyles, lightStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { userAtom } from "../../atom";
import { useRoute } from "@react-navigation/core";
import NavigationHeader from "../../components/NavigationHeader";
import type { UserType } from "../../types";
import ProfileHeader from "../../components/ProfileHeader";

const Profile = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const route = useRoute<any>();
  const { userId } = route.params;
  
  const loggedInUser = useRecoilValue<UserType>(userAtom);
  const [currentUser, setCurrentUser] = useState<UserType>({});

  useEffect(() => {
    if (!userId) return;

    if (userId === loggedInUser._id) setCurrentUser(loggedInUser);
  }, [userId]);

  return (
    <SafeAreaView
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      <NavigationHeader />
      {Object.keys(currentUser).length > 0 && (
        <ProfileHeader
          image={currentUser.image ?? ""}
          name={currentUser.name ?? ""}
          username={currentUser?.username ?? ""}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
