/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

interface APILoaderProps {
  url: string;
  Component: any;
  reloadWith?: any;
}

export const APILoader = ({ url, Component, reloadWith }: APILoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setResponse(json);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoaded(true));

    console.log(response);
  };
  useEffect(fetchData, reloadWith || []);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h2>No Data</h2>;
  }
  return <Component data={response} />;
};
