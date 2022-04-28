import {Text, StyleSheet} from 'react-native';

function FormTitle({children}) {
    return <Text style={styles.title}>{children}</Text>;
}

export default FormTitle;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'poppins-bold',
        fontSize: 18,
        color: '#e0d4fc',
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#e0d4fc',
        marginBottom: 15,
    },
});