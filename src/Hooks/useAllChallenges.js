import axios from "axios";
import { useEffect, useState } from "react";

const useAllChallenges = (filters = {}) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios('http://localhost:3000/api/challenges')
      .then(res => {
        let data = res.data;

        // Only apply filters if any filter exists
        if (filters && Object.keys(filters).length > 0) {
          if (filters.participantsMin) {
            data = data.filter(c => c.participants >= +filters.participantsMin);
          }
          if (filters.participantsMax) {
            data = data.filter(c => c.participants <= +filters.participantsMax);
          }
          if (filters.category) {
            data = data.filter(c => c.category === filters.category);
          }
          if (filters.startDateFrom) {
            data = data.filter(c => new Date(c.startDate) >= new Date(filters.startDateFrom));
          }
          if (filters.startDateTo) {
            data = data.filter(c => new Date(c.startDate) <= new Date(filters.startDateTo));
          }
        }

        setChallenges(data); // filtered or all data
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [filters]); // run whenever filters change

  return { challenges, loading, error };
};

export default useAllChallenges;