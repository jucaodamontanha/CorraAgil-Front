import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#12263A',
      justifyContent: 'center',
      alignItems: 'center'
    },
    top: {
      alignItems: 'center',
      marginBottom: 40
    },
    title: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 32,
    },
    containerInput: {
      marginTop: 30,
      alignItems: 'center'
    },

    // input: {
    //   height: 50,
    //   width: 346,
    //   backgroundColor: "#FFF",
    //   borderRadius: 10,
    //   textAlign: 'center',
    // },
    
    forgetPassword: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom:33
    },
    containerButton: {
      marginBottom: 96
    },
    enterButton: {
      height: 50,
      width: 335,
      backgroundColor: '#FFA500',
      borderRadius: 10    
    },
    registrationButton: {
      height: 50,
      width: 335,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginTop: 20
    },
    textButton: {
      color:'#000',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 8
    }
  })