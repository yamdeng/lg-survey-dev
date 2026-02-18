import { useState } from 'react';
import lgSymbol from '@/resources/images/LG-Symbol.jpg';
import lgLogo from '/lg-logo.jpeg';

function AdminApp() {
  const [count, setCount] = useState(0);

  const aaaa = 'sss';
  console.log(aaaa);

  return (
    <>
      <h1>Admin</h1>
      <div>
        <a href="https://lg.com" target="_blank">
          <img src={lgLogo} alt="lg logo" />
        </a>
        <a href="https://lg.com" target="_blank">
          <img src={lgSymbol} alt="lg symbol" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default AdminApp;
