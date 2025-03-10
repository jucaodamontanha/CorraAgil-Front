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
import { Ionicons, FontAwesome, MaterialIcons, Octicons, AntDesign } from "@expo/vector-icons";

// Definir tipos para os nomes dos ícones das bibliotecas
type IconName = 
  | keyof typeof Ionicons.glyphMap 
  | keyof typeof FontAwesome.glyphMap 
  | keyof typeof MaterialIcons.glyphMap 
  | keyof typeof Octicons.glyphMap 
  | keyof typeof AntDesign.glyphMap;

type Props = TouchableOpacityProps & {
  title: string;
  variant?: "primary" | "secondary" | "tertiary";
  iconName?: string;
  loading?: boolean;
  IconCenter?: React.ComponentType<React.ComponentProps<typeof Ionicons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>> |
    React.ComponentType<React.ComponentProps<typeof AntDesign>>;
  IconCenterName?: IconName; // Tipo para os nomes de ícones
}

export const Button = forwardRef<React.ElementRef<typeof TouchableOpacity>, Props>(
  ({ title, variant, iconName, loading, IconCenter, IconCenterName, ...rest }, ref) => {

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
          {/* Exibindo ícone à esquerda se fornecido */}
          {iconName && (
            <Icon
              name={iconName}
              size={24}
              color={variant === "secondary" ? "#fff" : "#000"}
              style={styles.icon}
            />
          )}

          {/* Se houver IconCenter, substitui o título pelo ícone */}
          {IconCenter && IconCenterName ? (
            <IconCenter
              name={IconCenterName}
              size={24}
              color={variant === "secondary" ? "#fff" : "#000"}
              style={styles.iconCenter}
            />
          ) : (
            // Exibindo o título caso contrário
            loading ? (
              <ActivityIndicator color={"#000"} />
            ) : (
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
            )
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

