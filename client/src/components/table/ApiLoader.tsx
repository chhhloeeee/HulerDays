import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

interface APILoaderProps {
  url: string;
  Component: any;
  reloadWith?: any;
}

const NoDataDiv = styled.div`
  position: relative;
  top: 5rem;
  width: 40%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 10px 40px #00000040;
  height: 450px;
  margin: auto;
  text-align: center;
  h1 {
    color: black !important;
    top: -1rem !important;
  }
  h2 {
    position: relative;
    text-align: center;
    top: 1rem;
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
        <Image
          src="https://cdn.huler.io/v2/wp-content/uploads/2022/06/14090350/Office15.jpg"
          alt="computer-man"
          width={271.11}
          height={271.11}
        />
        <h1>Sorry!</h1>
        <h2>Looks like you havent made a request yet</h2>
      </NoDataDiv>
    );
  }
  return <Component data={response} />;
};
