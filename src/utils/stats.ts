import { count } from 'console';
import { YNABTransaction } from './../types/ynab.d';
import { getCategoryFromID } from './data';
import { convertToUSD, formatAmount } from './format';

export const getTotalAmount = (transactions: YNABTransaction[]) => {
	let sum = 0;
	transactions.forEach((item) => {
		sum += convertToUSD(item.amount, false);
	});
	return formatAmount(sum, 0);
};

export const getHigherSpendCategory = (transactions: YNABTransaction[]) => {
	if (transactions.length === 0) {
		return '';
	}
	let categoryCount: any = {};
	transactions.forEach((item) => {
		categoryCount[item.category_id] = categoryCount[item.category_id]
			? categoryCount[item.category_id] + 1
			: 1;
	});
	const result = Object.entries(categoryCount).reduce((a: any, b: any) =>
		a[1] > b[1] ? a : b
	)[0];
	return result;
};
