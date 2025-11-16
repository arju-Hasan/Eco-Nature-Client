import axios from "axios";
import { useEffect, useState } from "react";


const useParticipants = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        setLoading(true)
        axios('http://localhost:3000/api/participants')
        .then(res => setParticipants(res.data))
        .catch(err => setError(err))
        .finally(()=> setLoading(false))

    }, []);
    return {participants, loading, error};

};

export default useParticipants;