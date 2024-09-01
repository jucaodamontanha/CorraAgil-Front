import React, { forwardRef, LegacyRef } from "react";

import { 
    View, 
    Text,
    TextInput, 
    TextInputProps
    } from 'react-native';

import { styles } from "./styles";

type Props = TextInputProps & {
    }

export const Input = forwardRef((Props:Props, ref: LegacyRef<TextInput> | null)=>{

    const {...rest} =Props

    return( 
          <TextInput
           style={styles.input}
           {...rest}
          ></TextInput>

    )
})