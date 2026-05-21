import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Fonts } from "../../constants/fonts";

type StepProgressProps = {
    currentStep: number;
    totalSteps: number;
    onBack: () => void;
    showBack?: boolean;
}

export default function StepProgress({
    currentStep,
    totalSteps,
    onBack,
    showBack,
}: StepProgressProps) {
    return (
        <View style={styles.header}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={onBack}>
                <Ionicons name="arrow-back" size={26} color="rgb(59,99,124)" />
                </TouchableOpacity>

                <Text style={styles.stepText}>
                {currentStep} / {totalSteps}
                </Text>
            </View>

            <View style={styles.progressTrack}>
                <View
                style={[
                    styles.progressFill,
                    { width: `${(currentStep / totalSteps) * 100}%` },
                ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 30,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },

    stepText: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: "rgb(59,99,124)",
        opacity: 0.9,
    },

    progressTrack: {
        width: "100%",
        height: 8,
        backgroundColor: "rgba(255,255,255,0.45)",
        borderRadius: 999,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: "#0EA5E9",
        borderRadius: 999,
    },
});