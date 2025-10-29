import { Lexend_400Regular, Lexend_500Medium, Lexend_700Bold, useFonts } from '@expo-google-fonts/lexend';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import useAsyncStorage from '../../hooks/useAsyncStorage';

export default function History(){

  const [history,setHistory,clearHistory] = useAsyncStorage("history",[])

  useFocusEffect(
    useCallback(() => {
      const loadHistory = async () => {
        const stored = await AsyncStorage.getItem("history");
        if (stored) setHistory(JSON.parse(stored));
      };

      loadHistory();
    }, [setHistory])
  );

  async function deleteSimplification(deletedId: string) {
    const updatedHistory= history.filter((simplification: any) => simplification.id !== deletedId)
    setHistory(updatedHistory)
    await AsyncStorage.setItem("history", JSON.stringify(updatedHistory))
  }

  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_700Bold
  });

  //If fonts don't load, return nothing
  if (!fontsLoaded) return null;
  
  return(
    <SafeAreaView style={styles.container}>

      <Text style={styles.titleText}>History</Text>
      {history.length>0 && <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear all history</Text>
      </TouchableOpacity>}

      <ScrollView>
        {history.map((extraction:any)=>(
          <View key={extraction.id} style={styles.historyCard}>

            <TouchableOpacity onPress={()=> router.push(`/history/${extraction.id}?data=${encodeURIComponent(JSON.stringify(extraction))}`)}>
              <Text style={styles.simplificationButtonText}>{extraction.id}</Text>
              <Text style={styles.tapToView}>Tap to view</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={()=>deleteSimplification(extraction.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>


    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"#F5EFE7"
  },
  titleText:{
    fontFamily:"Lexend_700Bold",
    fontSize:34
  },
  clearButton:{
    backgroundColor: "#bcb7b2ff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  clearButtonText:{
    fontFamily: "Lexend_500Medium",
    fontSize: 16,
    color: "#1C1B1B",
  },
  historyCard: {
    backgroundColor: "#f3f2edff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#dcd5d0",
    padding: 22,
    marginVertical: 12,
    width: 320,
    alignItems: "center",
  },
  simplificationButtonText: {
    fontSize: 22,
    fontFamily: "Lexend_500Medium",
    color: "#000000ff",
    textAlign: "center",
  },
  tapToView: {
    fontSize: 13,
    color: "#7b7b7b",
    textAlign: "center",
    marginTop: 6,
    fontFamily: "Lexend_400Regular",
  },
  deleteButton: {
    backgroundColor: "#FF6666",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginTop: 14,
  },
  deleteButtonText: {
    color: "#fff",
    fontFamily: "Lexend_700Bold",
    fontSize: 15,
  },
});