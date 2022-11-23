import { DateRangePicker } from '@mantine/dates';
import { sub } from 'date-fns';
import { SegmentedControl, Space } from '@mantine/core';
import { Container } from '@mantine/core';

export const FilterDates = (props: any) => {
	// method to handle quick filters

	const handleDateSelect = (event: any) => {
		console.log(event);
		// const eventId = event.target.id;
		if (event === 'last-1-month') {
			props.setDateFilters([sub(new Date(), { months: 1 }), new Date()]);
		} else if (event === 'last-3-month') {
			props.setDateFilters([sub(new Date(), { months: 3 }), new Date()]);
		} else {
			props.setDateFilters([sub(new Date(), { years: 1 }), new Date()]);
		}
	};

	return (
		<Container
			size="xl"
			style={{
				maxWidth: '100%',
				marginLeft: '1rem',
				marginRight: '3rem',
				marginTop: '2rem',
			}}
		>
			<DateRangePicker
				label="Transaction Dates"
				placeholder="Pick dates range"
				value={props.dateFilters}
				onChange={props.setDateFilters}
				sx={{ textAlign: 'left' }}
			/>
			<Space />
			<SegmentedControl
				color="blue"
				placeholder="Last Month"
				onChange={handleDateSelect}
				defaultValue={'last-1-month'}
				sx={{ marginTop: '1rem' }}
				data={[
					{
						value: 'last-1-month',
						label: 'Last Month',
					},
					{ value: 'last-3-month', label: 'Last 3 Months' },
					{ value: 'last-1-year', label: '1 YTD' },
				]}
			/>
		</Container>
	);
};
