import { Page, PageHeader, PageMainContent } from "./HomePageStyles"
import { Header } from "../shared/header/Header"
import { BannerSection } from "../shared/banner/Banner"
import { UsersSection } from "../shared/users/UsersSection"
import { FormSection } from "../shared/form/FormSection"
export const HomePage: React.FC = () => {
  return(
    <Page>
      <PageHeader>
        <Header></Header>
      </PageHeader>
      <PageMainContent>
        <BannerSection/>
        <UsersSection />
        <FormSection />
      </PageMainContent>
    </Page>
  )
}