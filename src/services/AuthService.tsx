import apiClient from "@/lib/apiClient.tsx";

function AuthService() {
  const registerUser = <T,>(data: T) => {
    return apiClient
      .post(`/user/signup`, data)
      .then((res) => {
        if (res.status === 201) {
          return Promise.resolve(res.data);
        }
        return Promise.reject(res.data);
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
  };

  const loginUser = <T,>(data: T) => {
    return apiClient
      .post(`/user/signin`, data)
      .then((res) => {
        if (res.status === 200) {
          return Promise.resolve(res.data);
        }
        return Promise.reject(res.data);
      })
      .catch((err) => {
        return Promise.reject(err.response.data || err.message);
      });
  };

  const signOut = () => {
    return apiClient
      .post(`/user/signout`)
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
  return { registerUser, loginUser, signOut };
}

export default AuthService;
