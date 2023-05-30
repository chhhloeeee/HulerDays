/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import StyledErrorRequest from "../ErrorRequest";
import { useRouter } from "next/router";

interface APILoaderProps {
  url: string;
  Component: any;
  reloadWith?: any;
}

export const APILoader = ({ url, Component, reloadWith }: APILoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setResponse(json);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoaded(true));
  };
  useEffect(fetchData, reloadWith || []);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    const isManageRequest = router.pathname.includes("/manage");
    return (
      <div>{isManageRequest ? <StyledErrorRequest /> : <h2>No Data</h2>}</div>
    );
  }
  return <Component data={response} />;
};
