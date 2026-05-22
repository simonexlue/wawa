import { supabase } from "../../lib/supabase";
import { CompleteOnboardingPayload, CreateProfilePayload, CreateUserGoalPayload, createStarterContainerPayload } from "../../types/create-profile/onboarding";
import { compressImage } from "../../utils/compressImage";

export async function uploadProfileAvatar(
    userId: string,
    avatarUri: string
) {
    const compressedUri = await compressImage(avatarUri)

    const response = await fetch(compressedUri)
    const blob = await response.blob();

    const filePath = `${userId}/${Date.now()}.jpg`;

    const {error} = await supabase.storage
        .from("profile-photos")
        .upload(filePath, blob, {
            contentType: "image/jpeg",
            upsert: true,
        })

    if(error) {
        throw error
    }

    return filePath;
}

export async function createProfile({
    userId,
    username,
    displayName,
    avatar,
}: CreateProfilePayload) {
    
    const {data, error} = await supabase
        .from("profiles")
        .insert({
            id: userId,
            username: username.trim(),
            display_name: displayName.trim(),
            avatar_url: avatar
        })
        .select()
        .single()

    if(error) {
        throw error;
    }

    return data
}

export async function createUserGoal({
    userId,
    dailyGoal,
}: CreateUserGoalPayload) {
    
    const {data, error} = await supabase
        .from("user_goals")
        .insert({
            user_id: userId,
            daily_goal_ml: Number(dailyGoal)
        })
        .select()
        .single()

    if(error) {
        throw error
    }

    return data
}

export async function createStarterContainer({
    userId,
    containerName,
    containerAmount
}: createStarterContainerPayload){

    const {data, error} = await supabase
        .from("water_containers")
        .insert({
            user_id: userId,
            name: containerName.trim(),
            amount_ml: Number(containerAmount),
        })
        .select()
        .single()

    if (error) {
        throw error
    }

    return data
}

export async function completeOnboarding({
    userId,
    username,
    displayName,
    dailyGoal,
    avatar,
    containerName,
    containerAmount,
}: CompleteOnboardingPayload) {

    let avatarUrl: string | null = null

    if(avatar) {
        avatarUrl = await uploadProfileAvatar(userId, avatar)
    }
    
    await createProfile({
        userId,
        username,
        displayName,
        avatar: avatarUrl
    })

    await createUserGoal({userId, dailyGoal})

    await createStarterContainer({
        userId,
        containerName,
        containerAmount,
    })

    return true
}