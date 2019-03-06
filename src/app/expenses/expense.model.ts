export interface Expense {
  id: string;
  title: string;
  amount: number;
  creator: string;
  date?: Date;
  description?: string;
}
