import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Fonts } from "../../constants/fonts";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { deleteWaterContainer } from "../../services/bag/bag";

type ContainerCardProps = {
    userId: string;
    containerKey: string;
    containerName: string;
    containerVolume: number;
    onDeleteSuccess: (containerKey: string) => void;
}

export default function ContainerCard({
    userId,
    containerKey,
    containerName, 
    containerVolume,
    onDeleteSuccess,
}: ContainerCardProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    async function handleDelete(containerKey: string) {
        try {
            setIsDeleting(true)
            setDeleteError("")

            await deleteWaterContainer(userId, containerKey)
            onDeleteSuccess(containerKey)

        } catch (error) {
            console.log(error)
            setDeleteError("Could not delete container")
            Alert.alert("Error", "Could not delete container.")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text style={styles.containerName}>{containerName}</Text>
                <Text style={styles.containerVolume}>{containerVolume} mL</Text>
            </View>


            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="pencil-outline" size={20} color="deepskyblue" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleDelete(containerKey)}
                    disabled={isDeleting}
                    >
                        {isDeleting ? <ActivityIndicator /> : <Ionicons name="trash-outline" size={20} color="red" />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        backgroundColor: "white",
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.13,
        shadowRadius: 10,
        elevation: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    containerInfo: {
        flex: 1,
        gap: 4,
    },
    containerName: {
        fontFamily: Fonts.medium,
        fontSize: 18,
    },
    containerVolume: {
        fontFamily: Fonts.regular,
        opacity: 0.7,
    },
    buttonGroup: {
        flexDirection: "row",
        gap: 12,
    },
    actionButton: {
        opacity: 0.8
    }
})