import { UserStyled, UserImageWrapper, UserImage, UserTextContent  } from "./UserStyles"
import { User } from "../types"
import { Paragraph } from "../shared/UI"

export const UserWidget: React.FC<User> = (props) => {
  return(
    <UserStyled>
      <UserImageWrapper>
        <UserImage src={props.photo}/>
      </UserImageWrapper>
      <UserTextContent>
        <Paragraph isCropedText={true}>{props.name}</Paragraph>
      </UserTextContent>
      <UserTextContent>
        <Paragraph isCropedText={true}>{props.position}</Paragraph>
        <Paragraph isCropedText={true}>{props.email}</Paragraph>
        <Paragraph isCropedText={true}>{props.phone}</Paragraph>
      </UserTextContent>
    </UserStyled>
  )
}