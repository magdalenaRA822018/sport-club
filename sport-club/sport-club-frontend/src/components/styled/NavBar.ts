import styled from 'styled-components';

export const Bar = styled.nav`
  font-size: 18px;
  background-color: #27273b; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
  padding-bottom: 10px;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 70px;
    align-items: right;
  }
`
export const MainNav = styled.ul`
  list-style-type: none;
  flex-direction: column;
  @media (min-width: 768px) {
    display: flex !important;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end;
  }
`
export const NavLi = styled.li`
  text-align: center;
  margin: 15px auto;
` 
export const NavLinkk = styled.a`
text-decoration: none;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  color: white;
  cursor: pointer;
  @media (min-width: 768px) {    
    margin: 0px 10px;
  }
`
export const NavBarToggle = styled.span`
  position: left;
  padding: 1%;
  top: 10px;
  right: 20px;
  cursor: pointer; 
  color: rgba(255,255,255,0.8);
  font-size: 24px;
`



  



 