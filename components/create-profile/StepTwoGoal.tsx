import { 
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, 
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { Ionicons } from "@expo/vector-icons";

type StepTwoGoalProps = {
    dailyGoal: string;
    setDailyGoal: React.Dispatch<React.SetStateAction<string>>;
    onNext: () => void;
    onBack: () => void;
}

export default function StepTwoGoal({
    dailyGoal,
    setDailyGoal,
    onNext,
    onBack,
}: StepTwoGoalProps) {
    const quickPicks = [
        {label: "1500"},
        {label: "2000"},
        {label: "2500"},
        {label: "3000"},
        {label: "3500"},
        {label: "4000"},
    ]

    const title = "Set your daily goal"
    const subtitle = "How much water do you want to drink each day? You can change this anytime."

    function convertToCups(mL: string) {
        if(!mL.trim()) return

        const volume = Number(mL)
        const cups = volume / 236.5882365

        return cups.toFixed(1)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={onBack}>
                <Ionicons name="arrow-back" size={28} color="rgb(59,99,124)" />
            </TouchableOpacity>
            

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <View style={styles.goalCard}>
                <View style={styles.goalRow}>
                    <TextInput 
                        value={String(dailyGoal)}
                        onChangeText={setDailyGoal}
                        style={styles.textInput}
                        keyboardType="numeric"
                    />
                    <Text style={styles.mLText}>mL</Text>
                </View>

                <Text style={styles.cupsText}>{!dailyGoal.trim() ? "≈ 0.0 cups" : `≈ ${convertToCups(dailyGoal)} cups`}</Text>
            </View>

            <Text style={styles.quickPickText}>QUICK PICK</Text>        
            <View style={styles.quickPickSection}>
                {quickPicks.map((pick) => (
                    <TouchableOpacity 
                        key={pick.label}
                        style={[
                            styles.quickPickButton,
                            dailyGoal === pick.label && styles.quickPickButtonActive
                        ]}
                        onPress={() => setDailyGoal(pick.label)}
                        >
                        <Text style={[styles.quickPickButtonText, dailyGoal === pick.label && styles.quickPickButtonTextActive]}>{pick.label} mL</Text>
                    </TouchableOpacity>
                ))}

            </View>


            <TouchableOpacity 
                style={styles.button}
                disabled={!dailyGoal.trim()}
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
    goalCard: {
        borderWidth: 1,
        borderRadius: 40,
        borderColor: "#E2E8F0",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "white",
        shadowColor: "000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        alignItems: "center"
    },
    goalRow: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: 10,
    },
    mLText: {
        fontFamily: Fonts.regular,
        opacity: 0.7,
        paddingBottom: 4,
    },
    cupsText: {
        fontFamily: Fonts.regular,
        opacity: 0.6,
        fontSize: 12,
    },
    textInput: {
        fontFamily: Fonts.bold,
        fontSize: 32,
        color: "#0796D8",
        justifyContent: "center",
        width: 110,
        textAlign: "center",
        padding: 0,
    },
    quickPickSection: {
        marginTop: 10,
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
        marginTop: "auto",
        backgroundColor: "rgb(62,144,212)",
        width: "100%",
        height: 50,
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
    quickPickButtonActive: {
        backgroundColor: "rgb(62,144,212)",
        borderColor: "rgb(62,144,212)",
    },
    quickPickButtonTextActive: {
        color: "white",
    },
})