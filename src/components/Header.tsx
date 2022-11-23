import { Box, Title } from '@mantine/core';

export const Header = (props: any) => {
	return (
		<>
			<Box
				sx={(theme) => ({
					backgroundColor: theme.colors.gray[2],
					textAlign: 'left',
					padding: theme.spacing.xl,
					borderRadius: theme.radius.md,
					marginTop: '2rem',
					borderBottomLeftRadius: '0',
					borderBottomRightRadius: '0',
				})}
			>
				<Title
					order={1}
					sx={(theme) => ({
						color: theme.colors.blue[6],
						textAlign: 'left',
					})}
				>
					{props.heading}
				</Title>
			</Box>
		</>
	);
};
