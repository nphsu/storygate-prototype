import * as React from 'react'
import { Person } from 'src/services/interfaces/Person'
import { shallowEqualObjects } from 'shallow-equal'
import {
  EditCaptionName,
  EditCaptionTitle,
  EditCaptionLocation,
  EditCaptionProfileImg,
  EditCaptionIntroduction
} from 'src/components/Person/Caption/edit'
import { css } from '@emotion/core'
import { Montserrat } from 'src/components/SGText'
import VerticalLine from 'src/components/VerticalLine'
import CaptionWrapper from './CaptionWrapper'
import CaptionMain from './CaptionMain'
import CaptionName from './CaptionName'
import CaptionLocation from './CaptionLocation'
import CaptionTitle from './CaptionTitle'
import CaptionIntroduction from './CaptionIntroduction'
import { CompleteButtonSet, ClearButton, DoneButton } from '../../EditButton'
import ItemBand from './ItemBand'

interface CaptionEditProps {
  original: Person
  toggleEditingCaption: () => void
  updateCaption: (person: Person, newImg?: Blob) => Promise<void>
}
const CaptionEdit: React.FC<CaptionEditProps> = ({ original, toggleEditingCaption, updateCaption }) => {
  const [name, setName] = React.useState(original.name)
  const [title, setTitle] = React.useState(original.title)
  const [location, setLocation] = React.useState(original.location)
  const [introduction, setIntroduction] = React.useState(original.introduction)
  const [newImg, setNewImg] = React.useState<Blob>()

  const doneEditing = async () => {
    if (!shallowEqualObjects(original, { name, title, introduction, location, newImg })) {
      await updateCaption({ pageId: original.pageId, name, title, introduction, location }, newImg)
    }
    toggleEditingCaption()
  }

  const resetEditing = () => {
    toggleEditingCaption()
  }
  return (
    <>
      <CompleteButtonSet
        ClearButton={<ClearButton onClick={resetEditing} />}
        DoneButton={<DoneButton onClick={doneEditing} />}
        className="mt-20"
      />
      <CaptionWrapper editing>
        <EditCaptionProfileImg profileImg={original.img} setProfileImg={setNewImg} />
        <EditCaptionName name={name} setName={setName} />
        <EditCaptionTitle title={title} setTitle={setTitle} />
        <EditCaptionLocation location={location} setLocation={setLocation} />
      </CaptionWrapper>
      <EditCaptionIntroduction introduction={introduction} setIntroduction={setIntroduction} />
    </>
  )
}
interface CaptionBaseProps {
  data: Person
  editingCaption: boolean
  toggleEditingCaption: () => void
  updateCaption: (person: Person) => Promise<void>
}
const CaptionBase: React.FC<CaptionBaseProps> = ({ data, editingCaption, toggleEditingCaption, updateCaption }) => {
  if (editingCaption) {
    return <CaptionEdit original={data} toggleEditingCaption={toggleEditingCaption} updateCaption={updateCaption} />
  }
  return (
    <>
      <CaptionWrapper profileImg={data.img}>
        <CaptionMain profileImg={data.img} name={data.name} introduction={data.introduction} />
        {/* <CaptionName name={data.name} />
      <CaptionLocation location={data.location} />
      <CaptionTitle title={data.title} />
      <CaptionIntroduction introduction={data.introduction} /> */}
      </CaptionWrapper>
      <div className="border-white border-solid border mx-4 mb-4 opacity-50 lg:max-w-3xl lg:mx-auto" />
      <div className="flex justify-between mx-10">
        <div>
          <Montserrat className="text-white text-xl font-bold">0</Montserrat>
          <Montserrat className="text-white text-xs font-bold opacity-75">Points</Montserrat>
        </div>
        <VerticalLine />
        <div>
          <Montserrat className="text-white text-xl font-bold">{data.location}</Montserrat>
          <Montserrat className="text-white text-xs font-bold opacity-75">Japan</Montserrat>
        </div>
        <VerticalLine />
        <div className="">
          <Montserrat className="text-white text-xl font-bold">3時間前</Montserrat>
          <Montserrat className="text-white text-xs font-bold opacity-75">Login</Montserrat>
        </div>
      </div>
    </>
  )
}

export default CaptionBase
