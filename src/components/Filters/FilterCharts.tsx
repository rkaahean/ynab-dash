import { Box, Container, Tabs } from '@mantine/core';

export const FilterCharts = (props) => {
	return (
		<>
			<Box
				sx={(theme) => ({
					backgroundColor: theme.colors.gray[1],
					textAlign: 'center',
					padding: theme.spacing.lg,
					borderRadius: theme.radius.md,
					width: '20vw',
					marginBottom: '5vh',
					borderTopLeftRadius: '0',
					borderTopRightRadius: '0',
				})}
			>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						marginTop: '1vh',
						alignItems: 'center',
						maxHeight: '100%',
					}}
				>
					<Tabs
						variant="pills"
						orientation="vertical"
						defaultValue="bar-time-vs-amount"
						onTabChange={props.handleSelect}
					>
						<Tabs.List
							position="center"
							grow
							sx={{
								height: '20vh',
								width: '15vw',
								textAlign: 'center',
							}}
						>
							<Tabs.Tab value="bar-time-vs-amount">Amount over Time</Tabs.Tab>
							<Tabs.Tab value="messages">Messages</Tabs.Tab>
							<Tabs.Tab value="settings">Settings</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</Container>
			</Box>
		</>
	);
};
