import { useNavigate } from 'react-router';

export default function(){
    const nav = useNavigate();
    nav("/");
}