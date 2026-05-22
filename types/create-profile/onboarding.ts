export type CompleteOnboardingPayload = {
    userId: string;
    username: string;
    displayName: string;
    dailyGoal: number;
    avatar: string | null;
    containerName: string;
    containerAmount: number;
}

export type CreateProfilePayload = {
    userId: string;
    username: string;
    displayName: string;
    avatar: string | null;
}

export type CreateUserGoalPayload = {
    userId: string;
    dailyGoal: number;
}

export type createStarterContainerPayload = {
    userId: string;
    containerName: string;
    containerAmount: number;
}