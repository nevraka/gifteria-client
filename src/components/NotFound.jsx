import React from 'react';

const NotFound = () => {
  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <div>
        <h1> Page not found!</h1>
      </div>
      <img src="/image/notfound.png" alt="404"></img>
    </div>
  );
};

export default NotFound;
