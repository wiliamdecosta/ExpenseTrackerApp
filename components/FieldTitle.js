import {Text, StyleSheet} from 'react-native';

function FieldTitle({title}) {
    return(
        <Text style={styles.title}>{title}</Text>
    );
}

export default FieldTitle;

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontFamily: 'poppins',
        fontSize: 14,
        marginBottom:2,
    },
});