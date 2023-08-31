import { UsersSectionStyled } from "./UsersSectionStyles"
import { Heading } from "../UI"
import { UsersList } from "../../widgets/users-list/UsersList"
import { Container } from "../styles/Container"

export const UsersSection = () => {
  return(
    <UsersSectionStyled id='section-users'>
      <Container hasPaddings={true}>
        <Heading>Working with GET request</Heading>
        <UsersList></UsersList>
      </Container>
    </UsersSectionStyled>
  )
}