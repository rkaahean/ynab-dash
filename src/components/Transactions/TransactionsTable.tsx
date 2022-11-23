import { useState } from 'react';
import { YNABTransaction } from '../../types/ynab';
import { TransactionEntry } from './TransactionEntry';
import { Table, Container, Space } from '@mantine/core';
import { TablePagination } from '../Pagination';
import { useEffect } from 'react';
import { Header } from '../Header';

const TransactionData = (props) => {
	return (
		<>
			{getEligibleTransactions(props.transactions).map((item: any) => {
				return (
					<TransactionEntry
						key={item.id}
						memo={item.memo}
						amount={item.amount}
						date={item.date}
						account_id={item.account_id}
					/>
				);
			})}
		</>
	);
};

export const TransactionsTable = (props: any) => {
	// this function is for rendering information in a table
	// regarding the transactions in YNAB

	// setting state for the pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [transactionsPerPage, setTransactionsPerPage] = useState(10);

	// get the current page number
	const indexOfLastTransaction = currentPage * transactionsPerPage;
	const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

	// pagination logic
	const getEligibleTransactions = (transactions: YNABTransaction[]) => {
		// const filteredTransactions = getFilteredTransactions(transactions);
		const transactionsToShow = transactions.slice(
			indexOfFirstTransaction,
			indexOfLastTransaction
		);
		return transactionsToShow;
	};
	const onPaginationClick = (currentPage: number) =>
		setCurrentPage(currentPage);

	// reset the current page to 1 whenever filters are changed
	useEffect(() => {
		setCurrentPage(1);
	}, [props.dateFilters, props.accountFilters]);

	const renderTable = (props: any) => {
		if (props.transactions.length > 0) {
			console.log('Length', props.transactions.length);
			const transactionItems: JSX.Element[] = [];
			getEligibleTransactions(props.transactions).map((item: any) => {
				transactionItems.push(
					<TransactionEntry
						key={item.id}
						memo={item.memo}
						amount={item.amount}
						date={item.date}
						account_id={item.account_id}
					/>
				);
			});
			return transactionItems;
		} else {
			return (
				<Space
					sx={{
						height: '43vh',
					}}
				/>
			);
		}
	};

	return (
		<Container
			className="transaction-table-root"
			sx={{
				width: '80vw',
				marginLeft: '0rem',
				paddingLeft: '0rem',
			}}
			style={{
				maxWidth: '100%',
			}}
		>
			<Header
				heading="Transaction"
				sx={{
					marginTop: '0rem',
				}}
			/>
			<Table verticalSpacing="md" highlightOnHover>
				<thead className="text-center">
					<tr>
						<th scope="col" width="75">
							Date
						</th>
						<th scope="col" width="300">
							Details
						</th>
						<th scope="col" width="100">
							Amount
						</th>
						<th scope="col" width="200">
							Account
						</th>
					</tr>
				</thead>
				<tbody>
					{/* {getEligibleTransactions(props.transactions).map((item: any) => {
						return (
							<TransactionEntry
								key={item.id}
								memo={item.memo}
								amount={item.amount}
								date={item.date}
								account_id={item.account_id}
							/>
						);
					})} */}
					{renderTable(props)}
				</tbody>
			</Table>
			<TablePagination
				currentPage={currentPage}
				elementsPerPage={transactionsPerPage}
				totalElements={props.transactions.length}
				handlePaginationClick={onPaginationClick}
			/>
		</Container>
	);
};
