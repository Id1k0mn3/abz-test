import styled from "styled-components";

export const Button = styled.button`
  width: 100px;
  padding: 4px 0;
  background: var(--ui-var-yellow);
  color: var(--ui-var-black-87);
  font-weight: 400;
  font-size: 1rem;
  line-height: calc(26 / 16);
  border: none;
  border-radius: 80px;
  cursor: pointer;
  transition: .3s;

  &:hover,
  &:focus {
    background: var(--ui-var-lightyellow);
    transition: .3s;
  }

  &:disabled {
    background: var(--ui-var-darkgrey);
    color: var(--ui-base-white);
    pointer-events: none;
  }
`;