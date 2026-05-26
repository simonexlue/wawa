import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet } from "react-native";

export default function Feed() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Feed</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#a6e6fd",
        paddingHorizontal: 25,
        paddingVertical: 10,
    }
})