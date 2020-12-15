import React, { Component, PropTypes } from 'react'
import T from 'i18n-react'
import './searchResult.css'

export default class SearchResult extends Component {
  constructor(props) {
    super(props)
    this.searchItem = this.searchItem.bind(this)
    this.renderSearchResult = this.renderSearchResult.bind(this)
  }

  searchItem(){
    let resultList = []
    this.props.itemList.forEach((city) => {
        if(city.toUpperCase().startsWith(this.props.searchInput.toUpperCase())){
          resultList.push(city)
        }
    })
    if(resultList.length === 0){
      return (
        <div className="search-result-item" style={{color:"#cccccc"}}>
          No result
        </div>
      )
    } else {
      return(resultList.map(this.renderSearchResult))
    }
  }

  renderSearchResult(item, key){
    return(
      <div key={key} className="search-result-item" onClick={(e) => {e.preventDefault(); this.props.onItemSelect(item, e)}}>
        {item}
      </div>
    )
  }

  render() {
    return (
      <div className="search-result-container">
        <div className="search-result-header">
          <div className="search-result-show-all" onClick={(x) => {x.preventDefault(); this.props.onAllSelect()}}>
            {T.translate("booking.workshop.search result.nearby")}
            <div className="search-result-icon" />
          </div>
          <div className="search-result-section-header">
            {T.translate("booking.workshop.search result.results")}
          </div>
        </div>
        <div className="search-result-content">
          {this.searchItem()}
        </div>
      </div>
    )
  }
}

SearchResult.propTypes = {
  searchInput: PropTypes.string,
  itemList: PropTypes.array,
  onItemSelect: PropTypes.func,
  onAllSelect: PropTypes.func,
}
