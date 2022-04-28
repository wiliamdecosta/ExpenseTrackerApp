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

import moment from 'moment';

function getRecentExpensesList(list, days) {
    const today = moment();
    const nDaysBefore = moment().subtract(days, 'days');
    console.log(nDaysBefore);

    let theDate;
    const recentList = list.filter((expense) => {
        theDate = moment(expense.date, 'DD/MM/YYYY');
        console.log(theDate);
        return theDate.isBetween(nDaysBefore, today, 'day','[]');
    });

    return recentList;
}

const LAST_DAY = 5;

function RecentExpensesScreen() {
    const navigation = useNavigation();
    const expenseList = useSelector((state) => state.expensesRdx.expenseList);
    
    let totalExpense = 0;
    const recentExpenseList = getRecentExpensesList(expenseList, LAST_DAY);
    recentExpenseList.forEach(item => {
        totalExpense += parseInt(item.cost);
    });

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

    const title = "Last " + LAST_DAY + " days";
    return (
        <View style={styles.screen}>
            <View style={styles.expenseContainer}>
                <TotalExpense value={totalExpense} title={title}/>
                {
                    (recentExpenseList.length > 0) ? 
                    <ExpenseList data={recentExpenseList} /> :
                    <EmptyRecord/>
                }
            </View>
        </View>
    );
}

export default RecentExpensesScreen;

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