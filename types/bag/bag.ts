export type WaterContainer = {
    id: string;
    user_id: string;
    name: string;
    amount_ml: number;
    photo_url: string | null;
    created_at: string;
};

export type CreateWaterContainerPayload = {
    userId: string;
    name: string;
    amount_ml: number;
    imageUri?: string | null;
};

export type UpdateWaterContainerPayload = {
    containerId: string;
    userId: string;
    name: string;
    amount_ml: number;
    imageUri?: string | null;
}