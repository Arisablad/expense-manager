//HELPER FUNCTION WHICH WILL PROVIDE MOSTLY OCCURED CATEGORIES FROM EXPENSES TO COMPONENT THAT NEED IT. YOU CAN PROVIDE LIMIT TOO.

import { Expense } from "@/types/Expenses.types.ts";

function GetMostlyLikedCategories(
  expenses: Expense[],
  limit: number = 3,
  sorted: string,
) {
  let categories = [];
  if (expenses && expenses.length > 0) {
    const mostlyOccuredCategories = expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (acc[category]) {
        acc[category] = {
          count: acc[category].count + 1,
          total:
            expense.type === "expense"
              ? acc[category].total - expense.amount
              : acc[category].total + expense.amount,
        };
      } else {
        acc[category] = {
          count: 1,
          total: expense.type === "expense" ? -expense.amount : expense.amount,
        };
      }
      return acc;
    }, {});

    categories = categories = Object.keys(mostlyOccuredCategories).map(
      (key) => {
        return [key, mostlyOccuredCategories[key]];
      },
    );
    const sortedCategories = categories.sort((a, b) => {
      if (sorted === "desc") {
        return b[1].total - a[1].total;
      } else {
        return a[1].total - b[1].total;
      }
    });
    return sortedCategories.slice(0, limit);
  }
  return [];
}

export default GetMostlyLikedCategories;
