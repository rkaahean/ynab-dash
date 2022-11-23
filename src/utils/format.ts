import { round } from 'mathjs';
export const convertToUSD = (amount: number, abs: boolean) => {
	if (amount === 0) {
		return 0;
	}
	if (abs) {
		return Math.abs(amount) / 1000;
	} else {
		return amount / 1000;
	}
};

export const currencyFormatter = (currency: string) => {
	// Create our number formatter.
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
	});
	return formatter;
};

export const formatAmount = (amount: number, roundPlaces: number) => {
	return currencyFormatter('USD').format(round(amount, roundPlaces));
};
