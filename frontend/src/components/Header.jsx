import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: #212529;
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: #007bff;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Logo to="/">Modern IRCTC</Logo>
      <NavLinks>
        <NavLink to="/">Train Search</NavLink>
        <NavLink to="/pnr-status">PNR Status</NavLink>
      </NavLinks>
    </HeaderWrapper>
  );
}

export default Header;