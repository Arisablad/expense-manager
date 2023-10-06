import apiClient from "@/lib/apiClient.tsx";

function ExpensesService() {
  const getExpenses = () => {
    return apiClient
      .get("/expenses")
      .then((res) => {
        if (res.status === 200) {
          return Promise.resolve(res.data);
        }
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
  };

  const addExpenseToDb = <T,>(data: T) => {
    return apiClient
      .post("/expenses/create", data)
      .then((res) => {
        if (res.status === 200) {
          return Promise.resolve(res.data);
        }
        return Promise.reject(res.data);
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
  };

  const removeExpenseFromDb = (
    id: string,
    type: string,
    account: string,
    amount: number,
  ) => {
    return apiClient
      .delete(`/expenses/${id}`, {
        data: {
          type,
          account,
          amount,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return Promise.resolve(res.data);
        }
        return Promise.reject(res.data);
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
  };

  return { getExpenses, addExpenseToDb, removeExpenseFromDb };
}

export default ExpensesService;
