import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import ApiCommon from '../constants/ApiCommon';

export default function ProfileScreen() {
    const [userLogin, setUserLogin] = useState<any>({});
    const [isLoading, setLoading] = useState(false);
    const [value, setValue] = useState<string | null>('');
    const { getItem, setItem } = useAsyncStorage('token');
    const [retrieve, setRetrieve] = useState(true);

    useEffect(() => {
        const readToken = async () => {
            const item = await getItem();
            console.log('item: ' + item);
            setValue(item);
            setRetrieve(false);
        };

        if (retrieve) {
            readToken();
        }
        if (retrieve === false) {
            console.log('token' + value)
            const headers = { 'Authorization': `Bearer ${value}` }
            fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch((error) => console.error(error));
        }

    }, [retrieve]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Cá nhân!</Text>
        </View>
    );
}

