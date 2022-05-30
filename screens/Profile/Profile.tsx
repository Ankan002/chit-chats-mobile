import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { darkStyles, lightStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { userAtom } from "../../atom";
import { useRoute } from "@react-navigation/core";
import NavigationHeader from "../../components/NavigationHeader";
import type { UserType } from "../../types";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileBody from "../../components/ProfileBody";

const Profile = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const route = useRoute<any>();
  const { user } = route.params;

  const loggedInUser = useRecoilValue<UserType>(userAtom);
  const [currentUser, setCurrentUser] = useState<UserType>({});
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!user) return;

    setCurrentUser(user);

  }, [user]);

  return (
    <SafeAreaView
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      <NavigationHeader loading={isConnecting} />
      {Object.keys(currentUser).length > 0 && (
        <View
          style={isDarkMode ? darkStyles.PageSection : lightStyles.PageSection}
        >
          <ProfileHeader
            image={currentUser.image ?? ""}
            name={currentUser.name ?? ""}
            username={currentUser?.username ?? ""}
          />

          <View
            style={
              isDarkMode ? darkStyles.BodySection : lightStyles.BodySection
            }
          >
            <ProfileBody
              email={currentUser.email ?? ""}
              tagline={currentUser.tagline ?? ""}
              loggedInUserId={loggedInUser._id ?? ""}
              idQueried={currentUser._id ?? ""}
              isConnecting={isConnecting}
              setIsConnecting={setIsConnecting}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
