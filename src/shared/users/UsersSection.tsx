import { UsersSectionStyled } from "./UsersSectionStyles"
import { Heading } from "../UI"
import { UsersList } from "../../widgets/users-list/UsersList"
import { Container } from "../styles/Container"

export const UsersSection = () => {
  return(
    <UsersSectionStyled>
      <Heading>Working with GET request</Heading>
      <Container hasPaddings={true}>
        <UsersList></UsersList>
      </Container>
    </UsersSectionStyled>
  )
}