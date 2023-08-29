import { FormSectionStyled } from "./FormSectionStyles"
import { Heading } from "../UI"
import { Container } from "../styles/Container"
import { Form } from "./Form"
export const FormSection = () => {
  return(
    <FormSectionStyled>
      <Heading>Working with POST request</Heading>
      <Container hasPaddings={true}>
        <Form />
      </Container>
    </FormSectionStyled>
  )
}