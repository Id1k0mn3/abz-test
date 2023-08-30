import styled from "styled-components";
import { Paragraph } from "../UI";

interface LabelProps {
  isError?: boolean;
}

interface FieldProps {
  isError?: boolean;
  isHidden?: boolean;
}

interface PrependElement {
  isError?: boolean;
}


export const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 328px;
  width: 100%;
  margin: 0 auto;

  @media(min-width: 768px) {
    max-width: 380px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 50px;
`;

export const FormControl = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  row-gap: .25rem;
`;

export const FormControlLabelWrapper = styled.div`
  position: absolute;
  top: -12px;
  left: 12px;
  padding: 0 .25rem;
  background: var(--ui-var-lightgrey);
`;

export const FormControlLabel = styled.label<LabelProps>`
  color: ${(props) => props.isError ? 'var(--ui-var-red)' : 'var(--ui-var-darkgrey-2)'};
  font-weight: 500;
  font-size: .75rem;
  line-height: calc(14 / 12);
`;

export const FormControlField = styled.input<FieldProps>`
  display: ${(props) => props.isHidden ? 'none' : 'revert'};
  width: 100%;
  height: 54px;
  padding: 11px 15px;
  font-weight: 400;
  font-size: 1rem;
  line-height: calc(26 / 16);
  background: transparent;
  border: ${(props) => props.isError ? '2px solid var(--ui-var-red)' : '1px solid var(--ui-var-light-grey-2)'};
  border-radius: 4px;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color: var(--ui-var-darkgrey-2);
  }
`;

export const FormControlError = styled.span`
  color: var(--ui-var-red);
  font-weight: 400;
  font-size: .75rem;
  line-height: calc(14 / 12);

`;

export const FormPositionGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 25px 0 47px 0; 
  row-gap: 9px;
`;

export const FormPositionGroupTitle = styled(Paragraph)`
  text-align: left;
`;

export const FormControlHint = styled(FormControlLabel)`
  padding-left: .75rem;
  font-weight: 400;
`;

export const FormPositionsList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

export const FormPositionsListItem = styled.li``;

export const FormRadio = styled.div`
  display: flex;
  align-items: center;
  column-gap: .75rem;
`;

export const FormRadioLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 27px;
  column-gap: .75rem;

  &::after {
    position: absolute;
    top: 50%;
    left: 5px;
    display: block;
    width: .625rem;
    height: .625rem;
    background: transparent;
    border-radius: 50%;
    transform: translateY(-50%);
    content: '';
  }

  &::before {
    display: block;
    width: 1.125rem;
    height: 1.125rem;
    border: 1px solid var(--ui-var-light-grey-2);
    border-radius: 50%;
    content: '';
  }
`;

export const FormRadioHidden = styled.input`
  display: none;

  &:checked + ${FormRadioLabel} {
    &::before { // this will work for <CategoryListItem /><CategoryListItem />
      border-color: var(--ui-var-blue);
    }

    &::after { // this will work for <CategoryListItem /><CategoryListItem />
      background: var(--ui-var-blue);
    }
  }
`;

export const FormControlInner = styled.div`
  display: flex;
  width: 100%;
  border-radius: .25rem;
`;

export const FormControlPrependElement = styled.span<PrependElement>`
  display: block;
  padding: 13px 15px 13px 14px;
  color: var(--ui-var-black-87);
  border: ${(props) => props.isError ? '2px solid var(--ui-var-red)' : '1px solid var(--ui-var-black-87);'};
  border-radius: .25rem 0 0 .25rem;
`;

export const FormControlCustomFileField = styled.label<LabelProps>`
  flex-grow: 1;
  padding: 13px 16px;
  border-width: ${(props) => props.isError ? '2px 2px 2px 0' : '1px 1px 1px 0'};
  border-color: ${(props) => props.isError ? 'var(--ui-var-red)' : 'var(--ui-var-light-grey-2)'};
  border-style: solid;
  border-radius: 0 .25rem .25rem 0;
`;

export const FormControlCustomPlaceholder = styled(Paragraph)`
  color: var(--ui-var-darkgrey-2);
  text-align: left;
`;

export const FormWrapperButton = styled.div`
  margin-top: 50px;
`