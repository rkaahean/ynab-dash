import { DateRangePickerValue } from '@mantine/dates';
import { formatISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { TransactionCharts } from '../components/Transactions/TransactionCharts';
import { TransactionsFilter } from '../components/Transactions/TransactionsFilter';
import { TransactionsTable } from '../components/Transactions/TransactionsTable';
import { YNABTransaction } from '../types/ynab';
import { getTransactions } from '../utils/data';
import { Title, Container, Box } from '@mantine/core';
import { TransactionsSummary } from '../components/Transactions/TransactionsSummary';
import { Header } from '../components/Header';

export function Transactions() {
	// setting state for account filters
	const [accountFilters, setAccountFilters] = useState<string[]>([
		'empty-data',
	]);
	// setting the state for date filters
	const [dateFilters, setDateFilters] = useState<DateRangePickerValue>([
		new Date(2022, 1, 1),
		new Date(2022, 5, 1),
	]);
	// getting the transaction data
	const [transactions, setTransaction] = useState<YNABTransaction[]>([
		{
			memo: '-',
			amount: 0,
			date: '1970-01-01',
			account_id: 'sda',
			category_id: 'temp',
		},
	]);

	// handle getting transaction data
	useEffect(() => {
		console.log('Re rendering transactions data...');
		getTransactions('7b6884f5-21d3-4a98-a9e9-f9365efe70dc', 20000).then(
			(data) => setTransaction(data)
		);
	}, []);

	// handle the switching logic for account filters
	const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		let updatedFilters = [...accountFilters];
		if (event.target.checked) {
			updatedFilters = [...accountFilters, event.target.id];
		} else {
			// remove the target item from the list if already present
			updatedFilters.splice(accountFilters.indexOf(event.target.id), 1);
		}
		setAccountFilters(updatedFilters);
	};

	// handle filtering of tranasction data
	const isTransactionApplicable = (item: YNABTransaction) => {
		if (dateFilters[0] == null || dateFilters[1] == null) {
			return false;
		}
		// given the filters, see if a transaction can be displayed

		// check if transaction in account
		const isSelectedAccount = accountFilters.includes(item.account_id);

		// check if transaction in selected date range
		const isSelectedDateRange =
			item.date >= formatISO(dateFilters[0], { representation: 'date' }) &&
			item.date <= formatISO(dateFilters[1], { representation: 'date' });

		return isSelectedAccount && isSelectedDateRange;
	};
	// applying fitlering logic
	const getFilteredTransactions = (transactions: YNABTransaction[]) => {
		const filteredTransactions = transactions.filter((item) =>
			isTransactionApplicable(item)
		);
		return filteredTransactions;
	};

	// store filtered transactions
	const filteredTransactions = getFilteredTransactions(transactions);

	return (
		<Container
			sx={{
				display: 'flex',
				maxWidth: '100%',
				alignItems: 'flex-start',
			}}
		>
			<TransactionsFilter
				className="transaction-filters"
				accountFilters={accountFilters}
				dateFilters={dateFilters}
				handleAccountFilters={handleSwitch}
				setDateFilters={setDateFilters}
			/>
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					maxWidth: '100%',
				}}
				style={{
					marginRight: '3rem',
				}}
			>
				<Container
					sx={{
						display: 'flex',
						width: '70vw',
						maxWidth: '100%',
					}}
					style={{
						margin: '0rem',
						padding: '0rem',
						maxWidth: '100%',
					}}
				>
					<TransactionsTable
						className="transactions-table-call"
						accountFilters={accountFilters}
						dateFilters={dateFilters}
						transactions={filteredTransactions}
					/>
					<TransactionsSummary transactions={filteredTransactions} />
				</Container>
				<TransactionCharts transactions={filteredTransactions} />
			</Container>
		</Container>
	);
}
