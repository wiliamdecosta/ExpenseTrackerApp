import axios from "axios";
import Expense from "../models/expense";


const API_URL = "https://react-native-db-d9515-default-rtdb.asia-southeast1.firebasedatabase.app"; 

export async function storeExpense(expenseData) {
    await axios.post(API_URL + "/expense_db.json",expenseData);
}

export async function fetchExpenses() {
    const response = await axios.get(API_URL+"/expense_db.json");
    const expenses = [];

    for(const key in response.data) {
        const newObject = new Expense(
            key,
            response.data[key].title,
            response.data[key].cost,
            response.data[key].date,
        );

        expenses.push(newObject);
    }
    return expenses;
}

export async function updateExpense(id, data) {
    await axios.put(API_URL + `/expense_db/${id}.json`, data);
}

export async function deleteExpense(id) {
    await axios.delete(API_URL + `/expense_db/${id}.json`);
}