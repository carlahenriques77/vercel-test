import { useEffect, useState } from "react";

const useDataFetching = (urlToFetch) => {
  const [completeDataJSON, setCompleteDataJSON] = useState({});
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRequest = await fetch(urlToFetch);

        if (dataRequest.ok) {
          const responseJSON = await dataRequest.json();
          setCompleteDataJSON(responseJSON);
        } else {
          setHasError("Error fetching data");
        }
      } catch (error) {
        console.error("Error during data fetching:", error);
        setHasError("Error during data fetching");
      }
    };

    fetchData();
  }, [urlToFetch]);

  return { completeDataJSON, hasError };
};

export default useDataFetching;
