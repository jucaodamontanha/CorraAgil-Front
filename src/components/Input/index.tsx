import React, { forwardRef, LegacyRef } from "react";
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { styles } from "./styles";

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> | 
                     React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
                     React.ComponentType<React.ComponentProps<typeof Octicons>> |
                     React.ComponentType<React.ComponentProps<typeof Ionicons>>;

type Props = TextInputProps & {
    IconRigth?: IconComponent,
    iconRigthName?: String,
    title?: string,
    onIconRigthPress?: () => void
}

export const Input = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {

    const { IconRigth, iconRigthName, onIconRigthPress, title, ...rest } = Props

    return (
        <>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    {...rest}
                ></TextInput>
                {IconRigth && iconRigthName && (
                    <TouchableOpacity onPress={onIconRigthPress}>
                        <IconRigth name={iconRigthName as any} size={20} style={styles.icon} />
                    </TouchableOpacity>
                )}
            </View>
        </>
    )
})