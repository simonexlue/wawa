import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientText from "../components/ui/GradientText";
import { Fonts } from "../constants/fonts";
import { useState } from "react";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    async function handleSignIn() {
        if(!email.trim() || !password.trim()) {
            Alert.alert("Missing Fields", "Please enter your email and password.")
            return;
        }

        try {
            setIsLoggingIn(true)

            const {error} = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password
            })

            if(error) {
                Alert.alert("Login Failed", error.message)
                return;
            }

            router.replace("/create-profile")
        } catch(error) {
            console.log(error)
            Alert.alert("Login Failed", "Something went wrong.")
        } finally {
            setIsLoggingIn(false)
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <GradientText 
                text="Welcome back"
                colors={["#005BFF", "#00D4FF"]}
                fontSize={40}
                fontFamily={Fonts.bold}
                width={500}
            />
            <Text style={styles.subtitle}>
                Pick up right where you left off
            </Text>


            <Text style={styles.inputLabel}>
                EMAIL
            </Text>
            <TextInput 
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com" 
                style={styles.textInput}
                autoComplete="email"
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Text style={styles.inputLabel}>
                PASSWORD
            </Text>
            <TextInput 
                value={password}
                onChangeText={setPassword}
                placeholder="********" 
                style={styles.textInput}
                secureTextEntry
            />

            <TouchableOpacity onPress={handleSignIn} style={styles.button} disabled={isLoggingIn}>
                <Text style={styles.buttonText}>
                    {isLoggingIn ? "Logging In..." : "Log In"}
                </Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>New to wawa?</Text>
                <TouchableOpacity onPress={() => router.push("/signup")} >
                    <Text style={styles.signupButton}>Create an account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#a6e6fd",
        paddingHorizontal: 25,
        paddingBottom: 10,
        paddingTop: 140,
    },
    subtitle: {
        marginTop: 5,
        opacity: 0.6,
        fontFamily: Fonts.regular,
        marginBottom: 20,
    },
    inputLabel: {
        marginTop: 14,
        marginBottom: 8,
        fontFamily: Fonts.regular,
        opacity: 0.7,
        paddingLeft: 10,
    },
    textInput: {
        fontFamily: Fonts.regular,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: "#E2E8F0",
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: "white",
        height: 50,
        shadowColor: "000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    button: {
        backgroundColor: "rgb(62,144,212)",
        width: "100%",
        height: 50,
        marginTop: 30,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    }, 
    buttonText: {
        fontFamily: Fonts.medium,
        color: "white"
    },
    signupContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 3,
        marginTop: 20, 
        width: "100%",
        justifyContent: "center"
    },
    signupText: {
        fontFamily: Fonts.regular,
        opacity: 0.6
    },
    signupButton: {
        fontFamily: Fonts.regular,
        color: "rgb(62,144,212)"
    }
})