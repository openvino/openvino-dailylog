import { Record } from "@bloock/sdk";

export class BusinessEntity {
  public expenses: {
    hash: Record;
    token_id: number;
    timestamp: Date | number;
    expense_id: number;
    description: string;
    value: number;
  }[];
  public tokensPerYear: number;
  public totalTokens: number;

  constructor(data?: {
    expenses: {
      hash: string;
      token_id: number;
      timestamp: Date;
      expense_id: number;
      description: string;
      value: number;

    }[];
    total_tokens_year: number;
    total_tokens: number;
  }) {
    if (data) {

      this.tokensPerYear = data.total_tokens_year;
      this.totalTokens = data.total_tokens;
      this.expenses = data.expenses.map((expense) => {
        return {
          hash: Record.fromHash(expense.hash),
          token_id: expense.token_id,
          timestamp: new Date(expense.timestamp),
          expense_id: expense.expense_id,
          description: expense.description,
          value:
            expense.token_id == 0
              ? parseInt(((expense.value * this.tokensPerYear) / this.totalTokens).toFixed(2))

              : parseInt(expense.value.toFixed(2)),
        };
      }); 
    }
  }
}



