import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Fonts } from "../../constants/fonts";

type StepTwoUsernameProps = {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    onNext: () => void;
}

export default function StepTwoUsername({
    username,
    setUsername,
    onNext
}: StepTwoUsernameProps) {
    const title = "Decide your username"
    const subtitle = "This is another way that friends can find you on wawa."

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <TextInput 
                placeholder="ex. jdoe123"
                value={username}
                onChangeText={setUsername}
                style={styles.textInput}
            />

            <TouchableOpacity 
                style={[
                    styles.button,
                    !username.trim() && styles.buttonDisabled,
                ]}
                disabled={!username.trim()}
                onPress={onNext}
                >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: 30,
        opacity: 0.9,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        opacity: 0.6,
        marginBottom: 30,
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
    }
})