import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect, FormEvent } from "react";
import globalService from "../services/global.service";
import userService from "../services/user.service";
import { UserPosition } from "../../types";
import { Button } from "../UI";
import { useUsers } from '../state/UserState';
import {
  FormStyles,
  FormControl,
  FormGroup,
  FormControlField,
  FormControlLabel,
  FormControlLabelWrapper,
  FormControlError,
  FormControlHint,
  FormPositionGroup,
  FormPositionGroupTitle,
  FormPositionsList,
  FormPositionsListItem,
  FormRadio,
  FormRadioHidden,
  FormRadioLabel,
  FormControlInner,
  FormControlPrependElement,
  FormControlCustomFileField,
  FormControlCustomPlaceholder,
  FormWrapperButton,
} from "./FormStyles";

type Inputs = {
  name: string,
  phone: string,
  email: string,
  position_id: string,
  photo: File | undefined,
};

interface UserPositionsResponse {
  positions: UserPosition[];
};

export const Form = () => {
  const MAX_FILE_SIZE = (1024 * 1024) * 5;
  const [userToken, setUserToken] = useState<string>('');
  const [blobImage, setBlobImage] = useState<File>();
  const [fileSizeError, setfileSizeError] = useState<boolean>(false);
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const thereIsFieldWithError: boolean = !!errors.email || !!errors.photo || !!errors.name || !!errors.phone;
  const updateUsers = useUsers(state => state.updateUsers)
  const userState = useUsers(state => state.users);
  
  const name = watch('name');
  const email = watch('email');
  const phone = watch('phone');
  
  useEffect(() => {
    globalService.getToken()
      .then(({ data: { token } }) => {
        setUserToken(token);
      }).catch((e) => {
        console.error(e);
      })

    userService.getUserPositions()
      .then(({ data: { positions } }) => {
        setUserPositions(positions);
      }).catch((e) => {
        console.error(e);
      })
  }, [])

  const checkImageSize = (event: FormEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const { files } = event.target as HTMLInputElement;
    const file = files[0];

    if (file.size > MAX_FILE_SIZE) {
      setfileSizeError(true);
      return
    }
    
    setfileSizeError(false);

    reader.onloadend = (readerEvent) => {
      const image = new Image();
      const { result } = readerEvent.target;
      image.src = result;

      image.onload = function() {
        if (image.width < 70 && image.height < 70) {
          return;
        }
      };
      
      const imageBlobData = (image.src).split(',')[1];

      if (!imageBlobData) {
        console.error('problem with convert image.src to image blob data');
        return;
      }

      setBlobImage(file);
    };

    reader.readAsDataURL(file);
  };

  const updateStateUsers = () => {
    userService.getUsers().then(({ data: { users } }) => {
      updateUsers(users);
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const formData  = new FormData();
      data.photo = blobImage;
        
      for(const name in data) {
        formData.append(name, data[name]);
      }

      await userService.createUser(formData, { Token: userToken})

      updateStateUsers();
    } catch(e) {
      console.error(`there is some error in method onSubmit => ${e}`);
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <FormStyles onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormControl>
          {name
            ? <FormControlLabelWrapper>
                <FormControlLabel isError={Boolean(errors.name)}  htmlFor="name">Your name</FormControlLabel>
              </FormControlLabelWrapper>
            : ''}
          <FormControlField isError={Boolean(errors.name)} placeholder="Your name" {...register("name", { 
            required: true,
            minLength: 2,
            maxLength: 60,
            pattern: /^(?![0-9_$*&?,%]*$)/ 
          })} id="name"/>
          {errors.name && <FormControlError>This field value is not valid</FormControlError>}
        </FormControl>
        <FormControl>
          {email 
            ? <FormControlLabelWrapper>
                <FormControlLabel isError={Boolean(errors.email)} htmlFor="email">Email</FormControlLabel>
              </FormControlLabelWrapper> 
            : ''}
          <FormControlField
            isError={Boolean(errors.email)}
            placeholder="Email"
            {...register("email", { 
              required: true,
              pattern: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/ 
            })}
            id="email"
          />
          {errors.email && <FormControlError>This field value is not valid</FormControlError>}
        </FormControl>
        <FormControl>
          {phone
            ? <FormControlLabelWrapper>
                <FormControlLabel isError={Boolean(errors.phone)} htmlFor="phone">Phone</FormControlLabel>
              </FormControlLabelWrapper> 
            : ''}
          <FormControlField
            isError={Boolean(errors.phone)}
            placeholder="Phone"
            {...register("phone", {
              required: true,
              pattern: /^(\+380\d{9})$/
            })}
            id="phone"
            name="phone"
          />
          {errors.phone && <FormControlError>This field value is not valid</FormControlError>}
          <FormControlHint>+38 (XXX) XXX - XX - XX</FormControlHint>
        </FormControl>
      </FormGroup>
      <FormPositionGroup>
        <FormPositionGroupTitle>Select your position</FormPositionGroupTitle>
          <FormPositionsList>
          {userPositions.map(({name, id}, index) =>
            <FormPositionsListItem key={id}>
              <FormRadio>
                <FormRadioHidden 
                  {...register("position_id", { required: true })}
                  value={id}
                  name="position_id"
                  defaultChecked={index === 0}
                  type="radio"
                  id={id}>
                </FormRadioHidden>
                <FormRadioLabel htmlFor={id}>{name}</FormRadioLabel>
              </FormRadio>
            </FormPositionsListItem>
          )}
          </FormPositionsList>
      </FormPositionGroup>
      <FormControl>
        <FormControlInner>
          <FormControlPrependElement isError={Boolean(errors.file)}>Upload</FormControlPrependElement>
          <FormControlCustomFileField isError={Boolean(errors.file)} htmlFor="avatar">
            <FormControlCustomPlaceholder>Upload your photo</FormControlCustomPlaceholder>
          </FormControlCustomFileField>
          <FormControlField
            type="file"
            isHidden={true}
            {...register("photo", { required: true } )}
            id="avatar"
            onChange={(event) => checkImageSize(event)}
            accept="image/jpg, image/jpeg"
          />
        </FormControlInner>
        {errors.photo && <FormControlError>This field value is not valid</FormControlError>}
        {fileSizeError && <FormControlError>File size more than 5mb</FormControlError>}
        </FormControl>
      <FormWrapperButton>
        <Button disabled={thereIsFieldWithError}>Sign up</Button>
      </FormWrapperButton>
    </FormStyles>
  );
};  