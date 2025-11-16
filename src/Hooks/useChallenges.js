import axios from "axios";
import {useEffect, useState } from "react";



const useChallenges = () => {

    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        setLoading(true)
        axios('http://localhost:3000/api/challenges')
        .then(res => setChallenges(res.data))
        .catch(err => setError(err))
        .finally(()=> setLoading(false))

    }, []);
    return {challenges, loading, error};

};

export default useChallenges;



