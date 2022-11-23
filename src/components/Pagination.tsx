// import { Pagination } from 'react-bootstrap';
import { Pagination } from '@mantine/core';

export const TablePagination = (props: any) => {
	const totalPageCount = Math.ceil(props.totalElements / props.elementsPerPage);

	return (
		<Pagination
			page={props.currentPage}
			siblings={1}
			onChange={props.handlePaginationClick}
			total={totalPageCount}
			withEdges={true}
			sx={{ justifyContent: 'center', margin: '1rem' }}
		/>
	);
};
