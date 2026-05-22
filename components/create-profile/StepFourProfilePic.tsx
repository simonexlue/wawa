import { 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    View,
    Image,
    Alert,
} from "react-native";
import { Fonts } from "../../constants/fonts";
import * as ImagePicker from "expo-image-picker"

type StepFourProfilePicProps = {
    displayName: string
    avatar: string | null
    setAvatar: React.Dispatch<React.SetStateAction<string | null>>
    onNext: () => void
}

export default function StepFourProfilePic({
    displayName,
    avatar,
    setAvatar,
    onNext,
}: StepFourProfilePicProps) {
    const title = "Add a profile picture"
    const subtitle = "Help your friends recognize you. You can skip and add one later."
    const initial = displayName?.trim().charAt(0).toUpperCase() || "?";

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(!permissionResult.granted) {
            Alert.alert("Permission required", "Permission to access the media library is required.")
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4,3],
            quality: 0.7,
        })

        if(!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            
            {avatar ? (
                <View style={styles.avatarWrapper}>
                    <Image source={{uri: avatar}} style={styles.avatarImage}/>
                </View>      
            ) : (
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarInitial}>{initial}</Text>
                </View>
            )}

            <TouchableOpacity onPress={pickImage} style={styles.choosePhotoButton}>
                <Text style={styles.choosePhotoButtonText}>Choose Photo</Text>
            </TouchableOpacity>

            <View style={styles.bottomSection}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={onNext}
                    >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.skipButton}
                    onPress={onNext}
                    >
                    <Text style={styles.skipText}>Skip for now</Text>
                </TouchableOpacity>     
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    avatarWrapper: {
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
        marginTop: 20,
    },
    avatarImage: {
        width: 140,
        height: 140,
        borderRadius: 100,
    },
    avatarPlaceholder: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "#D8C4FF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 20,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
        alignSelf: "center",
        marginTop: 20,
    }, 
    avatarInitial: {
        fontFamily: Fonts.bold,
        fontSize: 52,
        color: "white",
    },
    choosePhotoButton: {
        backgroundColor: "white",
        width: "50%",
        height: 50,
        marginTop: 30,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    }, 
    choosePhotoButtonText: {
        fontFamily: Fonts.medium,
    },
    button: {
        backgroundColor: "rgb(62,144,212)",
        width: "100%",
        height: 50,
        marginTop: 30,
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
    skipButton: {
        alignSelf:"center",
        marginTop: 10,
    },
    skipText: {
        fontFamily: Fonts.regular,
        opacity: 0.7,
    },
    bottomSection: {
        marginTop: "auto",
        paddingBottom: 20,
    }
})