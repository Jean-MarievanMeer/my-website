import { useNavigate } from 'react-router';


export default function () {
  const navigate = useNavigate();
  return (
    <div>
      <p>MyProjects</p>
      <button onClick={()=> navigate("nonogram")}> Nonogram </button>
    </div>
  );
}
