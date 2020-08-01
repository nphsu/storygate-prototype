import * as React from 'react'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'

import { PersonServiceImpl } from 'src/services/PersonService'

import Header from 'src/components/Header/index'
import Caption from 'src/components/Caption/index'
import { applyTheme } from 'src/themes/utils'
import { themes, DEFAULT_THEME } from 'src/themes'
import PersonTabLayout from 'src/components/PersonTabLayout'
import PersonContentLayout from 'src/components/PersonContentLayout'
import Footer from 'src/components/Footer'
import PageRoot from 'src/components/Root/PageRoot'
import { Person } from 'src/services/interfaces/Person'

interface PageContext {
  pageId: string
  ownerUid: string
  username: string
  title: string
  introduction: string
}
interface PersonPageProps {
  pageContext: PageContext
  editingCaption: boolean
  editingStory: boolean
  dispatch: React.Dispatch<React.SetStateAction<AnyAction>>
}
const PersonPage: React.FC<PersonPageProps> = ({ pageContext, editingCaption, editingStory, dispatch }) => {
  const [openTab, setOpenTab] = React.useState(1)
  const [person, setPerson] = React.useState<Person>(PersonServiceImpl.emptyPerson())
  React.useEffect(() => {
    applyTheme(DEFAULT_THEME, themes)
    const initialize = async () => {
      setPerson(await PersonServiceImpl.fetchPersonById(pageContext.pageId))
    }
    initialize()
  }, [])

  return (
    <PageRoot>
      <Header dispatch={dispatch} />
      <Caption data={person} editingCaption={editingCaption} dispatch={dispatch} />
      <PersonTabLayout openTab={openTab} setOpenTab={setOpenTab} />
      <PersonContentLayout openTab={openTab} editingStory={editingStory} dispatch={dispatch} />
      <Footer />
    </PageRoot>
  )
}

export default connect(
  state => ({
    editingCaption: state.app.editingCaption,
    editingStory: state.app.editingStory
  }),
  null
)(PersonPage)
