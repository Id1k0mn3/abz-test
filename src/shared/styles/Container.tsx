import styled from "styled-components";

interface ContainerProps {
    hasPaddings?: boolean;
}

export const Container = styled.div<ContainerProps>`
    max-width: 1170px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.hasPaddings ? '0 1rem' : ''};
    
    @media (min-width: 768px) {
        padding: ${(props) => props.hasPaddings ? '0 2rem' : ''};
    }

    @media (min-width: 1024px) {
        padding: ${(props) => props.hasPaddings ? '0 3.75rem' : ''};
    }

    @media (min-width: 1280px) {
        padding: 0;
    }
`;