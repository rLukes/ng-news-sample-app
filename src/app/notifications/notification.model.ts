export interface ICommand {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}
