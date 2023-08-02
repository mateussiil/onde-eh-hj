import { StyleSheet, View } from "react-native";
import { TypePlace } from "./PlaceType";
import { AudienceType } from "./AudienceType";

export function Details() {
  return (
    <View style={styles.container}>
      <TypePlace/>
      <AudienceType/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})