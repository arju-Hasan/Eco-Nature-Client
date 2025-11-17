import axios from "axios";
import { useEffect, useState } from "react";


const useEcoTips = () => {
    const [EcoTips, setEcoTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        setLoading(true)
        axios('https://y-xi-drab.vercel.app/api/eco-tips')
        .then(res => setEcoTips(res.data))
        .catch(err => setError(err))
        .finally(()=> setLoading(false))

    }, []);
    return {EcoTips, loading, error};

};

export default useEcoTips;