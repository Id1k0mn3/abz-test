import { ELementSuccessMessage, SuccessImage } from './SuccessMessageStyles';
import { Heading } from '../../shared/UI';
import successMessage from '../../assets/successImage.svg'

export const SuccessMessage = () => {
  return(
    <ELementSuccessMessage>
      <Heading>User successfully registered</Heading>
      <SuccessImage src={successMessage} alt="success image" />
    </ELementSuccessMessage>
  );
};