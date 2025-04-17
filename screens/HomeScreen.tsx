import React from "react";
import { View, StyleSheet } from "react-native";
import MediaEditor from "../components/MediaEditor";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MediaEditor />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
