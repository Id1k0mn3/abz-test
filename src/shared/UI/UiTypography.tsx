import styled from "styled-components";

interface ParagraphProps {
  isCropedText?: boolean;
}

export const Heading = styled.h1`
  color: var(--color, --ui-var-black-87);
  font-weight: 400;
  font-size: 2.5em;
  text-align: center;
  line-height: 1;
`;

export const Paragraph = styled.p<ParagraphProps>`
  color: var(--color, --ui-var-black-87);
  font-weight: 400;
  font-size: 1rem;
  text-align: center;
  line-height: calc(26 / 16);
  text-overflow: ${(props) => !props.isCropedText ? '' : 'ellipsis'};
  white-space: ${(props) => !props.isCropedText ? '' : 'nowrap'};
  overflow: ${(props) => !props.isCropedText ? '' : 'hidden'};
`;

export const CSSVariables = styled.div`
  --color: ${props => props.color};
`;
