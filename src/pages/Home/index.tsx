import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <>
      <p>Home</p>
      <Outlet></Outlet>
    </>
  );
}

export default Home;
