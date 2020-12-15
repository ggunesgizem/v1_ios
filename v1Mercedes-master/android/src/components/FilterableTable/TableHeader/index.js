import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import T from 'i18n-react'
import './table-header.css'

export default class TableHeader extends Component {
  constructor(props) {
    super(props)
    this.searchTerm = this.searchTerm.bind(this)
  }

  searchTerm(term){
    this.props.onSearchBarChange(term)
  }

  renderSearchBar() {
    const locationSearch = _.debounce((term) => {
      this.searchTerm(term)
    }, 1)

    return (
      <div className="dealer-search-group">
        <input
          type="text"
          value={this.props.searchTerm}
          className="search-bar-input needsclick"
          placeholder={T.translate("booking.workshop.search bar.hint text")}
          onChange={(e) => locationSearch(e.target.value)}
          onFocus={this.props.onSearchBarSelect}
        />
        <div className="search-bar-addon">
          {this.props.searchTerm === "" ?
            <div className="search-icon" /> :
            <div className="search-bar-clear" onClick = {()=>this.props.clearSearchBar()}/>
          }
        </div>
      </div>
    )
  }
  renderBackBar() {
    return (
      <div className="table-header-navibar" onClick={this.props.handleBackClick}>
        <div className="table-header-navi-button"/>
        {T.translate("booking.workshop.button.back")}
      </div>
    )
  }
  render() {
    return (
      <div className={this.props.type === "back" ? "table-alt-header" : "table-header"}>
        {this.props.type === "back" ? this.renderBackBar() : this.renderSearchBar()}
      </div>
    )
  }
}

TableHeader.propTypes = {
  handleBackClick: PropTypes.func,
  type: PropTypes.string,
}
