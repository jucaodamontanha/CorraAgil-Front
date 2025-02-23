import React, { forwardRef } from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";
import { FontAwesome, Ionicons, MaterialIcons, Octicons, AntDesign } from "@expo/vector-icons";

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
  React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
  React.ComponentType<React.ComponentProps<typeof Octicons>> |
  React.ComponentType<React.ComponentProps<typeof Ionicons>> |
  React.ComponentType<React.ComponentProps<typeof AntDesign>>;


type Props = TouchableOpacityProps & {
  title: string,
  variant?: "primary" | "secondary" | "tertiary",
  iconName?: string,
  loading?: boolean,
  IconCenter?: IconComponent,
  IconCenterName?: String
}
// interface ButtonProps extends TouchableOpacityProps {
//   title: string;
//   variant?: "primary" | "secondary" | "tertiary";
//   iconName?: string;
//   loading?: boolean;
//   IconCenter?: IconComponent;
// }

export const Button = forwardRef<React.ElementRef<typeof TouchableOpacity>, Props>(
  ({ title, variant, iconName, loading, IconCenter, ...rest }, ref) => {

    return (
      <TouchableOpacity
        ref={ref}
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

          {loading ?
            (<ActivityIndicator color={"#000"} />)
            : (
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
            )}
        </View>
      </TouchableOpacity>

    )
  }
)

/*
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
*/