import useSWR from "swr";

export const fetcher = (url: RequestInfo, data = undefined) =>
  fetch(
    String(url).indexOf("http") == -1 ? window.location.origin + url : url,
    {
      method: data ? "POST" : "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((r) => r.json());

  export const getFetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

  export const adminUse = () => {
    const { data, error } = useSWR("/api/logtree", getFetcher);
    return {
      data,
      isLoading: !error && !data,
      isError: error,
    };
  };
