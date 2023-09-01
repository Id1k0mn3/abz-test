import React from "react"
import { Container } from "../styles/Container"
import { HeaderStyles, HeaderContent, HeaderActions } from "./HeaderStyles"
import logo from '../../assets/logo.svg';
import { Button } from '../UI';

export const Header: React.FC = () => {
  return(
    <HeaderStyles>
      <Container hasPaddings={true}>
        <HeaderContent>
          <img src={logo} alt="logo" width="126" height="26"/>
          <HeaderActions>
            <Button as='a' href='#section-users'>Users</Button>
            <Button as='a' href='#section-form'>Sign up</Button>
          </HeaderActions>
        </HeaderContent>
      </Container>
    </HeaderStyles>
  )
}