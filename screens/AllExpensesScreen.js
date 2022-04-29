import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

//React Redux
import { useDispatch, useSelector } from 'react-redux';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import ExpenseItem from '../components/ExpenseItem';
import TotalExpense from '../components/TotalExpense';
import ExpenseList from '../components/ExpenseList';
import EmptyRecord from '../components/EmptyRecord';
import moment from 'moment';

import { fetchExpenses } from '../services/expenseServices';
import { setExpenses } from '../redux/expenses';
import LoadingIndicator from '../components/LoadingIndicator';


function AllExpensesScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const totalExpense = useSelector((state) => state.expensesRdx.total);
    const expenseList = useSelector((state) => state.expensesRdx.expenseList);
    const sortedList = expenseList.slice().sort((a,b) => moment(b.date, 'DD/MM/YYYY')-moment(a.date, 'DD/MM/YYYY'));
    
    const [isLoading, setLoading] = useState(true); //init loading true
    
    
    function onPressHandler() {
        navigation.navigate('ManageExpense');
    }

    //buttun Add added after render layout
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

    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
            dispatch(setExpenses(expenses));
            setLoading(false);
        }
        getExpenses();
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.expenseContainer}>
                <TotalExpense value={totalExpense} />
                {
                    (sortedList.length > 0 && !isLoading) ? 
                    <ExpenseList data={sortedList} /> :
                    (isLoading) ? <LoadingIndicator size="large" showText={true}/> : <EmptyRecord/>
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
        backgroundColor: '#1e63e9',
    },

    expenseContainer: {
        flex: 1,
        padding: 24,
        width: '100%'
    },

});