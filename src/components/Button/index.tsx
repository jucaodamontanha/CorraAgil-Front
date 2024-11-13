import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "tertiary";
  iconName?: string;
  loading?: boolean;
}

export function Button({
  title,
  variant = "primary",
  iconName,

  ...rest
}: ButtonProps) {
  return (
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

        {rest.loading ? <ActivityIndicator color={"#000"}/> :
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
        }
      </View>
    </TouchableOpacity>
  );
}
