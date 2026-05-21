import { 
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";

type StepOneProfileInfoProps = {
    displayName: string;
    setDisplayName: React.Dispatch<React.SetStateAction<string>>;
    onNext: () => void
}

export default function StepOneProfileInfo({
    displayName,
    setDisplayName,
    onNext,
}: StepOneProfileInfoProps) {

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>What's your name?</Text>
            <Text style={styles.subtitle}>This is how friends will find you on wawa.</Text>

            <TextInput 
                placeholder="Your name"
                value={displayName}
                onChangeText={setDisplayName}
                style={styles.textInput}
            />

            <TouchableOpacity 
                style={[
                    styles.button,
                    !displayName.trim() && styles.buttonDisabled,
                ]}
                disabled={!displayName.trim()}
                onPress={onNext}
                >
                <Text style={styles.buttonText}>Continue</Text>
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