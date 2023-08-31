import { Page, PageHeader, PageMainContent } from "./HomePageStyles"
import { Header } from "../shared/header/Header"
import { BannerSection } from "../shared/banner/Banner"
import { UsersSection } from "../shared/users/UsersSection"
import { FormSection } from "../shared/form/FormSection"
import { SuccessMessage } from '../widgets/success-message/SuccessMessage'
import { useEffect, useState } from 'react'
import { useFormState } from '../shared/state/FormState'

export const HomePage: React.FC = () => {
  const formState = useFormState(state => state.isSubmitted);
  const [isFormSubmited, setIsFormSubmited] = useState<boolean>(false);

  const renderSuccessMessage = () => (isFormSubmited ? <SuccessMessage/> : '' )
  const renderForm = () => (isFormSubmited ? '' : <FormSection/> )

  useEffect(() => setIsFormSubmited(formState), [formState]);

  return(
    <Page>
      <PageHeader>
        <Header></Header>
      </PageHeader>
      <PageMainContent>
        <BannerSection/>
        <UsersSection />
        {renderForm()}
        {renderSuccessMessage()}
      </PageMainContent>
    </Page>
  )
}