import { useState } from "react";
import { 
    View, 
    Text,
    StyleSheet 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepOneProfileInfo from "../components/create-profile/StepOneProfileInfo";
import StepTwoGoal from "../components/create-profile/StepTwoGoal";

export default function CreateProfile() {
    const [step, setStep] = useState(1)
    const [displayName, setDisplayName] = useState("")
    const [dailyGoal, setDailyGoal] = useState("2500")
    const [avatar, setAvatar] = useState(null)
    const [containerName, setContainerName] = useState("")
    const [containerAmount, setContainerAmount] = useState(null)
    const [isSubmitting, setIsSumbitting] = useState(false)

    function onNext() {
        setStep((prev) => prev + 1)
    }
    function onBack() {
        setStep((prev) => prev - 1)
    }

    if(step === 1) {
        return (
            <StepOneProfileInfo 
                displayName={displayName}
                setDisplayName={setDisplayName}
                onNext={onNext}
            />
        )
    } else if (step === 2) {
        return (
            <StepTwoGoal 
                dailyGoal={dailyGoal}
                setDailyGoal={setDailyGoal}
                onNext={onNext}
                onBack={onBack}
            />
        )
            
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Create Profile
            </Text>
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
})