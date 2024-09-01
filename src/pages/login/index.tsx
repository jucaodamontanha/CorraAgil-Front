import { useState } from 'react';

import { 
    View, 
    Text, 
    StyleSheet,
    Image, 
    TextInput, 
    TouchableOpacity, 
    Alert 
} from 'react-native';

import { styles } from './styles';
import { Input } from '../../components/Input';


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const press = () => {
      Alert.alert("Botão pressionado!")
    }

    async function getLogin(){
        try {
            if (!email || !password){
                return Alert.alert('Atenção', 'Emai e senha não podem ser em branco')
            }
            
            Alert.alert('Logado com sucesso!')
        } catch (error) {
            
        }
    }
  
    return (
      <View style={styles.container}>
  
        <View style={styles.top}>
          <Image
            source={require("../../assets/topLogin.png")}
          />
  
          <Image
            source={require("../../assets/corraAgil.png")}
            style={{ marginTop: 23 }}
          />
        </View>
  
        <Text style={styles.title}>Login</Text>
  
        <View style={styles.containerInput}>
          <Input
            placeholder={"Email"}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder={"Senha"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          {/* <TextInput
            style={[styles.input]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          ></TextInput> */}
    
          {/* <TextInput
            style={[styles.input, { marginTop: 23 }]}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          ></TextInput> */}
          
        </View>
  
        <Text style={styles.forgetPassword}>ESQUECEU A SENHA?</Text>
  
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.enterButton} onPress={()=>getLogin()}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.registrationButton} onPress={press}>
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>
  
        </View>
  
      </View>
    )
  }