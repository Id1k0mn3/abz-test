import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect, FormEvent } from "react";
import globalService from "../services/global.service";
import userService from "../services/user.service";
import { UserPosition } from "../../types";
import { Button } from "../UI";
import { useUsers } from '../state/UserState';
import { useFormState } from '../state/FormState';

import {
  FormStyles,
  FormControl,
  FormGroup,
  FormControlField,
  FormControlLabel,
  FormControlLabelWrapper,
  FormControlMessage,
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
  photo: File | boolean |undefined,
};

export const Form = () => {
  const MAX_FILE_SIZE = (1024 * 1024) * 5;
  const [userToken, setUserToken] = useState<string>('');
  const [blobImage, setBlobImage] = useState<File>();
  // const [fileSizeError, setfileSizeError] = useState<boolean>(false);
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);
  const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm<Inputs>();
  const thereIsFieldWithError: boolean = !!errors.email || !!errors.photo || !!errors.name || !!errors.phone;
  const name = watch('name');
  const email = watch('email');
  const phone = watch('phone');
  const thereIsEmptyFields: boolean = !name || !email || !phone || !blobImage;
  const updateUsers = useUsers(state => state.updateUsers)
  const updateFormState = useFormState(state => state.uspdateIsSubmitted)

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

    if (!event.target) {
      return;
    }

    const { files } = event.target as HTMLInputElement;

    if (!files || !files.length) {
      return;
    }

    const file = files[0];

    if (file.size > MAX_FILE_SIZE) {
      setError('photo', {
        type: 'manual',
        message: 'Your image more than 5mb'
      });
      return
    }

    reader.onloadend = (readerEvent) => {
      const image = new Image();

      if (!readerEvent || !readerEvent.target) {
        return;
      }

      const { result } = readerEvent.target;

      if (!result) {
        return;
      }

      // for checking type of image
      const resultString = typeof result === 'string' ? result : new TextDecoder().decode(result);

      image.src = resultString;

      image.onload = function() {
        if (image.width < 70 || image.height < 70) {
          setError('photo', {
            type: 'manual',
            message: 'Your image smaller than 70x70'
          });
          return;
        }

        const imageBlobData = (image.src).split(',')[1];

        if (!imageBlobData) {
          console.error('problem with convert image.src to image blob data');
          return;
        }

        setBlobImage(file);
        clearErrors('photo');
        // errors.photo = false;
      };
    };
    reader.readAsDataURL(file);
  };

  const updateStateUsers = () => {
    userService.getUsers().then(({ data: { users } }) => {
      updateUsers(users);
      updateFormState(true)
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const formData  = new FormData();
      data.photo = blobImage;
        
      for(const name in data) {
        formData.append(name, data[name as keyof Inputs] as string);
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
          {errors.name && <FormControlMessage>This field value is not valid</FormControlMessage>}
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
          {errors.email && <FormControlMessage>This field value is not valid</FormControlMessage>}
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
          {errors.phone && <FormControlMessage>This field value is not valid</FormControlMessage>}
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
                  id={`position-${id}`}>
                </FormRadioHidden>
                <FormRadioLabel htmlFor={`position-${id}`}>{name}</FormRadioLabel>
              </FormRadio>
            </FormPositionsListItem>
          )}
          </FormPositionsList>
      </FormPositionGroup>
      <FormControl>
        <FormControlInner>
          <FormControlPrependElement isError={Boolean(errors.photo)}>Upload</FormControlPrependElement>
          <FormControlCustomFileField isError={Boolean(errors.photo)} htmlFor="avatar">
            <FormControlCustomPlaceholder>Upload your photo</FormControlCustomPlaceholder>
          </FormControlCustomFileField>
          <FormControlField
            type="file"
            isError={Boolean(errors.photo)}
            isHidden={true}
            {...register("photo", { required: true } )}
            id="avatar"
            onChange={(event) => checkImageSize(event)}
            accept="image/jpg, image/jpeg"
            name="photo"
          />
        </FormControlInner>
        {errors.photo && <FormControlMessage>{errors.photo.message}</FormControlMessage>}
        {blobImage && !errors.photo && <FormControlMessage isSuccess={true}>Message was added successfuly</FormControlMessage>}
        </FormControl>
      <FormWrapperButton>
        <Button disabled={thereIsFieldWithError || thereIsEmptyFields}>Sign up</Button>
      </FormWrapperButton>
    </FormStyles>
  );
};  