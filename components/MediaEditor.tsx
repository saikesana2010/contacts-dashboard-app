import React, { useRef, useState } from "react";
import {
  View,
  Image,
  PanResponder,
  Animated,
  TextInput,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const MediaEditor = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [size, setSize] = useState({ width: 150, height: 150 });
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("10");
  const [mediaUri, setMediaUri] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // or Videos if needed
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* Left Panel */}
      <View style={styles.sidebar}>
        <Text style={styles.label}>Width</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={size.width.toString()}
          onChangeText={(text) => setSize({ ...size, width: parseInt(text) || 0 })}
        />

        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={size.height.toString()}
          onChangeText={(text) => setSize({ ...size, height: parseInt(text) || 0 })}
        />

        <Text style={styles.label}>Start Time</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={startTime}
          onChangeText={setStartTime}
        />

        <Text style={styles.label}>End Time</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={endTime}
          onChangeText={setEndTime}
        />

        <Button title="Upload Image" onPress={pickImage} />
      </View>

      {/* Canvas */}
      <View style={styles.canvas}>
        {mediaUri && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              pan.getLayout(),
              {
                width: size.width,
                height: size.height,
                position: "absolute",
              },
            ]}
          >
            <Image
              source={{ uri: mediaUri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default MediaEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 150,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  label: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  canvas: {
    flex: 1,
    backgroundColor: "#e4e4e4",
  },
});
