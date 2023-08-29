import styled from "styled-components";

export const UserStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  row-gap: 1.25rem;
  background: var(--ui-base-white);
  border-radius: 10px;
`;

export const UserImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
`;

export const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


export const UserTextContent = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 280px;

  @media (min-width: 584px) {
    max-width: revert;
  }
`;