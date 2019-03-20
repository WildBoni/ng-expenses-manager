export interface Expense {
  id: string;
  title: string;
  amount: number;
  creator: string;
  group: string;
  date?: Date;
  description?: string;
}
