import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViewHistory() {
  const { data } = useLocalSearchParams<{ data?: string }>();
  const extraction = data? JSON.parse(data) : null

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.extractedTextContainer}>
          <Text style={styles.titleText}>Simplified Text:</Text>
          <Markdown style={markdownStyles}>{extraction.simplified}</Markdown>

          <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
            <Text style={{ fontFamily: "Lexend_700Bold", fontSize: 30, color: "#f3e1e1ff" }}>
              Press play:
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => Speech.speak(extraction.simplified, { 
                language: "en-US",
                voice: "com.apple.ttsbundle.Samantha-compact", 
                rate: 0.85,
                pitch: 1.0,
                })}>
                <Ionicons name="play" size={42} color="#2963e2ff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Speech.stop()}>
                <Ionicons name="stop" size={42} color="#dfe1dfff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.extractedTextContainer}>
          <Text style={styles.titleText}>Original Text:</Text>
          <Markdown style={markdownStyles}>{extraction.original}</Markdown>

          <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
            <Text style={{ fontFamily: "Lexend_700Bold", fontSize: 30, color: "#f3e1e1ff" }}>
              Press play:
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => Speech.speak(extraction.original, { 
                language: "en-US",
                voice: "com.apple.ttsbundle.Samantha-compact", 
                rate: 0.95,
                pitch: 1.0,
                })}>
                <Ionicons name="play" size={42} color="#2963e2ff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Speech.stop()}>
                <Ionicons name="stop" size={42} color="#dfe1dfff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5EFE7",
  },
  titleText: {
    fontFamily: "Lexend_700Bold",
    fontSize: 34,
    color: "#f0ebebff",
    marginLeft: 20,
  },
  extractedTextContainer: {
    backgroundColor: "#252525ff",
    borderRadius: 12,
    marginTop: 40,
    padding: 20,
    width: 320,
  },
  extractedText: {
    color: "#d5c8c8ff",
    fontFamily: "Lexend_500Medium",
    fontSize: 18,
    padding: 15,
  },
});

const markdownStyles = {
  body: {
    color: "#e6e0e0ff",
    fontFamily: "Lexend_500Medium",
    fontSize: 17,
    lineHeight: 26,
  },
  heading3: {
    fontFamily: "Lexend_700Bold",
    fontSize: 22,
    marginVertical: 8,
    color: "#ffffff",
    lineHeight: 70,
  },
  strong: {
    fontFamily: "Lexend_700Bold",
    color: "#ffffff",
  },
  bullet_list: {
    marginLeft: 0,
  },
  list_item: {
    marginVertical: 5,
  },
};
