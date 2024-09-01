import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
}

export function Button({ title, variant = "primary", ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "secondary" && styles.secondaryButton]}
      {...rest}
    >
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
}
