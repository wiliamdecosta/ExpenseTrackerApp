import {configureStore} from '@reduxjs/toolkit';
import expensesReducer from './expenses';

export const store = configureStore({
    reducer: {
        expensesRdx : expensesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                                            serializableCheck: false,
                                        }),
});