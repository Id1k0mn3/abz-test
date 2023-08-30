import React from "react"
import { Container } from "../styles/Container"
import { HeaderStyles, HeaderContent, HeaderActions } from "./HeaderStyles"
import { Button } from "../UI/UiButton"
import logo from '../../assets/logo.svg';

export const Header: React.FC = () => {
  return(
    <HeaderStyles>
      <Container hasPaddings={true}>
        <HeaderContent>
          <img src={logo} alt="logo" />
          <HeaderActions>
            <Button>Users</Button>
            <Button>Sign up</Button>
          </HeaderActions>
        </HeaderContent>
      </Container>
    </HeaderStyles>
  )
}