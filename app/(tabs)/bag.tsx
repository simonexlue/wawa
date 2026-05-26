import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Fonts } from "../../constants/fonts";
import ContainerCard from "../../components/bag/ContainerCard";

const dummyContainers = [
    {name: "Hydro Flask", volume: 950},
    {name: "Owala", volume: 7100},
    {name: "My cute blue mug", volume: 350},
]

export default function Bag() {

    const title = "My Bag"
    const subtitle = "The cups and bottles you drink from most."

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <View style={styles.containerList}>
                {dummyContainers.map((container) => (
                    <ContainerCard 
                        containerName={container.name}
                        containerVolume={container.volume}
                    />
                ) )}
            </View>

            <TouchableOpacity style={styles.button}>
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