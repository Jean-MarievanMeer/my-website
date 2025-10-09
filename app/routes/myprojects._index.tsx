import { useNavigate } from 'react-router';
import { Outlet } from 'react-router';



export default function () {
  const navigate = useNavigate();
  return (
    <>
      <p>MyProjects</p>
      <button onClick={()=> navigate("nonogram")}> Nonogram </button>
    </>
  );
}
