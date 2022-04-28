import {createSlice} from '@reduxjs/toolkit';
import Expense from '../models/expense';

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenseList: [
            new Expense(1, 'Nasi Padang', 25000, '27/04/2022'),
            new Expense(2, 'Minyak Goreng 2 Liter', 48000, '27/04/2022'),
        ],
        lastSequenceId : 3,
        total: 73000,
    },
    reducers: {
        addExpense: (state, action) => {
            var item = action.payload;
            item.id = state.lastSequenceId;

            state.expenseList.push(item);
            state.lastSequenceId += 1;
            state.total += item.cost;

        },

        updateExpense: (state, action) => {
            const updateId = action.payload.id;

            const idx = state.expenseList.findIndex((expense) => expense.id === updateId);
            const oldItem = state.expenseList.find((expense) => expense.id === updateId);
                        
            state.expenseList[idx] = action.payload.item;
            state.total = state.total + action.payload.item.cost - oldItem.cost;
        },

        removeExpense: (state, action) => {
            const idx = state.expenseList.findIndex((expense) => expense.id === action.payload.id);
            const oldItem = state.expenseList.find((expense) => expense.id === action.payload.id )
            state.expenseList.splice(idx,1);
            state.total -= oldItem.cost;
        },
    },
});

export const addExpense = expensesSlice.actions.addExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export const removeExpense = expensesSlice.actions.removeExpense;

export default expensesSlice.reducer;