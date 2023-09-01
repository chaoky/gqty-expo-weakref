import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "./gqty/index";

export default function App() {
  const query = useQuery();
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {query.pokemon_v2_berry().map(({ name }) => (
        <Text>{name}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
