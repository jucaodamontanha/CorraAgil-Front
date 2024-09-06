import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 335,
    backgroundColor: "#FFA500",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  secondaryButton: {
    backgroundColor: "#3C5A9A",
    borderColor: "transparent",
    borderWidth: 1,
  },
  tertiaryButton: {
    backgroundColor: "#FFF",
    borderColor: "transparent",
    borderWidth: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textPrimary: {
    color: "#000",
  },
  textSecondary: {
    color: "#FFF",
  },
  textTertiary: {
    color: "#000",
  },
});
