import { StyleSheet, View } from "react-native";
import { TypePlace } from "./TypePlace";
import { TypeAudience } from "./TypeAudience";

export function Details() {
  return (
    <View style={styles.container}>
      <TypePlace/>
      <TypeAudience/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})