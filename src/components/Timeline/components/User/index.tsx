import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type UserTimelineItem = {
  username: string
  imageSource: string
}

const UserTimelineItem = ({ username, imageSource }: UserTimelineItem) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://www.fakepersongenerator.com/Face/male/male2015108621745960.jpg" }} style={styles.image} />
      <Text style={styles.username}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});



export default UserTimelineItem;