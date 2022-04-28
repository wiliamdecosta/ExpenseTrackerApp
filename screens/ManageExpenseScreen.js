import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Alert, 
    Pressable,
    ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useState, useLayoutEffect } from 'react';
import FormTitle from '../components/FormTitle';
import TextButton from '../components/TextButton';
import Ionicons from '@expo/vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import Expense from '../models/expense';
import {addExpense, updateExpense, removeExpense} from '../redux/expenses';
import moment from 'moment';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FieldTitle from '../components/FieldTitle';
import NumberFormat from 'react-number-format';

function ManageExpenseScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const route = useRoute();
    const params = route.params;
    const expenseId = params === undefined ? 0 : params.id;

    let myExpense;
    let initTitle = '';
    let initCost = '';
    let initDate = '';

    if(expenseId !== 0) { //edit mode
        const myExpenseList = useSelector((state) => state.expensesRdx.expenseList);
        myExpense = myExpenseList.find((expense) => expense.id === expenseId);

        if(myExpense !== undefined) {
            initTitle =  myExpense.title;
            initCost = myExpense.cost.toString();
            initDate = myExpense.date;
        }
    }

    const [currentDate, setCurrentDate] = useState(expenseId !== 0 ? initDate : moment(new Date()).format('DD/MM/YYYY'));
    const [nowDate, setNowDate] = useState(expenseId !== 0 ? moment(initDate,'DD/MM/YYYY').toDate() : new Date());

    //Untuk Form
    const [expenseTitle, setTitle] = useState(initTitle);
    const [expenseCost, setCost] = useState(initCost);
    const [expenseDate, setDate] = useState(currentDate);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    
    
    function onDeleteExpenseHandler() {
        Alert.alert("Confirmation", "Are you sure to delete this expense?",[
            {text: 'Cancel', style: "cancel"},
            {text: 'Yes, I am sure', onPress:() => {

                    dispatch(removeExpense({id: expenseId}));
                    navigation.goBack();
                },
            },
        ]);
        
    }

    useLayoutEffect(() => {
        if(expenseId !== 0) {
            navigation.setOptions({
                headerRight: () => {
                    return <Ionicons 
                                name='trash' 
                                size={24} 
                                color='white' 
                                onPress={onDeleteExpenseHandler}/>
                }
            });
        }
    },[expenseId, navigation, onDeleteExpenseHandler]);
    
    
    function onChangeExpenseTitle(enteredVal) {
        setTitle(enteredVal);
    }

    function onChangeExpenseCost(enteredVal) {
        setCost(enteredVal);
    }

    function onChangeExpenseDate(enteredVal) {
        setDate(enteredVal);
    }

    function onBackPressHandler() {
        navigation.goBack();
    }

    function resetForm() {
        setTitle('');
        setCost('');
        setDate(moment(new Date()).format('DD/MM/YYYY'));
    }

    function validateForm() {
        let errorMessage = '';
        if(expenseTitle == '') {
            errorMessage += "\n- Expense Title is empty";
        }

        if(expenseCost == '') {
            errorMessage += "\n- Expense Cost is empty";
        }else {
            let val = parseInt(expenseCost);
            if(val <= 0) {
                errorMessage += "\n- Expense Cost must greater than 0";
            }
        }

        if(expenseDate == '') {
            errorMessage += "\n- Expense Date is empty";
        }

        return errorMessage;
    }

    function onAddPressHandler() {
        
        const errorMessage = validateForm();
        
        if(errorMessage !== ''){
            Alert.alert("Please check your input",errorMessage);
            return;
        }
        
        dispatch(addExpense(new Expense(
            null,
            expenseTitle,
            parseInt(expenseCost),
            expenseDate,
        )));

        resetForm();
    }

    function onUpdatePressHandler() {
        const errorMessage = validateForm();
        
        if(errorMessage !== ''){
            Alert.alert("Please check your input",errorMessage);
            return;
        }
        
        const newExpense = new Expense(
            myExpense.id,
            expenseTitle,
            parseInt(expenseCost),
            expenseDate,
        );

        dispatch(updateExpense({id:myExpense.id, item: newExpense}));

        navigation.goBack();
    }

    function showDatePicker() {
        setDatePickerVisible(true);
    }

    function onChangeDatePicker(event, selectedDate) {
        if(event.type !== 'dismissed') {
            setDatePickerVisible(false);
            setNowDate(selectedDate);
            setCurrentDate(moment(selectedDate).format('DD/MM/YYYY'));
            setDate(moment(selectedDate).format('DD/MM/YYYY'));
        }else {
            setDatePickerVisible(false);
        }
    }

    return (
        <ScrollView>
        <View style={styles.screen}>
            <View style={styles.formContainer}>
                <FormTitle> {(expenseId != 0) ? 'Edit' : 'Add'} Your Expense : </FormTitle>
                <View style={styles.inputContainer}>
                    <FieldTitle title="Description :" />
                    <TextInput
                        maxLength={50}
                        onChangeText={onChangeExpenseTitle}
                        placeholder='Enter your description (e.g "Buy Hambuger")'
                        style={styles.textInput}
                        value={expenseTitle}
                    />

                    <FieldTitle title="Expense (Rp.) : " />
                    <TextInput
                        maxLength={8}
                        onChangeText={onChangeExpenseCost}
                        placeholder='Your Expense in Rupiah (e.g 50000)'
                        style={styles.textInput}
                        value={expenseCost}
                        keyboardType='decimal-pad'
                    />
                                       
                    <FieldTitle title="Date :" />
                    <Pressable onPress={showDatePicker}>
                        <Text style={styles.textInput}
                            >{expenseDate}</Text>
                    </Pressable>
                    {datePickerVisible && (
                        <DateTimePicker
                            value={nowDate}
                            mode='date'
                            is24Hour={false}
                            onChange={onChangeDatePicker}
                        />
                    )}
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <TextButton
                            title='Cancel'
                            backgroundColor='#f31282'
                            onPress={onBackPressHandler}
                        />
                    </View>
                    <View style={styles.button}>
                        <TextButton
                            title={expenseId != 0 ? 'Update':'Save'}
                            backgroundColor='#71de5e'
                            onPress={expenseId != 0 ? onUpdatePressHandler : onAddPressHandler}
                        />
                    </View>
                </View>
            </View>
        </View>
        </ScrollView>
    );
}

export default ManageExpenseScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    formContainer: {
        flex: 1,
        padding: 24,
        width: '100%',
    },

    inputContainer: {
        marginBottom: 15,
    },

    textInput: {
        fontFamily: 'poppins',
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        padding: 8,
        marginBottom: 10,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },

    button: {
        flex: 1,
        marginHorizontal: 5,
    },

});