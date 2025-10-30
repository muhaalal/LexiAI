import { Lexend_400Regular, Lexend_500Medium, Lexend_700Bold, useFonts } from '@expo-google-fonts/lexend';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";
import * as Speech from "expo-speech";
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAsyncStorage from '../../hooks/useAsyncStorage';


export default function HomeScreen() {

  const [image, setImage] = useState<string | null>(null);


  async function takeImage() {
    // Ask for permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    // If user didn't cancel
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  //Choose image function
  async function pickImage() {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch the picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // only images
      allowsEditing: true, // crop option
      aspect: [10, 10],
      quality: 1,
      base64: true, // add this if you’ll send to OCR API
    });

    // If user didn't cancel
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  //OCR and AI values
  const [text,setText]=useState<string>("")
  const [loading,setLoading]=useState<boolean>(false)

  const [aiText,setAiText]=useState<string>("")
  const [aiLoading,setAiLoading]=useState<boolean>(false)

  const [done,setDone]=useState<boolean>(false)

  const [history,setHistory]= useAsyncStorage("history",[])

  const ocr_space_api_key="YOUR-API-KEY"
  const CHATGPT_API_KEY= "YOUR-API-KEY"

  async function extractAndSimplify(){
    
    setText("")
    setAiText("")
    setDone(false)

    try{

      setLoading(true)

      //Form data to send to ocr space
      const form = new FormData();
      form.append("file", {
        uri: image,
        name:"photos.jpg",
        type:"image/png"
      }as any)

      form.append("language","eng")
      form.append("OCREngine","2")
      form.append("scale","true")
      form.append("apikey",ocr_space_api_key)

      //Posting the image to ocr to extract the image
      let response = await fetch(`https://api.ocr.space/parse/image`,{
        method:"POST",
        body:form
      })

      if(!response.ok) throw new Error(`HTTPS: ${response.status}`)

      //Turns JSON data to readable data such as array, strings, etc.
      const data= await response.json()

      //Sets the variable parsed to the extracted text
      const parsed = data?.ParsedResults?.[0]?.ParsedText?.trim();
      if (!parsed) throw new Error("No text detected.");
      setText(parsed)

      //Posting the extracted text to OpenAI to simplify it
      setAiLoading(true)

      //OpenAI API call
      
      //Sending the extracted text to OpenAI to simplify
      const aiResponse= await fetch("https://api.openai.com/v1/responses",{
          headers:{
              "Content-Type":"application/json",
              "Authorization" : `Bearer ${CHATGPT_API_KEY}`
          },
          method:"POST",
          body: JSON.stringify({
              model:"gpt-4o-mini",
              input: `Rewrite this text for dyslexic and ADHD readers. Use only these markdown elements:   
              - ### for section titles
              - bullet points (-) for lists
              - **bold** for key terms
                Output rules (very important):
              - Use ONLY these markdown elements: "###" headings, "-" bullets, **bold**, plain paragraphs.
              - No code blocks, tables, blockquotes, images, links, numbered lists, or nested lists.
              - Use the ASCII hyphen "-" for bullets (no • — or other symbols).
              - Keep each bullet to one short sentence (8–18 words). No manual line breaks inside a bullet.
              - Keep each heading under 60 characters. Sentence case (No ALL CAPS).
              - Put a single blank line between blocks (between a heading and the following list/paragraph).
              - Don’t insert extra blank lines inside lists.
              - Do not wrap lines manually; let the renderer wrap them.
              - Start with a "###" heading, then bullets. End with no trailing notes.
              Do not use numbered lists, code blocks, or tables. 
              Keep the language simple, short, and easy to follow.
              Text: ${parsed}`
          })
      })

      //Checking if response is ok
      if(!aiResponse.ok) throw new Error(`HTTP ${aiResponse.status}`)

      //Getting the ai data from json
      const aiData = await aiResponse.json()
      const aiOutput= aiData.output[0].content[0].text.trim()
      if(!aiOutput) throw new Error(`Unable to simplify data`)
      
      //Setting the simplified text
      setAiText(aiOutput)


      const stored = await AsyncStorage.getItem("history"); 
      const currentHistory = stored ? JSON.parse(stored) : []; 

      const newEntry = {
        id: `Simplification ${currentHistory.length + 1}`,
        original: parsed,
        simplified: aiOutput,
      };

      const updatedHistory = [...currentHistory, newEntry]; 

      setHistory(updatedHistory)


    } catch(err){
      Alert.alert(`${err}`)
    } finally{
      setLoading(false)
      setAiLoading(false)
      setDone(true)
    }
  }

  function extractNewImage(){

    //When the user clicks the extract new button, it clears previous text and images, stops any ongoing text to speeches and sets the done to false which makes the upload image, camera, and extraction buttons reappear 
    setText("") 
    setAiText("")
    setDone(false)
    setImage(null)
    Speech.stop()
  }


  //Getting fonts
  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_700Bold
  });

  //If fonts don't load, return nothing
  if (!fontsLoaded) return null;


  return(
    <SafeAreaView style={styles.container}>
      <ScrollView  contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingHorizontal:15, }}>
          {!done && (
            <View style={styles.container}>
            {/* Title */}
          <View>
            <Text style={styles.titleText}>Scan text</Text>
          </View>

          {/* Page description */}
          <View>
            <Text style={styles.titleDescription}>Extract and simplify an image</Text>
          </View>

          {/* Container that holds the open camera button and upload an image button */}
          <View style={styles.captureAndUploadContainer}>

            {/* Open camera button */}
            <TouchableOpacity style={styles.button} onPress={takeImage}>
              <View style={styles.buttonTextContainer}>
                <Ionicons name="camera-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>Open camera</Text>
              </View>
            </TouchableOpacity>

            {/* "OR" text */}
            <View style={{alignItems:'center'}}>
              <Text style={{fontFamily:"Lexend_500Medium",fontSize:20}}> OR</Text>
            </View>

            {/* Upload an image button */}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <View style={styles.buttonTextContainer}>
                <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>Upload an image</Text>
              </View>
            </TouchableOpacity>

          </View>

          {/* If image uploaded, then show the selected image preview and button to extract and simplify*/}
          {image && (
            <View style={styles.previewContainer}>
              <Text style={styles.previewTitle}>Selected image:</Text>
              <Image source={{ uri: image }} style={styles.previewImage} />

              {/* Button to extract and simplify image. */}
              <TouchableOpacity style={styles.button} onPress={extractAndSimplify} disabled={loading || aiLoading}>
                <View style={styles.buttonTextContainer}>
                  <Ionicons name="document-text-outline" size={24} color="#fff" />
                  <Text style={styles.buttonText}>Extract image</Text>
                </View>
              </TouchableOpacity>

            </View>
          )}

          {/* If OCR is extracting, it lets the user know the status */}
          {loading && !aiLoading && (
            <View style={{flexDirection:"row",alignContent:"center"}}>
               <ActivityIndicator size={`small`} color ={"#333"}/>
              <Text style={[styles.loadingMessage,{marginLeft:10}]}>Extracting text...</Text>
            </View>
          )}

          {/* Informs the user of the simplifying status */}
          {aiLoading && (
            <View style={{flexDirection:"row",alignContent:"center"}}>
              <ActivityIndicator size={`small`} color ={"#333"}/>
              <Text style={[styles.loadingMessage,{marginLeft:10}]}>Simplifying text...</Text>
            </View>
          )}           
            </View>
          )}
          
          {done && text && aiText &&(
            <View>

              {/* Container that holds the simplified text and a button to listen to it*/}
              <View style={styles.extractedTextContainer}>
                <Text style={styles.extractedText}>Simplified Text:</Text>
                <Markdown style={markdownStyles}>{aiText}</Markdown>
                <View style={{flexDirection:"column", justifyContent:"center",alignItems:"center",marginTop:10}}>
                <Text style={{fontFamily:"Lexend_700Bold",fontSize:30,color:"#f3e1e1ff",marginTop:60}}>Press play: </Text>
                {/* This container is to key the buttons together */}
                <View style={{flexDirection:"row"}}>
                  <TouchableOpacity onPress={()=>Speech.speak(aiText,{
                    language: "en-US",
                    voice: "com.apple.ttsbundle.Samantha-compact", 
                    rate: 0.85,
                    pitch: 1.0,
                    })}> 
                    <Ionicons name="play" size={42} color="#2963e2ff" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>(Speech.stop())}> 
                    <Ionicons name="stop" size={42} color="#dfe1dfff" />
                  </TouchableOpacity>
                </View>
                </View>
              </View>

            </View>
          )}

          {done && <TouchableOpacity style={styles.button} onPress={extractNewImage}>
            <View style={styles.buttonTextContainer}>
              <Ionicons name="document-text-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Extract new image</Text>
            </View>
          </TouchableOpacity>}
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
  titleDescription:{
    fontFamily:"Lexend_500Medium",
    fontSize:16
  },
  captureAndUploadContainer:{
    backgroundColor:"#ece6e0",
    borderRadius:12,
    borderWidth:1,
    borderColor:"#ddd3cb",
    marginTop:45,
    paddingHorizontal:40,
    paddingVertical:25
  },
  button: {
    borderRadius: 12,
    backgroundColor: "#3A6EE8",
    margin:15
  },
  buttonTextContainer:{
    flexDirection:"row",
    alignItems:"center",
    paddingLeft:10
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Lexend_500Medium",
    padding: 12,
    color:"#f6ebebff"
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  previewTitle: {
    fontFamily: "Lexend_700Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  previewImage: {
    width: 300,       
    height: 220,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    resizeMode: "cover", 
  },
  loadingMessage:{
    fontSize:14,
    fontFamily:"Lexend_500Medium"
  },
  extractedTextContainer:{
    backgroundColor:"#252525ff",
    borderRadius:12,
    marginTop:40,
    padding:20,
    width:300
  },
  extractedText:{
    color:"#d5c8c8ff",
    fontFamily:"Lexend_500Medium",
    fontSize:18,
    padding:15,
  },
});
const markdownStyles = {
  body: {
    color: "#e6e0e0ff",
    fontFamily: "Lexend_500Medium",
    fontSize: 17,
    lineHeight:26,
  },
  heading3: {
    fontFamily: "Lexend_700Bold",
    fontSize: 22,
    marginVertical: 8,
    color: "#ffffff",
    lineHeight:70,
  },
  strong: {
    fontFamily: "Lexend_700Bold",
    color: "#ffffffef",
  },
  bullet_list: {
    marginLeft: 0,
  },
  list_item: {
    marginVertical: 5,
  },
};