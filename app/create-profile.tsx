import { useState } from "react";
import { 
    View, 
    Text,
    StyleSheet 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepOneProfileInfo from "../components/create-profile/StepOneProfileInfo";
import StepTwoGoal from "../components/create-profile/StepTwoGoal";
import StepThreeProfilePic from "../components/create-profile/StepThreeProfilePic";
import StepFourContainer from "../components/create-profile/StepFourContainer";

export default function CreateProfile() {
    const [step, setStep] = useState(1)
    const [displayName, setDisplayName] = useState("")
    const [dailyGoal, setDailyGoal] = useState("2500")
    const [avatar, setAvatar] = useState<string | null>(null)
    const [containerName, setContainerName] = useState("")
    const [containerAmount, setContainerAmount] = useState("")
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
    } else if (step === 3) {
        return (
            <StepThreeProfilePic
                displayName={displayName}
                avatar={avatar}
                setAvatar={setAvatar}
                onNext={onNext}
                onBack={onBack}
            />
        )
    } else if (step === 4) {
        return (
            <StepFourContainer
                containerName={containerName}
                setContainerName={setContainerName}
                containerAmount={containerAmount}
                setContainerAmount={setContainerAmount}
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