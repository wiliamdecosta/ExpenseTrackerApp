import {NavigationContainer} from '@react-navigation/native';
import AllExpensesScreen from './screens/AllExpensesScreen';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import RecentExpensesScreen from './screens/RecentExpensesScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

function AppNavigation() {
    const Stack = createNativeStackNavigator();
    const headerStyles = {
        headerStyle: { backgroundColor: '#2c387e' },
        headerTitleStyle: { fontFamily: 'poppins' },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: '#1e63e9' },
        animation: 'none',
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='ExpenseOverview'
                screenOptions={{ ...headerStyles }}>
                <Stack.Screen name="ExpenseOverview" component={ExpenseOverview}
                    options={{
                        headerShown: false,
                    }} />
                <Stack.Screen name="ManageExpense" component={ManageExpenseScreen}
                    options={{ title: 'Manage Expense' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;


function ExpenseOverview() {
    const BottomTabs = createBottomTabNavigator();

    const headerStyles = {
        headerStyle: { backgroundColor: '#2c387e' },
        headerTitleStyle: { fontFamily: 'poppins' },
        headerTintColor: 'white',
        tabBarStyle: {
            backgroundColor: '#2c387e',
        },
        tabBarActiveTintColor: 'yellow',
        tabBarInactiveTintColor: 'white',
    };

    return (
        <BottomTabs.Navigator screenOptions={{ ...headerStyles }}
            initialRouteName="AllExpenses">
            <BottomTabs.Screen name="RecentExpenses"
                component={RecentExpensesScreen}
                options={{
                    title: 'Recents',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="hourglass" color={color} size={size} />
                    ),
                }} />
            <BottomTabs.Screen name="AllExpenses"
                component={AllExpensesScreen}
                options={{
                    title: 'Expenses',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-calculator" color={color} size={size} />
                    ),
                }} />
        </BottomTabs.Navigator>
    );
}
