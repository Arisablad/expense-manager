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

  return { getExpenses };
}

export default ExpensesService;
