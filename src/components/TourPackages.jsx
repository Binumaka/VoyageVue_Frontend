import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TravelCards from '../components/TravelCards';

const TourPackages = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get(`/api/packages/find`);
                setDestinations(response.data);
            } catch (error) {
                console.error('Error fetching tour packages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TravelCards 
                headline="Tour Packages for your vacation" 
                section="TourPackages" 
                destinations={destinations} 
            />
        </div>
    );
};

export default TourPackages;
