// Bring React in to build a component.
import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

// Huzzah for jsx!
function App() {
  return <h1>Hello World</h1>;
}

root.render(<App />);
