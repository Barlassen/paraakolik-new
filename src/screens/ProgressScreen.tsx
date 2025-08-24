import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Progress Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111815",
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default ProgressScreen;
