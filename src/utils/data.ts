import * as ynab from 'ynab';
import { PERSONAL_ACCESS_TOKEN } from './constants';

export async function getData() {
	const ynabAPI = new ynab.API(PERSONAL_ACCESS_TOKEN);
	const budgetsResponse = await ynabAPI.budgets.getBudgets();
	const budgets = budgetsResponse.data.budgets;
	for (let budget of budgets) {
		console.log(`Budget Name: ${budget.id}`);
		// getting transactions of budget
		const transactions = await ynabAPI.transactions.getTransactions(budget.id);
		console.log(transactions);
	}
}

export async function getAllBudgets() {
	const ynabAPI = new ynab.API(PERSONAL_ACCESS_TOKEN);
	const budgetsResponse = await ynabAPI.budgets.getBudgets();
	const budgets = budgetsResponse.data.budgets;

	return budgets;
}

export async function getTransactions(budgetID: string, n: number = 10) {
	const ynabAPI = new ynab.API(PERSONAL_ACCESS_TOKEN);
	const response = await ynabAPI.transactions.getTransactions(budgetID);
	return response.data.transactions.slice(0, n);
}

export async function getAccounts(budgetID: string) {
	const ynabAPI = new ynab.API(PERSONAL_ACCESS_TOKEN);
	const response = await ynabAPI.accounts.getAccounts(budgetID);
	return response.data.accounts;
}

export async function getTransactionsForAccounts(
	budgetID: string,
	n: number = 10,
	accounts: string[]
) {
	console.log('Attempting to get data');
	const ynabAPI = new ynab.API(PERSONAL_ACCESS_TOKEN);
	const response = await ynabAPI.transactions.getTransactions(budgetID);
	return response.data.transactions.slice(0, n);
}

export async function getCategoryFromID(categoryID: string) {
	console.log('getting category');
	const ynabAPI = new ynab.API(PERSONAL_ACCESS_TOKEN);
	const response = await ynabAPI.categories.getCategoryById(
		'7b6884f5-21d3-4a98-a9e9-f9365efe70dc',
		categoryID
	);
	if (response.data.category) {
		return response.data.category.name;
	}
	return '-';
}
