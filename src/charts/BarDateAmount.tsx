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
import { YNABTransaction } from '../types/ynab';
import { convertToUSD } from '../utils/format';
import { Card, Container } from '@mantine/core';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const BarDateAmount = (props: any) => {
	const dataset = {
		labels: props.transactions.map((data: YNABTransaction) => data.date),
		datasets: [
			{
				label: 'Amount',
				data: props.transactions.map((data: YNABTransaction) =>
					convertToUSD(data.amount, true)
				),
				backgroundColor: '#E3F2FD',
				borderColor: '#4A148C',
				borderWidth: 2,
			},
		],
	};

	const options = {
		scales: {
			x: {
				ticks: {
					maxTicksLimit: 10,
				},
				grid: {
					drawBorder: false,
					display: false,
				},
			},
			y: {
				grid: {
					drawBorder: false,
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return (
		<>
			<Card
				sx={{
					width: '60vw',
					height: '55vh',
					marginRight: '2vw',
					maxWidth: '100%',
				}}
			>
				<Bar data={dataset} options={options} />
			</Card>
		</>
	);
};
