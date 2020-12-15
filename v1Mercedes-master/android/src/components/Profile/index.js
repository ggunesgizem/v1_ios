import React, { Component } from 'react'
import './profileDetail.css'
import TextButton from '../TextButton'

const FItem = (type, value) => {
  return (
    <div className="fItem">
      <div className="fItem_type">{type}</div>
      <div className="fItem_value">{value}</div>
    </div>
  )
}

export default class ProfileDetail extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className="profileDetailMain">
        <div className="profileDetailMain_twinItemContainer">
          <div className="profileDetailMain_twinItem">
            {FItem("Full Name",this.props.user.firstName)}
          </div>
          <div className="profileDetailMain_twinItem"> asd</div>
        </div>
        <TextButton
          buttonText={"Edit"}
          paddingTop={true}
          />
      </div>
    )
  }
}
