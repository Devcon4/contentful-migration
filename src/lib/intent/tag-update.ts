import Intent from './base-intent'
import { TagUpdateAction } from '../action/tag-update'
import { PlanMessage } from '../interfaces/plan-message'
import chalk from 'chalk'

export default class TagUpdateIntent extends Intent {
  isTagIntent () {
    return true
  }

  isTagUpdate () {
    return true
  }

  getTagId () {
    return this.payload.tagId
  }

  groupsWith (other: Intent): boolean {
    const sameTag = other.getTagId() === this.getTagId()
    return (
      other.isTagUpdate() || other.isTagCreate()
   ) && sameTag
  }

  endsGroup (): boolean {
    return false
  }

  shouldPublish (): boolean {
    return false
  }

  toActions () {
    return [
      new TagUpdateAction(
        this.getTagId(),
        this.payload.props
      )
    ]
  }

  toPlanMessage (): PlanMessage {

    const details = []

    return {
      heading: chalk`Update Tag {bold.yellow ${this.getTagId()}}`,
      details,
      sections: []
    }
  }
}
