import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import { Link } from "expo-router";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "tertiary";
  iconName?: string;
  destination: string;
}

export function Button({
  title,
  variant = "primary",
  iconName,
  destination,
  ...rest
}: ButtonProps) {
  return (
    <Link href={destination}>
      <TouchableOpacity
        style={[
          styles.button,
          variant === "secondary" && styles.secondaryButton,
          variant === "tertiary" && styles.tertiaryButton,
        ]}
        {...rest}
      >
        <View style={styles.content}>
          {iconName && (
            <Icon
              name={iconName}
              size={24}
              color={variant === "secondary" ? "#fff" : "#000"}
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.textButton,
              variant === "primary" && styles.textPrimary,
              variant === "secondary" && styles.textSecondary,
              variant === "tertiary" && styles.textTertiary,
            ]}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
