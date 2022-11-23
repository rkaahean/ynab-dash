export interface YNABTransaction {
	memo?: string | null | undefined;
	amount: number;
	date: string;
	account_id: string;
	category_id: string;
}

export interface YNABAccount {
	id?: string;
	name?: string;
	type?: string;
	closed?: boolean;
}
