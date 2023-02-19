export type User = {
  id: number;
  email: string;
  fullName: string;
};

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
