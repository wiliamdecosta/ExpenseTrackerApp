import {Text, StyleSheet} from 'react-native';

function FormTitle({children}) {
    return <Text style={styles.title}>{children}</Text>;
}

export default FormTitle;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'poppins-bold',
        fontSize: 18,
        color: 'yellow',
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'yellow',
        marginBottom: 15,
    },
});