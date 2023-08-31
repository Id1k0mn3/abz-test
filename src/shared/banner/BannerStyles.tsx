import styled from "styled-components";

export const Banner = styled.div`
  position: relative;
  display: flex;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;

  @media (min-width: 1024px) {
    height: 650px;
  }
`;

export const BannerContent = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  max-width: 328px;
  width: 100%;
  row-gap: 2rem;
  transform: translateX(-50%);

  @media (min-width: 768px) {
    top: 50%;
    max-width: 380px;
    transform: translate(-50%, -50%);
  }
`;

export const BannerTextContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 21px;
`;