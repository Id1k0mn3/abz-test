import styled from "styled-components";

export const UserListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 50px;
`;

export const UsersListStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 1.25rem 1rem;

  @media (min-width: 768px) {
    gap: 1rem;
  }

  @media (min-width: 1024px) {
    gap: 29px;
  }
`;

export const UserListItem = styled.li`
  list-style-type: none;
  width: 100%;
  flex-grow: 1;

  @media (min-width: 768px) {
    width: calc(50% - 1rem);
  }

  @media (min-width: 1024px) {
    width: calc(33% - 29px);
  }
`;