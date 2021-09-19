import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, FlatList, Alert, Share, Platform } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import  * as Linking from 'expo-linking';

// import { Container } from './styles';
import {Background} from '../../components/background';

import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

import { theme } from '../../global/styles/theme';

import Banner from '../../assets/banner.png'
import { styles } from './style';
import { Member, MemberProps } from '../../components/Member';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import Load from '../../components/Load';

type Params = {
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function AppointmentDetails(){
    const route = useRoute();

    const [widget,setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoding] = useState(true);

    const { guildSelected } = route.params as Params;

    async function fetchGuildWidget() {
        try{

            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data)

        }catch (e){
             Alert.alert("Verifique as configurações do servidor. Será que o Widget está habilitado?");
        }finally{
            setLoding(false);
        }
    }

    function handleShareInvitation(){
            const message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;

        
            Share.share({
                message,
                url: widget.instant_invite
            });

            
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite)
    }

    useEffect(()=>{
        fetchGuildWidget();
    },[])


    return(
        <Background>
            <Header 
                title="Detalhes"
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto name="share" size={24} color={theme.colors.primary} />
                    </BorderlessButton>
                }
            />

            <ImageBackground style={styles.banner} source={Banner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                       {guildSelected.guild.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        { guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>
        {
             loading ? <Load /> :
            <>
                <ListHeader
                    title="Jogadores"
                    subtitle={`Total ${widget.members ? widget.members.length : '0'}`}
                />

                <FlatList
                    data={widget.members}
                    keyExtractor={ item => item.id}
                    renderItem={({item}) =>(
                        <Member
                            data={item}
                        />
                    )}
                    style={styles.members}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}

                /> 
             </>  
        }
            {  guildSelected.guild.owner && 
                <View style={styles.footer} >
                    <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
                </View>
            }
        </Background>
    )
}