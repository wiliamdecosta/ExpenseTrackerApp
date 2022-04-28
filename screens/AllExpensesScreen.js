import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

//React Redux
import { useSelector } from 'react-redux';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import ExpenseItem from '../components/ExpenseItem';
import TotalExpense from '../components/TotalExpense';
import ExpenseList from '../components/ExpenseList';
import EmptyRecord from '../components/EmptyRecord';

function AllExpensesScreen() {
    const navigation = useNavigation();
    const expenseList = useSelector((state) => state.expensesRdx.expenseList);
    const totalExpense = useSelector((state) => state.expensesRdx.total);

    function onPressHandler() {
        navigation.navigate('ManageExpense');
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={onPressHandler}>
                        <Ionicons name="add" size={36} color='white' />
                    </TouchableOpacity>
                );
            }
        });
    }, [onPressHandler]);

    return (
        <View style={styles.screen}>
            <View style={styles.expenseContainer}>
                <TotalExpense value={totalExpense} />
                {
                    (expenseList.length > 0) ? 
                    <ExpenseList data={expenseList} /> :
                    <EmptyRecord/>
                }
            </View>
        </View>
    );
}

export default AllExpensesScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28137c',
    },

    expenseContainer: {
        flex: 1,
        padding: 24,
        width: '100%'
    },

});