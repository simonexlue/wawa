import { 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { Ionicons } from "@expo/vector-icons";

type StepThreeProfilePicProps = {
    displayName: string
    avatar: string | null
    setAvatar: React.Dispatch<React.SetStateAction<string | null>>
    onNext: () => void
    onBack: () => void
}

export default function StepThreeProfilePic({
    displayName,
    avatar,
    setAvatar,
    onNext,
    onBack,
}: StepThreeProfilePicProps) {
    const title = "Add a profile picture"
    const subtitle = "Help your friends recognize you. You can skip and add one later."
    const initial = displayName?.trim().charAt(0).toUpperCase() || "?";

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={onBack}>
                <Ionicons name="arrow-back" size={28} color="rgb(59,99,124)" />
            </TouchableOpacity>
            

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{initial}</Text>
            </View>

            <TouchableOpacity style={styles.choosePhotoButton}>
                <Text style={styles.choosePhotoButtonText}>Choose Photo</Text>
            </TouchableOpacity>

            <View style={styles.bottomSection}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={onNext}
                    >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.skipButton}
                    onPress={onNext}
                    >
                    <Text style={styles.skipText}>Skip for now</Text>
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
        height: "100%"
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
    avatarPlaceholder: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "#D8C4FF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 20,
        },
        shadowOpacity: 0.13,
        shadowRadius: 12,
        elevation: 6,
        alignSelf: "center",
        marginTop: 20,
    }, 
    avatarInitial: {
        fontFamily: Fonts.bold,
        fontSize: 52,
        color: "white",
    },
    choosePhotoButton: {
        backgroundColor: "white",
        width: "50%",
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
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    }, 
    choosePhotoButtonText: {
        fontFamily: Fonts.medium,
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
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    }, 
    buttonText: {
        fontFamily: Fonts.medium,
        color: "white"
    },
    skipButton: {
        alignSelf:"center",
        marginTop: 10,
    },
    skipText: {
        fontFamily: Fonts.regular,
        opacity: 0.7,
    },
    bottomSection: {
        marginTop: "auto",
        paddingBottom: 20,
    }
})