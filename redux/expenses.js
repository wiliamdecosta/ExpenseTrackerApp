import {createSlice} from '@reduxjs/toolkit';

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenseList: [],
        total: 0,
    },
    reducers: {
        setExpenses: (state, action) => {
            state.expenseList = action.payload;
            let totalExpense = 0;
            state.expenseList.forEach(expense => {
                totalExpense += parseInt(expense.cost);
            });
            state.total = totalExpense;
        },

        removeExpense: (state, action) => {
            const idx = state.expenseList.findIndex((expense) => expense.id === action.payload.id);
            const oldItem = state.expenseList.find((expense) => expense.id === action.payload.id )
            state.expenseList.splice(idx,1);
            state.total -= oldItem.cost;
        },
    },
});

export const removeExpense = expensesSlice.actions.removeExpense;
export const setExpenses = expensesSlice.actions.setExpenses;

export default expensesSlice.reducer;