import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12263A",
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    alignItems: "center",
    padding: 5,
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 32,
  },
  containerInput: {
    padding: 30,
    alignItems: "center",
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