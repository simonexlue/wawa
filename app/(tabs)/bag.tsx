import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Fonts } from "../../constants/fonts";
import ContainerCard from "../../components/bag/ContainerCard";
import { WaterContainer } from "../../types/bag/bag";
import { useEffect, useState } from "react";
import { getWaterContainers } from "../../services/bag/bag";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

export default function Bag() {
    const [containers, setContainers] = useState<WaterContainer[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [userId, setUserId] = useState("")

    const title = "My Bag"
    const subtitle = "The cups and bottles you drink from most."

    useEffect(() => {
        async function loadWaterContainers() {
            try {
                const {data: {user}} = await supabase.auth.getUser();

                if(!user) {
                    throw new Error("No user found")
                }
                setUserId(user.id)

                const data = await getWaterContainers(user.id)
                setContainers(data)
            } catch (error) {
                console.log(error)
                setError("Something went wrong while fetching your bottles.")
                Alert.alert("Error", "Something went wrong while fetching your bottles.")
            } finally {
                setLoading(false)
            }
        } 

        loadWaterContainers();
        
    }, [])

    function handleDeleteSuccess(containerKey: string) {
        setContainers((prevContainers) => prevContainers.filter(
            (container) => container.id !== containerKey
        ))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            {!loading && !error.trim() && containers && (
                <View style={styles.containerList}>
                    {containers.map((container) => (
                        <ContainerCard 
                            key={container.id}
                            userId={userId}
                            containerKey={container.id}
                            containerName={container.name}
                            containerVolume={container.amount_ml}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                    ))}
                </View>
            )}

            <TouchableOpacity 
                style={styles.button}
                onPress={() => router.push("/bag/add-container")}
                >
                <Text style={styles.buttonText}>+ Add a bottle</Text>
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
    containerList: {
        flex: 1,
        gap: 18,
    },
    button: {
        backgroundColor: "rgb(62,144,212)",
        width: "100%",
        height: 50,
        marginTop: "auto",
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
    }, 
    buttonText: {
        fontFamily: Fonts.medium,
        color: "white"
    },
})