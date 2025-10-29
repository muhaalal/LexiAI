import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from "../../firebaseConfig";



export default function LoginScreen(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [hidePassword,setHidePassword]=useState(true)

    function viewPassword(){

      const currentPassword = password
      setHidePassword(!hidePassword)
    }

    async function loginUser(){

      //If the user didn't enter an email or password, it sends an alert

        if(!email || !password){
            Alert.alert(`Please enter both an email and password`)
            return;
        }
        try{
            //Sends the email and password to firebase auth services, 
            // the services then check if the user exists, and if it does, it returns an object 
            // Object holds information such as user data, providerID, opertation type
            const userCredential= await signInWithEmailAndPassword(auth, email, password)

            //UserCrediential is a object that holds various keys, including user which holds data such as email, password, etc
            const user=userCredential.user

            Alert.alert(`Welcome back, ${user.email}`)
            router.replace("/(tabs)") //After a sucessful login, it navigates the user to the home screen (the main tab layout)

        } catch(err:any){
            const errCode=err.code.replace("auth/","") //Err is an object that has keys such as code which holds the error message. Replacing "auth" with blank makes a nicer error message
            Alert.alert(`Error: ${errCode}`)
        }
    }

    return(
        <SafeAreaView style={styles.container} >

           {/* Removes the header at top for this screen */}
          <Stack.Screen options={{headerShown:false}}></Stack.Screen>

          <Image 
            source={require('../../assets/images/lexiai-logo.png')} 
            style={{width:120,height:120,borderRadius:12,borderColor:"#efeeedff",borderWidth:0.5,marginTop:10}}
          
          />


            <View style={{marginTop:50}}>
                <Text style={styles.text} >Welcome back to Lexi AI!</Text>
            </View>

            {/* Container holding email input box, password input box, login button, and forgot password, and sign up */}
            <View style={{marginTop:45}}>
                {/* Email input box */}
                <View>
                    <Text style={styles.topInputText}>Email address</Text>
                    <TextInput
                        placeholder='john@example.com'
                        placeholderTextColor="#868686ff"
                        style={styles.inputBox}
                        onChangeText={setEmail}
                    ></TextInput>
                </View>

                {/* Password input box */}
                <View style={{marginTop:25}}>
                    <Text style={styles.topInputText}>Password</Text>
                    <View>
                      <TextInput
                          value={password}
                          placeholder='Example123'
                          placeholderTextColor="#868686ff"
                          style={styles.inputBox}
                          onChangeText={setPassword}
                          secureTextEntry={hidePassword}
                      ></TextInput>
                      <TouchableOpacity onPress={viewPassword}>
                        <Ionicons style={styles.icon}name={hidePassword? "eye-off" : "eye"} size={24} color="#gray"/>
                      </TouchableOpacity>
                    </View>
                </View>

                {/* Login button */}
                <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>


                {/* if users don't have an account, they can click on this button and go to the sign up screen */}
                <View style={styles.signUpMessageContainer}>
                  <Text style={styles.accountPrompt}>Don't have an account? </Text>
                  <TouchableOpacity onPress={()=>(router.replace("/(auth)/signUpScreen"))}>
                    <Text style={[styles.signUpText]}>Sign up</Text>
                  </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"#f5efe9ff"
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 25,
    fontFamily: "Lexend_700Bold",
    padding: 10,
    color:"#1A1A1A"
  },
  topInputText:{
    fontSize: 20,
    fontFamily: "Lexend_700Bold",
    padding: 10,
    color:"#1A1A1A"
  },
  inputBox:{
    width:`100%`,
    fontSize:20,
    paddingLeft:10,
    paddingVertical:10,
    borderRadius:14,
    borderWidth:0.2,
    borderColor:"#000000ff",
    backgroundColor:"#e1e1e1ff",
    color:"#131111ff",
    fontFamily: "Lexend_500Medium",
  },
  loginButton:{
    marginTop:25,
    padding:15,
    paddingLeft:115,
    borderRadius:12,
    backgroundColor:"#0152f2ff",
  },
  loginButtonText:{
    fontSize:22,
    fontFamily:"Lexend_700Bold",
    color:"#FAF7F2"
  },
  signUpMessageContainer:{
    alignItems:"center",
    marginTop:150,
    flexDirection:"row",
    marginLeft:20
  },
  accountPrompt:{
    fontSize:18,
    fontFamily:"Lexend_700Bold",
    color:"#000000ff"
  },
  signUpText:{
    fontSize:18,
    fontFamily:"Lexend_700Bold",
    color:"#0f85d8ff",
    textDecorationLine:"underline"
  },
  icon: {
    position: "absolute",
    right: 10,
    transform: [{ translateY: -32 }], // centers icon vertically
  }
});