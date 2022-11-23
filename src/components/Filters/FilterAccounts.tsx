import React from 'react';
import { useEffect, useState } from 'react';
import { YNABAccount } from '../../types/ynab';
import { getAccounts } from '../../utils/data';
import { Switch, Container, Box, MultiSelect } from '@mantine/core';

export const FilterAccounts = (props: any) => {
	// setting state
	const [accounts, setAccount] = useState<YNABAccount[]>([]);

	// rendering the list of accounts present for the user
	useEffect(() => {
		getAccounts('7b6884f5-21d3-4a98-a9e9-f9365efe70dc').then((data) => {
			setAccount(data);
		});
	}, []);

	// decide switching condition
	const isSwitched = (item: any) =>
		props.accountFilters.includes(item) ? true : false;

	// return the react component
	return (
		<Container
			className="filter-account"
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				flexDirection: 'column',
				width: '20vw',
				height: '30vh',
			}}
		>
			{accounts.map((item, index) => {
				if (!item.closed) {
					return (
						<>
							<Switch
								key={index}
								id={item.id}
								checked={isSwitched(item.id)}
								label={item.name}
								onChange={props.handleAccountFilters}
								sx={{
									marginLeft: '0.5rem',
								}}
							/>
							<br />
						</>
					);
				}
			})}
		</Container>
	);
};
