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
  const { userId } = route.params;

  const loggedInUser = useRecoilValue<UserType>(userAtom);
  const [currentUser, setCurrentUser] = useState<UserType>({});

  useEffect(() => {
    if (!userId) return;

    if (userId === loggedInUser._id) setCurrentUser(loggedInUser);

    //TODO: Perform loading of user and show activity indicator if the user is not the same
  }, [userId]);

  return (
    <SafeAreaView
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      <NavigationHeader loading={false} />
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
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
