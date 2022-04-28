import {FlatList} from 'react-native';
import ExpenseItem from './ExpenseItem';

function ExpenseList({data}) {
    return (
    <FlatList data={data} 
            keyExtractor={(expense) => expense.id}
            renderItem={(item) => {
                return <ExpenseItem data={item}/>
            }}
            showsVerticalScrollIndicator={false}
    />);
}

export default ExpenseList;
