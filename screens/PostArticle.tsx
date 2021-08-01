import { NativeBaseProvider, Button } from 'native-base';
import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function PostArticle() {
    
    return (
        <SafeAreaView style={styles.container}>
            <NativeBaseProvider>
                <Button size="md" marginTop='10' backgroundColor='#c4b5fd' onPress={() => console.log()}>Tạo bài viết</Button>
            </NativeBaseProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0ea5e9'
    },
});