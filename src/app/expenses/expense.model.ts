export interface Expense {
  id: string;
  name: string;
  amount: number;
  creator: string;
  date?: Date;
  description?: string;
}
