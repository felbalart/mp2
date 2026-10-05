import { NavLink } from 'react-router'
import blockbusterLogo from '../assets/blockbuster_logo.webp'
import './NavBar.css'

const links = [
  { to: '/list', label: 'List' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/detail', label: 'Detail' },
]

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-start">
        <span className="navbar-title">Blockbuster's Bests</span>
        <nav className="navbar-links">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? 'navbar-link active' : 'navbar-link'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <NavLink to="/" className="navbar-logo" aria-label="Blockbuster home">
        <img src={blockbusterLogo} alt="Blockbuster" />
      </NavLink>
    </header>
  )
}

export default NavBar
