import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Computer from "../images/computer-man.png";

interface APILoaderProps {
  url: string;
  Component: any;
  reloadWith?: any;
}

const NoDataDiv = styled.div`
  position: relative;
  top: 5rem;
  width: 40%;
  height: 250px;
  margin: auto;
  text-align: center;
  h1 {
    color: black !important;
  }
  h2 {
    position: relative;
    text-align: center;
    top: 3rem;
  }
`;

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
    return (
      <NoDataDiv>
        <Image src={Computer} alt="computer-man" width={450} height={271.11} />
        <h1>Sorry!</h1>
        <h2>Looks like you havent made a request yet</h2>
      </NoDataDiv>
    );
  }
  return <Component data={response} />;
};
