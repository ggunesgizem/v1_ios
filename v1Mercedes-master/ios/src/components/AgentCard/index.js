import React, {
  Component,
  PropTypes
} from 'react'
import T from 'i18n-react'
import './agentCard.css'
import agentImage from './agent.svg'
import ImageCacheLoader from '../ImageCacheLoader'

export default class AgentCard extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.agent);
    this.onAgentSelect = this.onAgentSelect.bind(this)
    this.prefix = ''
  }

  onAgentSelect() {
    this.props.onAgentSelect(this.props.agent)
  }

  render() {
    return (
  <div className="agent-card-parent-container">
    <div className="agent-card-parent-container-sub">
      <div
        className={
        this.props.selectedAgent.ServiceAgentId===this.props.agent.ServiceAgentId
        ?
        "agent-card-container-selected"
        :
        "agent-card-container"
        }
        onClick={
        this.onAgentSelect
        }
      >
        <div className="agent-card-selected-header"> { this.props.selectedAgent.ServiceAgentId === this.props.agent.ServiceAgentId ?
          <div className="agent-card-selected-icon" /> : '' } { this.props.selectedAgent.ServiceAgentId === this.props.agent.ServiceAgentId ?
          <div className="agent-card-selected-text"> {T.translate("booking.agent.selected")} </div> : '' } </div>
        <div className="accDetailImageParent">
          <div className="agent-card-image">
            <ImageCacheLoader style={{width:"100%", height:"100%"}} fit={"contain"} src={this.props.agent.ImageURL} priority={3}/>
          </div>
    </div>
    <div className="agent-card-text-container">
      <div className="agent-card-name"> { `${this.props.agent.FirstName} ${this.props.agent.LastName}` } </div>
      <div className="agent-card-contact-title">
        <div className="agent-card-email-icon" />
        <div className="agent-card-contact-text"> { T.translate("booking.agent.email") } </div>
      </div>
      <div className="agent-card-contact"> { this.props.agent.Email } </div>
    </div>
  </div>
  </div>
  </div>

      )
    }
  }

  AgentCard.propTypes = {
    agent: PropTypes.object,
  }
