import { Community } from 'src/services/interfaces/Community'
import {
  fetchCommunityCaption,
  addCommunityMember,
  fetchFromGroupRef,
  fetchFromMemberRef,
  createNewGroupInCommunity,
  updateGroup
} from 'src/services/firebase/firestore'
import { PersonModel } from 'src/services/PersonService/PersonModel'
import { uploadGroupImg } from '../firebase/storage'

import { CommunityModel } from './CommunityModel'
import { GroupReferenceModel } from '../GroupService/GroupReferenceModel'

class Service {
  emptyCommunity = (): Community => {
    return CommunityModel.empty()
  }

  fetchById = async (id: string): Promise<Community> => {
    const communityCaption = await fetchCommunityCaption(id)
    const members = await fetchFromMemberRef(communityCaption.members)
    const groups = await fetchFromGroupRef(communityCaption.groups)
    return CommunityModel.fromCaption(
      communityCaption,
      members.map(member => PersonModel.fromCaption(member)),
      groups.map(group => GroupReferenceModel.fromCaption(group))
    )
  }

  join = async (id: string, uid: string) => {
    await addCommunityMember(id, uid)
  }

  createNewGroup = async (id: string, uid: string, name: string, backgroundImg?: Blob) => {
    const groupId = await createNewGroupInCommunity(id, uid, name)
    if (!backgroundImg) {
      return
    }
    const imgUrl = await uploadGroupImg(groupId, backgroundImg)
    await updateGroup(groupId, name, imgUrl)
  }
}

export const CommunityService = new Service()
