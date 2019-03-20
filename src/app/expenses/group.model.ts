import { Expense } from './expense.model';

export interface Group {
  id: string;
  title: string;
  description?: string;
  expenses: string[];
  users: string[];
}
