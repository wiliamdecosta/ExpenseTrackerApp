import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NumberFormat from 'react-number-format';


function ExpenseItem({data}) {
    const navigation = useNavigation();
    
    function onPressExpenseItemHandler() {
        navigation.navigate("ManageExpense",{id: data.item.id});
    }

    return (
        <TouchableOpacity onPress={onPressExpenseItemHandler}>
            <View style={styles.expenseItemContainer}>
                <View style={styles.expenseRowContainer}>
                    <View style={styles.detailContainer}>
                        <Text numberOfLines={1} style={styles.itemTitle}>{data.item.title}</Text>
                        <Text numberOfLines={1} style={styles.itemDate}>{data.item.date}</Text>    
                    </View>
                    <View style={styles.costContainer}>
                            <NumberFormat value={data.item.cost} 
                                displayType={'text'} 
                                thousandSeparator='.'
                                decimalSeparator=','
                                renderText={(value) => {
                                    return (<Text numberOfLines={1} style={styles.itemCost}>{value}</Text>);
                                }}/>
                        
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
    
}

export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItemContainer: {
        backgroundColor: '#3618b8',
        borderRadius: 10,
        marginTop: 10,
    },

    expenseRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },

    detailContainer:{
        flex: 4,
        marginRight: 10,
    },

    itemTitle: {
        fontFamily: 'poppins-bold',
        color: 'white',
        fontSize:15,
    },

    itemDate: {
        fontFamily: 'poppins',
        color: 'yellow',
        fontSize:11,
    },

    costContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        flex:1,
    },

    itemCost: {
        fontFamily: 'poppins-bold',
        color: '#28137c',
        fontSize: 14,
        overflow: 'hidden'
    },
});