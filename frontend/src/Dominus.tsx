import React from 'react';
import DominusAppBar from './AppBar';

export default function Dominus(_props: {}): JSX.Element {
  return (
    <div>
      <DominusAppBar />
      <React.StrictMode>
        content here
      </React.StrictMode>
    </div>
  );
}
