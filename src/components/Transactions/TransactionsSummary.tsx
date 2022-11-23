import { Card, Title, Container, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getCategoryFromID } from '../../utils/data';
import { getHigherSpendCategory, getTotalAmount } from '../../utils/stats';

const StatCard = (props: any) => {
	return (
		<>
			<Card
				shadow="md"
				p="sm"
				radius="sm"
				sx={(theme) => ({
					marginRight: '0rem',
					marginLeft: '0rem',
					marginTop: '1rem',
					width: props.size == 'sm' ? '8vw' : '16vw',
					height: '18vh',
					backgroundColor: theme.colors.gray[2],
					'&:hover': {
						backgroundColor: theme.colors.cyan[1],
					},
				})}
			>
				<Container
					className="stat-text-root"
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						alignItems: 'center',
						height: '100%',
					}}
				>
					<Title
						style={{
							fontWeight: '600',
							fontFamily: 'Greycliff CF, sans-serif',
						}}
						sx={(theme) => ({
							color: theme.colors.blue[6],
							size: '5vh',
						})}
					>
						{props.stat}
					</Title>
					<Text size="md" color="dimmed" weight={400} italic>
						{props.caption}
					</Text>
				</Container>
			</Card>
		</>
	);
};

export const TransactionsSummary = (props: any) => {
	// getting the transaction data

	const [categoryName, setCategory] = useState<string>();

	useEffect(() => {
		const t = getHigherSpendCategory(props.transactions);
		getCategoryFromID(t).then((data) => {
			console.log(data);
			setCategory(data);
		});
	}, [props.transactions]);
	return (
		<>
			<Container
				sx={{
					display: 'flex',
					width: '60vw',
					height: '60vh',
					paddingTop: '1rem',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
				}}
			>
				<>
					<StatCard
						size="lg"
						stat={categoryName}
						caption="Most frequent category"
					/>
					<StatCard
						size="sm"
						stat={getTotalAmount(props.transactions)}
						caption="Total Amount"
					/>
					<StatCard
						size="sm"
						stat={props.transactions.length}
						caption="Transactions Count"
					/>
					<StatCard size="lg" />
					<StatCard size="lg" />
					<StatCard size="sm" />
				</>
			</Container>
		</>
	);
};
