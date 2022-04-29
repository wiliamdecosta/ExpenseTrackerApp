import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';

function LoadingIndicator({text="Please Wait...", color="#ffffff", size="large", showText=true}) {
    return <View style={styles.loading}>
        <ActivityIndicator size={size} color={color}/>
        {
            showText && <Text style={styles.loadingText}>{text}</Text>
        }
    </View>
}

export default LoadingIndicator;

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    loadingText: {
        fontSize: 14,
        fontFamily: 'poppins',
        color: 'white'
    },
});