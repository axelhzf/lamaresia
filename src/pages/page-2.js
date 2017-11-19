import React from 'react';
import Link from 'gatsby-link';

const SecondPage = (props) => {
  const trips = {};
  return (
    <div>
      <h1>Hi from the second page</h1>
      <p>{JSON.stringify(trips)}</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default SecondPage;
