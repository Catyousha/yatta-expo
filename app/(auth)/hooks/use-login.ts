import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useState } from "react"
import { Alert } from "react-native";

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        if(email === '' || pass === '') return;
        setIsLoading(true);
        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password: pass,
        })

        setIsLoading(false);
        if(error) {
            Alert.alert(error.message);
        } else {
            router.replace('/(tabs)');
        }
    }

    return {
        setEmail,
        setPass,
        isLoading,
        onSubmit,
    }
}

export default useLogin;