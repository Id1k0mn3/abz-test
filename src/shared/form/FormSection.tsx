import { FormSectionStyled } from "./FormSectionStyles"
import { Heading } from "../UI"
import { Container } from "../styles/Container"
import { Form } from "./Form"
export const FormSection = () => {
  return(
    <FormSectionStyled id='section-form'>
      <Container hasPaddings={true}>
        <Heading>Working with POST request</Heading>
        <Form />
      </Container>
    </FormSectionStyled>
  )
}