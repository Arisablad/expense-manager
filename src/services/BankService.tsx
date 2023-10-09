import apiClient from "@/lib/apiClient.tsx";

function BankService() {
  const getBankAccounts = () => {
    return apiClient
      .get("/bank")
      .then((res) => {
        if (res.status === 200) {
          return Promise.resolve(res.data);
        }
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
  };

  const createBankAccount = <T,>(data: T) => {
    return apiClient
      .post("/bank/create", data)
      .then((res) => {
        if (res.status === 201) {
          return Promise.resolve(res.data);
        }
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
  };

  return { getBankAccounts, createBankAccount };
}

export default BankService;
