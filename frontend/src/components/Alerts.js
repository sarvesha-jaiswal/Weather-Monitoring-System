import React from 'react';

const Alerts = ({ data }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <p>No alerts at this time.</p>;
    }

    return (
        <div className="alerts">
            <h3>Alerts:</h3>
            <ul>
                {data.map((alert, index) => (
                    <li key={index}>{alert.message || alert}</li>
                ))}
            </ul>
        </div>
    );
};

export default Alerts;
