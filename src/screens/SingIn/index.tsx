// import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';


import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';

import { styles } from './styles';

import {Background} from '../../components/background';
import { theme } from '../../global/styles/theme';




export function SignIn(){

    const { loading, signIn } = useAuth();


    // const navigation = useNavigation();

    async function handleSignIn(){

        try{
            await signIn();
        }catch (error) {

            Alert.alert('' + error);
        }

    }


    return(
        <Background>
        <View style={styles.container}>
         
            <Image source={IllustrationImg} style={styles.image} resizeMode="stretch" />

            <View style={styles.content}>
                    <Text style={styles.title}>
                        e organize suas{` \n`}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Cire grupos para jogar seus games{` \n`}
                        favoritos com seus amigos
                    </Text>

              {  
                
                loading ? <ActivityIndicator color={theme.colors.primary} />  
                :

              <ButtonIcon onPress={handleSignIn} title="Entrar com Discord"  />}

            </View>

        </View>
        </Background>
    );
}