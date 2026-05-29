import { supabase } from "../../lib/supabase";
import { CreateWaterContainerPayload, WaterContainer } from "../../types/bag/bag";
import { compressImage } from "../../utils/compressImage";

async function uploadContainerPhoto(userId: string, imageUri: string) {
    const compressedUri = await compressImage(imageUri)

    const response = await fetch(compressedUri)
    const arrayBuffer = await response.arrayBuffer();
    
    const filePath = `${userId}/${Date.now()}.jpg`

    const {error} = await supabase.storage
        .from("container-photos")
        .upload(filePath, arrayBuffer, {
            contentType: "image/jpeg",
            upsert: false,
        })
    if(error) throw error

    return filePath
}

export async function getWaterContainers(
    userId: string,
): Promise<WaterContainer[]> {
    const {data, error} = await supabase
        .from("water_containers")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw error
    }

    return data ?? []
}

export async function createWaterContainer({
    userId,
    name,
    amount_ml,
    imageUri,
}: CreateWaterContainerPayload) {
    let photo_url: string | null = null;

    if(imageUri) {
        photo_url = await uploadContainerPhoto(userId, imageUri)
    }
    
    const {data, error} = await supabase
        .from("water_containers")
        .insert({
            user_id: userId,
            name: name.trim(),
            amount_ml: Number(amount_ml),
            photo_url,
        })

    if(error) {
        throw error
    }
}

export async function deleteWaterContainer(userId: string, containerId: string) {

    const {data: container, error: fetchError} = await supabase
        .from("water_containers")
        .select("photo_url")
        .eq("user_id", userId)
        .eq("id", containerId)
        .single()

    if(fetchError) throw fetchError

    if(container.photo_url) {
        const {error: storageError} = await supabase.storage
            .from("container-photos")
            .remove([container.photo_url])

        if(storageError) throw storageError
    }

    const {error: deleteError} = await supabase
        .from("water_containers")
        .delete()
        .eq("user_id", userId)
        .eq("id", containerId)

    if(deleteError) throw deleteError
} 