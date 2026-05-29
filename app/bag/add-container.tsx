import { 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    View,
    TextInput,
    Alert,
} from "react-native";
import { Fonts } from "../../constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { createWaterContainer } from "../../services/bag/bag";
import { supabase } from "../../lib/supabase";

export default function AddContainer() {
    const [containerName, setContainerName] = useState("")
    const [containerAmount, setContainerAmount] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const title = "Add a bottle"
    const subtitle = "Save the bottles or mugs you drink from most. You can log water with one tap later."

    const quickPicks = [
        {label: "500"},
        {label: "750"},
        {label: "1000"},
    ]

    async function handleFinish() {
        try {
            setIsSubmitting(true)
            setError("")

            const {data: {user}} = await supabase.auth.getUser();

            if(!user) {
                throw new Error("No user found")
            }

            await createWaterContainer({
                userId: user.id,
                name: containerName.trim(),
                amount_ml: Number(containerAmount)
            })

            router.replace("/(tabs)/bag")

        } catch (error) {
            setError("Problem encountered while adding container.")
            Alert.alert("Error", "Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={router.back}>
                <Ionicons name="arrow-back" size={26} color="rgb(59,99,124)" />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <Text style={styles.inputLabel}>BOTTLE NAME</Text>
            <TextInput 
                value={containerName}
                onChangeText={setContainerName}
                style={styles.textInput}
                placeholder="e.g. Blue gym bottle"
                >
            </TextInput>

            <Text style={styles.inputLabel}>SIZE (ML)</Text>
            <TextInput 
                value={containerAmount}
                onChangeText={setContainerAmount}
                style={styles.textInput}
                placeholder="750"
                keyboardType="numeric"
                >
            </TextInput>
                <View style={styles.quickPickSection}>
                {quickPicks.map((pick) => (
                    <TouchableOpacity 
                        key={pick.label}
                        style={[
                            styles.quickPickButton,
                            containerAmount === pick.label && styles.quickPickButtonActive,
                        ]}
                        onPress={() => setContainerAmount(pick.label)}
                        >
                        <Text style={[styles.quickPickButtonText, containerAmount=== pick.label && styles.quickPickButtonTextActive]}>{pick.label} mL</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity 
                style={[
                    styles.button,
                    (!containerAmount.trim() || !containerName.trim()) && styles.buttonDisabled,
                ]}
                disabled={!containerAmount.trim() || !containerName.trim()}
                onPress={handleFinish}
                >
                <Text style={styles.buttonText}>
                    {isSubmitting ? "Adding container..." : "Add Container"}
                </Text>
            </TouchableOpacity>
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
    title: {
        fontFamily: Fonts.bold,
        fontSize: 30,
        opacity: 0.9,
        marginBottom: 8,
        marginTop: 10,
    },
    subtitle: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        opacity: 0.6,
        marginBottom: 30,
    },
    inputLabel: {
        marginTop: 20,
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
    quickPickSection: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    quickPickText: {
        marginTop: 30,
        fontFamily: Fonts.regular,
        opacity: 0.7,
        paddingHorizontal: 8,
    },  
    quickPickButton: {
        backgroundColor: "white",
        borderRadius: 40,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: "31%",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    quickPickButtonText: {
        fontFamily: Fonts.medium,
    },
    button: {
        backgroundColor: "rgb(62,144,212)",
        width: "100%",
        height: 50,
        marginTop: "auto",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    }, 
    buttonText: {
        fontFamily: Fonts.medium,
        color: "white"
    },
    buttonDisabled: {
        backgroundColor: "rgb(62,144,212)",
        shadowOpacity: 0,
        elevation: 0,
        opacity: 0.5,
    },
    quickPickButtonActive: {
        backgroundColor: "rgb(62,144,212)",
        borderColor: "rgb(62,144,212)",
    },
    quickPickButtonTextActive: {
        color: "white",
    },
})