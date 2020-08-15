import { PersonModel } from 'src/services/PersonService/PersonModel'
import { Group } from 'src/services/interfaces/Group'
import { fetchGroupCaption, fetchFromMemberRef, addGroupMember, fetchCommunityCaption } from 'src/services/firebase/firestore'

import { GroupModel } from './GroupModel'
import { CommunityReferenceModel } from '../CommunityService/CommunityReferenceModel'

class Service {
  emptyGroup = (): Group => {
    return GroupModel.empty()
  }

  fetchById = async (id: string): Promise<Group> => {
    const groupCaption = await fetchGroupCaption(id)
    const { pageId, name, introduction, backgroundImg, community } = groupCaption
    const members = await fetchFromMemberRef(groupCaption.members)
    return new GroupModel(
      pageId,
      name,
      introduction,
      backgroundImg,
      members.map(member => PersonModel.fromCaption(member)),
      community ? CommunityReferenceModel.fromCaption(await fetchCommunityCaption(community)) : undefined
    )
  }

  join = async (id: string, uid: string) => {
    await addGroupMember(id, uid)
  }
}

export const GroupService = new Service()
