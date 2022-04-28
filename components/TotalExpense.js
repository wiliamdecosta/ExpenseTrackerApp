import {View, Text, StyleSheet} from 'react-native';
import NumberFormat from 'react-number-format';

function TotalExpense({value, title="Total"}) {
    return (
        <View style={styles.totalContainer}>
            <Text style={styles.total}>{title}</Text>
            <NumberFormat value={value} 
                displayType={'text'} 
                thousandSeparator='.'
                decimalSeparator=',' 
                prefix={'Rp'} 
                renderText={(value) => {
                    return (<Text style={styles.total}>{value}</Text>);
                }}/>
        </View>
    );
}

export default TotalExpense;

const styles = StyleSheet.create({
    totalContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e0d4fc',
        borderRadius: 10,
    },

    total: {
        fontFamily: 'poppins-bold',
        fontSize: 16,
        color: '#48368b',
    },
});
