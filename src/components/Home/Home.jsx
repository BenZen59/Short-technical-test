import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <NavLink
        to='/books'
        className='headerLink'
        style={({ isActive }) => ({
          background: isActive ? 'aliceblue' : '#dce4eb',
        })}
      >
        Books
      </NavLink>
    </div>
  );
}
