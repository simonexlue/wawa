import { useState } from "react";
import { 
    View, 
    Text,
    StyleSheet, 
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepOneProfileInfo from "../components/create-profile/StepOneProfileInfo";
import StepThreeGoal from "../components/create-profile/StepThreeGoal";
import StepFourProfilePic from "../components/create-profile/StepFourProfilePic";
import StepFiveContainer from "../components/create-profile/StepFiveContainer";
import StepTwoUsername from "../components/create-profile/StepTwoUsername";
import StepProgress from "../components/create-profile/StepProgress";
import { supabase } from "../lib/supabase";
import { completeOnboarding } from "../services/create-profile/onboarding";
import { router } from "expo-router";

export default function CreateProfile() {
    const [step, setStep] = useState(1)
    const [displayName, setDisplayName] = useState("")
    const [username, setUsername] = useState("")
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

    function validateInputs() {
        if(!displayName) {
            Alert.alert("Missing information", "Name is missing from submission.")
            return
        }
        if (!username) {
            Alert.alert("Missing information", "Username is missing from submission.")
            return
        }
        if(!dailyGoal || Number(dailyGoal) <= 0) {
            Alert.alert("Missing information", "Please enter a valid daily goal.")
            return
        }
        if(!containerName.trim() || !containerAmount || Number(containerAmount) <= 0) {
            Alert.alert("Missing information", "Go-to bottle information is missing from submission.")
            return
        }
    }

    async function handleFinishSetup() {
        validateInputs()

        try {
            setIsSumbitting(true)

            const { data, error } = await supabase.auth.getUser();

            if (error || !data.user) {
                throw new Error("User not found");
            }

            await completeOnboarding({
                userId: data.user.id,
                username,
                displayName,
                dailyGoal: Number(dailyGoal),
                avatar,
                containerName,
                containerAmount: Number(containerAmount),
            })

            router.replace("/(tabs)/home")
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Something went wrong while creating your profile.")
        } finally {
            setIsSumbitting(false)
        }
        


    }

    function renderStep() {
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
                <StepTwoUsername
                    username={username}
                    setUsername={setUsername}
                    onNext={onNext}
                />
            )
        } else if (step === 3) {
            return (
                <StepThreeGoal 
                    dailyGoal={dailyGoal}
                    setDailyGoal={setDailyGoal}
                    onNext={onNext}
                />
            )  
        } else if (step === 4) {
            return (
                <StepFourProfilePic
                    displayName={displayName}
                    avatar={avatar}
                    setAvatar={setAvatar}
                    onNext={onNext}
                />
            )
        } else if (step === 5) {
            return (
                <StepFiveContainer
                    containerName={containerName}
                    setContainerName={setContainerName}
                    containerAmount={containerAmount}
                    setContainerAmount={setContainerAmount}
                    onNext={handleFinishSetup}
                    isSubmitting={isSubmitting}
                />
            )
        } 
    }

    return (
        <SafeAreaView style={styles.container}>
            <StepProgress 
                currentStep={step}
                totalSteps={5}
                onBack={onBack}
                showBack={step > 1}
            />
            {renderStep()}
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