import { Group } from './Group'
import { Person } from './Person'

export interface Community {
  readonly name: string
  readonly introduction: string
  readonly members: Person[]
  readonly groups: Group[]
  readonly backgroundImg: string
  readonly numOfMembers: number
}
