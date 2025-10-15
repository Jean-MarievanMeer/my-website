import type { Route } from './+types/aboutme';

export default function(){
    return(<h1>Hello</h1>);
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Over mij' },
  ];
}