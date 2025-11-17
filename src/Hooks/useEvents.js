import axios from "axios";
import { useEffect, useState } from "react";


const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        setLoading(true)
        axios('https://y-xi-drab.vercel.app/api/events')
        .then(res => setEvents(res.data))
        .catch(err => setError(err))
        .finally(()=> setLoading(false))

    }, []);
    return {events, loading, error};

};

export default useEvents;