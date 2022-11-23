import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	BarElement,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { YNABTransaction } from '../../types/ynab';
import {
	Box,
	Container,
	Paper,
	Select,
	Space,
	Tabs,
	Text,
} from '@mantine/core';
import { Header } from '../Header';
import { BarDateAmount } from '../../charts/BarDateAmount';
import { FilterCharts } from '../Filters/FilterCharts';
import { useState } from 'react';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const TransactionCharts = (props: {
	transactions: YNABTransaction[];
}) => {
	// get the current selected tab
	const [selectedTab, setSelectedTab] = useState<string>();

	// handle the switching logic for account filters

	return (
		<>
			<Header heading="Charts" />
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					width: '70vw',
					height: '60vh',
					maxWidth: '100%',
					margin: '0rem',
					padding: '0rem',
				}}
			>
				<FilterCharts selectedTab={selectedTab} handleSelect={setSelectedTab} />
				<BarDateAmount transactions={props.transactions} />
			</Container>
		</>
	);
};
