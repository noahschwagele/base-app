//a simple ajax request handler mimicking how fuplaod works using fetch and FormData and allows for posting, get and posing of files and multimedia content

import React, { createContext, useState, useEffect } from "react";

export const RequestHandlerContext = createContext();

export const RequestHandlerProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async (url, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RequestHandlerContext.Provider value={{ loading, error, data, fetchData }}>
            {children}
        </RequestHandlerContext.Provider>
    );
};
