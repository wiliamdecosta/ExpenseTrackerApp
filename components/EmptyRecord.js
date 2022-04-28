import {Text, StyleSheet} from 'react-native';

function EmptyRecord() {
    return (<Text style={styles.emptyRecord}> No Expense Yet </Text>);
}

export default EmptyRecord;

const styles = StyleSheet.create({
    emptyRecord: {
        fontFamily: 'poppins',
        fontSize: 18,
        textAlign: 'center',
        color: 'yellow',
        marginTop: 24,
    },
});