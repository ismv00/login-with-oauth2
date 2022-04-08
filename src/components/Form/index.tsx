import React, { useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { Button } from "../Button";
import { User, UserProps } from "../User";
import { Container } from "./styles";

type AuthResponse = {
    params: {
        access_token: string;
    },
    type: string;
}
export function Form(){
    const [ userData, setUserData] = useState<UserProps>({} as UserProps);
    async function HandleGoogleSignIn(){
        try {
            const CLIENT_ID = "571474461203-j2pli1kl5thr3ct86g5ullts7idn61ld.apps.googleusercontent.com";
            const REDIRECT_URI = "https://auth.expo.io/@euigoorr/login-with-auth";
            const SCOPE = encodeURI("profile email");
            const RESPONSE_TYPE = "token";

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      
            const {type, params} = await AuthSession.startAsync({ authUrl }) as AuthResponse;

            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const user = await response.json();
                setUserData(user);
            }

        } catch (error) {
            console.log(error)
        }
    }
    return(
        <Container>
            <Button 
               icon="google" 
               title="Entrar com o Google"
               onPress={HandleGoogleSignIn}
            />

            <User
                user={userData}
            />

            
        </Container>
    )
}