import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import globalService from "../services/global.service";
import userService from "../services/user.service";
import { UserPosition } from "../../types";
import { Button } from "../UI";
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
} from "./FormStyles";

type Inputs = {
  name: string,
  phone: string,
  email: string,
  position: string,
  file: string,
};

interface UserPositionsResponse {
  positions: UserPosition[];
};

export const Form = () => {
  const [userToken, setUserToken] = useState<string>('');
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const name = watch('name');
  const email = watch('email');
  const phone = watch('phone');

  useEffect(() => {
    globalService.getToken()
      .then(({ data: {token} }) => {
        setUserToken(token);
      }).catch((e) => {
        console.error(e);
      })

    userService.getUserPositions()
      .then(({ data: { positions } }) => {
        console.log(positions);
        setUserPositions(positions);
      }).catch((e) => {
        console.error(e);
      })
  }, [])

  const checkImageSize = (event) => {
    console.log(event);
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
          <FormControlField isError={Boolean(errors.name)} placeholder="Your name" {...register("name", { required: true, pattern: /^(?![0-9_$*&?,%]*$)/ })} id="name"/>
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
              pattern: /([+]?[0-9]{2})[0-9]{3}[0-9]{7}/ 
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
                  {...register("position", { required: true })}
                  value={id}
                  name="position"
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
            {...register("file", { required: true } )}
            id="avatar"
            onChange={(event) => checkImageSize(event)}
            accept="image/png, image/jpeg"
          />
        </FormControlInner>
        {errors.file && <FormControlError>This field value is not valid</FormControlError>}
        </FormControl>
      <Button>Sign up</Button>
    </FormStyles>
  );
};  