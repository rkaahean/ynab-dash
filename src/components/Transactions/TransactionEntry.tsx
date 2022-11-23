import { YNABTransaction } from '../../types/ynab';
import { convertToUSD } from '../../utils/format';

export const TransactionEntry: React.FC<YNABTransaction> = (props) => {
	return (
		<tr>
			<td>{props.date}</td>
			<td>{props.memo}</td>
			<td>{convertToUSD(props.amount, true)}</td>
			<td>{props.account_id}</td>
		</tr>
	);
};
