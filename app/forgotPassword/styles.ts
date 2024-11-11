import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12263A",
        justifyContent: "center",
        alignItems: "center",
    },
    imageView: {
        marginBottom: 59.61
    },
    forgotText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 32,
        marginBottom: 44
    },
    textEmail: {
        color: "#FFF",
        fontSize: 20,
        marginBottom: 4
    },
    boxEmail: {
        alignItems: "center",
        color: "#FFF",
        marginBottom: 20
    },
    error: {
        color: "red",
        fontSize: 14,
        margin: 5,
    },
    backButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
    }
});

export default styles;