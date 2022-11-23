import { FilterAccounts } from '../Filters/FilterAccounts';
import { FilterDates } from '../Filters/FilterDates';
import {
	Affix,
	Box,
	Button,
	Container,
	Divider,
	Transition,
	Text,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

export const TransactionsFilter = (props: any) => {
	const [scroll, scrollTo] = useWindowScroll();
	const updateLocation = () => {
		return 30 + scroll.y;
	};
	return (
		<Container
			style={{
				display: 'flex',
				width: '30vw',
				paddingTop: '2rem',
				marginRight: '5rem',
				marginLeft: '5rem',
				maxHeight: '50vh',
			}}
		>
			<Affix position={{ top: updateLocation(), left: 20 }}>
				<Transition transition="slide-up" mounted={true}>
					{(transitionStyles) => (
						<Box
							sx={(theme) => ({
								backgroundColor: theme.colors.gray[2],
								textAlign: 'center',
								padding: theme.spacing.lg,
								borderRadius: theme.radius.md,
							})}
							style={transitionStyles}
						>
							<FilterAccounts
								accountFilters={props.accountFilters}
								handleAccountFilters={props.handleAccountFilters}
							/>
							<Divider my="sm" />
							<FilterDates
								dateFilters={props.dateFilters}
								setDateFilters={props.setDateFilters}
							/>
						</Box>
					)}
				</Transition>
			</Affix>
		</Container>
	);
};
