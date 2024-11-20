import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Spinner animation="grow" variant="info" />
    </div>
  );
};