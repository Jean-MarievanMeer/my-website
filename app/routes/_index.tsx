import { Outlet, useNavigate } from 'react-router';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Startpagina' },
  ];
}

export default function Home() {

  return <p>Home</p>;
}
