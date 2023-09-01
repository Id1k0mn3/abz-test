import React from "react"
import { Container } from "../styles/Container"
import banner from '../../assets/banner.webp';
import { Banner, BannerImage, BannerContent, BannerTextContent } from "./BannerStyles";
import { Button, Heading, Paragraph, CSSVariables } from "../UI";
export const BannerSection: React.FC = () => {
  return(
    <section>
      <Container hasPaddings={false}>
        <Banner>
          <BannerImage src={banner} alt="banner" />
          <BannerContent>
            <CSSVariables color="var(--ui-base-white)">
              <BannerTextContent>
                <Heading>Test assignment for front-end developer</Heading>
                <Paragraph>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</Paragraph>
              </BannerTextContent>
            </CSSVariables>
            <Button as="a" href="#section-form">
              Sign up
            </Button>
          </BannerContent>
        </Banner>
      </Container>
    </section>
  )
}