import { 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { Ionicons } from "@expo/vector-icons";

type StepFourContainerProps = {
    containerName: string
    setContainerName: React.Dispatch<React.SetStateAction<string>>
    containerAmount: string
    setContainerAmount: React.Dispatch<React.SetStateAction<string>>
    onNext: () => void
    onBack: () => void
}

export default function StepFourContainer({
    containerName,
    setContainerName,
    containerAmount,
    setContainerAmount,
    onNext,
    onBack,
}: StepFourContainerProps) {
    const title = "Add a profile picture"
    const subtitle = "Help your friends recognize you. You can skip and add one later."

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={onBack}>
                <Ionicons name="arrow-back" size={28} color="rgb(59,99,124)" />
            </TouchableOpacity>
            

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
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

})