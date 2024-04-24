import { useCallback, useState } from "react";

const useApi = () => {
  const [result, setResult] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const api = {
    get: useCallback(async (url, token = null) => {
      return await makeRequest(url, "GET", null, token);
    }, []),
    post: useCallback(async (url, data, token = null) => {
      return await makeRequest(url, "POST", data, token);
    }, []),
    put: useCallback(async (url, data, token = null) => {
      return await makeRequest(url, "PUT", data, token);
    }, []),
    delete: useCallback(async (url, token = null) => {
      return await makeRequest(url, "DELETE", null, token);
    }, []),
  };

  const makeRequest = useCallback(
    async (url, method, data = null, token = null) => {
      setError(undefined);
      setLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        headers["Access-Control-Allow-Origin"] = "*";
        const response = await fetch(url, {
          method: method,
          headers: headers,
          body: data ? JSON.stringify(data) : undefined,
        });
        const responseData = await response.json();
        setResult(responseData);
        return responseData;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return [result, api, isLoading, error];
};

export default useApi;
