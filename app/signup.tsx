import { 
    Alert,
    Text, 
    View,
    StyleSheet, 
    TextInput,
    TouchableOpacity, 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../constants/fonts";
import GradientText from "../components/ui/GradientText";
import { useState } from "react";
import {router} from "expo-router"
import { supabase } from "../lib/supabase";

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSigningUp, setIsSigningUp] = useState(false)

    async function handleSignup() {
        if(!email.trim() || !password.trim()) {
            Alert.alert("Missing Fields", "Please enter your email and password.")
            return
        }

        if(password.length < 8) {
            Alert.alert("Weak Password", "Password must be at least 8 characters.")
            return
        }

        try{
            setIsSigningUp(true)        
            
            const {error} = await supabase.auth.signUp({
                email: email.trim(),
                password,
            })

            if(error) {
                Alert.alert("Error", error.message)
                return
            }

            router.replace("/create-profile")
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Something went wrong")
        } finally {
            setIsSigningUp(false)
        }


    }

    return (
        <SafeAreaView style={styles.container}>
            <GradientText
                text="wawa"
                colors={["#005BFF", "#00D4FF"]}
                fontSize={50}
                fontFamily={Fonts.bold}
                width={140}
            />

            <Text style={styles.subtitle}>
                Hydration,
            </Text>
            <GradientText
                text="made social."
                colors={["#005BFF", "#00D4FF"]}
                fontSize={35}
                fontFamily={Fonts.bold}
                width={500}
            />
            <Text style={styles.description}>
                Track your water, build a streak, and stay accountable with friends.
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
                placeholder="At least 8 characters" 
                style={styles.textInput}
                secureTextEntry
            />

            <TouchableOpacity onPress={handleSignup} style={styles.button} disabled={isSigningUp}>
                <Text style={styles.buttonText}>
                    {isSigningUp ? "Creating account..." : "Create Account"}
                </Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text style={styles.loginButton}>
                        Log in
                    </Text>
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
        paddingVertical: 10,
    },
    subtitle: {
        marginTop: 50,
        fontSize: 35,
        fontFamily: Fonts.semiBold,
    },
    description: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        opacity: 0.6,
        marginTop: 10,
        marginBottom: 20,
    }, 
    inputLabel:{
        marginTop: 14,
        marginBottom: 8,
        fontFamily: Fonts.regular,
        opacity: 0.7,
        paddingLeft: 10,
    },
    textInput: {
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
    loginContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 3,
        marginTop: 20,
        width: "100%",
        justifyContent: "center"
    },
    loginText: {
        fontFamily: Fonts.regular,
        opacity: 0.6,
    },
    loginButton: {
        fontFamily: Fonts.regular,
        color: "rgb(62,144,212)"
    },
})