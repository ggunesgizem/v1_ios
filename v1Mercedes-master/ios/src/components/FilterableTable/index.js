import React, { Component, PropTypes } from 'react'
import { Transition } from 'react-transition-group'
import { fadeDuration, fixFadeStyle, transitionfadeStyles } from '../../pages/App/transitions'
import T from 'i18n-react'
import TableHeader from './TableHeader'
import TableItem from './TableItem'
import ExpandedItem from './ExpandedItem'
import SearchResult from './SearchResult'
import DealerMap from '../../components/DealerMap'
import DealerMapPopover from '../../components/DealerMap/DealerMapPopover'
import './filterable-table.css'

export default class FilterableTable extends Component {
  constructor(props) {
    super(props)
    this.renderSelectedItem = this.renderSelectedItem.bind(this)
    this.renderPreferredItem = this.renderPreferredItem.bind(this)
    this.renderTableItem = this.renderTableItem.bind(this)
    this.renderExpanedItem = this.renderExpanedItem.bind(this)
    this.showMapPopover = this.showMapPopover.bind(this)
    this.closeMapPopover = this.closeMapPopover.bind(this)
    this.onSearchBarChange = this.onSearchBarChange.bind(this)
    this.dismissSearchResult = this.dismissSearchResult.bind(this)
    this.searchDealerInCity = this.searchDealerInCity.bind(this)
    this.searchNearbyDealer = this.searchNearbyDealer.bind(this)
    this.onSearchBarSelect = this.onSearchBarSelect.bind(this)
    this.state = {
      mapPopover: false,
      searchResultDropdown: false,
      searchResultTable: false,
      searchTerm: '',
    }
  }

  renderSelectedItem(item){
    let isPreferred = false
    let isSelected = true
    if(this.props.preferredDealer){
      isPreferred = this.props.preferredDealer.WorkshopId === item.WorkshopId
    }
    return (
      <Transition
        in={true}
        appear={true}
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={fadeDuration}
      >
        {(state) => {
          return (
            <div style={{
               ...fixFadeStyle,
               ...transitionfadeStyles[state]
             }}>
             <div className="dealer-table-item-container" key={item.WorkshopId}>
               <div className="dealer-table-section-header">
                 {!this.state.searchResultTable ? T.translate("booking.workshop.selected") : T.translate("booking.workshop.search result.results") }
               </div>
               <TableItem
                 item={item}
                 distance={
                   this.props.distanceList.filter(obj => {
                     return obj.workshopId === item.WorkshopId
                   })[0]
                 }
                 handleItemSelection={this.props.handleItemSelection}
                 isPrefered={isPreferred}
                 isSelected={true}
                 hasLocation={this.props.hasLocation}
                 currentLocation = {this.props.currentLocation}
                />
                { this.props.preferredDealer ?
                    this.props.preferredDealer.WorkshopId === this.props.selectedDealer.WorkshopId && !this.state.searchResultTable ?
                    <div className="dealer-table-section-header">
                     {this.props.hasLocation ? T.translate("booking.workshop.search result.nearby") : T.translate("booking.workshop.search result.results")}
                    </div> : ''
                  :
                  !this.state.searchResultTable ?
                    <div className="dealer-table-section-header">
                     {this.props.hasLocation ? T.translate("booking.workshop.search result.nearby") : T.translate("booking.workshop.search result.results")}
                    </div>
                    : ''
                }
             </div>
            </div>
          )
        }}
      </Transition>
    )
  }

  renderPreferredItem(item){
    let isPreferred = false
    let isSelected = false
    if(this.props.preferredDealer){
      isPreferred = this.props.preferredDealer.WorkshopId === item.WorkshopId
    }
    if(this.props.selectedDealer){
      isSelected = this.props.selectedDealer.WorkshopId === item.WorkshopId
    }
    return (
      <Transition
        in={true}
        appear={true}
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={fadeDuration}
      >
        {(state) => {
          return (
            <div style={{
               ...fixFadeStyle,
               ...transitionfadeStyles[state]
             }}>
              <div className="dealer-table-item-container" key={item.WorkshopId}>
                <div className="dealer-table-section-header">
                  {!this.state.searchResultTable ? T.translate("booking.workshop.preferred") : T.translate("booking.workshop.search result.results")}
                </div>
                <TableItem
                  item={item}
                  distance={
                    this.props.distanceList.filter(obj => {
                      return obj.workshopId === item.WorkshopId
                    })[0]
                  }
                  handleItemSelection={this.props.handleItemSelection}
                  isPrefered={isPreferred}
                  isSelected={isSelected}
                  hasLocation={this.props.hasLocation}
                  currentLocation = {this.props.currentLocation}
                 />
                 {!this.state.searchResultTable ?
                   <div className="dealer-table-section-header">
                     {this.props.hasLocation ? T.translate("booking.workshop.search result.nearby") : T.translate("booking.workshop.search result.results")}
                   </div> :
                   ''
                 }
              </div>
            </div>
          )
        }}
      </Transition>)
  }

  renderTableItem(item, key) {
    let isPreferred = false
    let isSelected = false
    if(this.props.preferredDealer){
      isPreferred = this.props.preferredDealer.WorkshopId === item.WorkshopId
    }
    if(this.props.selectedDealer){
      isSelected = this.props.selectedDealer.WorkshopId === item.WorkshopId
    }
    if(!isPreferred && !isSelected){
      return (
        <Transition
          in={true}
          appear={true}
          timeout={fadeDuration}
          mountOnEnter={true}
          unmountOnExit={true}
          key={"a"+key}
        >
          {(state) => {
            return (
              <div style={{
                 ...fixFadeStyle,
                 ...transitionfadeStyles[state]
               }}>
               <div className="dealer-table-item-container">
                 {key === 0 && !this.props.preferredDealer && !this.props.selectedDealer ?
                   <div className="dealer-table-section-header">
                     {!this.state.searchResultTable ? this.props.hasLocation ? T.translate("booking.workshop.search result.nearby") : T.translate("booking.workshop.search result.results") : T.translate("booking.workshop.search result.results")}
                   </div> :
                   ''
                 }
                 <TableItem
                   item={item}
                   distance={
                     this.props.distanceList.filter(obj => {
                       return obj.workshopId === item.WorkshopId
                     })[0]
                   }
                   handleItemSelection={this.props.handleItemSelection}
                   isPrefered={false}
                   isSelected={false}
                   hasLocation={this.props.hasLocation}
                   currentLocation = {this.props.currentLocation}
                 />
               </div>
            </div>
          )
        }}
        </Transition>
      )
    } else {
      return ''
    }

  }
  renderExpanedItem(item) {
    if(this.state.searchResultDropdown === true){
      this.setState({
        searchResultDropdown:false,
      })
    }
    let isPrefered = false
    if(this.props.preferredDealer){
      isPrefered = this.props.preferredDealer.WorkshopId === item.WorkshopId
    }
    return (
      <Transition
        in={true}
        appear={true}
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={fadeDuration}
      >
        {(state) => {
          return (
            <div style={{
               ...fixFadeStyle,
               ...transitionfadeStyles[state]
             }}>
              <ExpandedItem
                item={item}
                distance={
                  this.props.distanceList.filter(obj => {
                    return obj.workshopId === item.WorkshopId
                  })[0]
                }
                handleSelectItemClick={this.props.handleSelectItemClick}
                handlePreferedClick={this.props.handlePreferedClick}
                isPrefered={isPrefered}
                currentLocation={this.props.currentLocation}
                isSettingMode={this.props.isSettingMode}
              />
            </div>
          )
        }}
      </Transition>
    )
  }

  onSearchBarChange(term) {
    console.log("term", term);
    if(term !== ""){
      this.setState({
        searchResultDropdown:true,
        searchTerm:term,
      })
    } else {
      this.setState({
        searchResultDropdown:false,
        searchTerm:"",
        searchResultTable:false,
      })
      //this.props.searchNearbyDealer()
    }
  }

  onSearchBarSelect(e){
    if(e.target.value !== ""){
      this.setState({
        searchResultDropdown:true,
        searchTerm:e.target.value,
      })
    }
  }

  dismissSearchResult(){
    this.setState({
      searchResultDropdown:false,
      searchTerm:"",
      searchResultTable:false,
    })
    //this.props.searchNearbyDealer()
  }

  showMapPopover(){
    this.setState({
      mapPopover:true,
    })
  }

  closeMapPopover(){
    this.setState({
      mapPopover:false,
    })
  }

  searchDealerInCity(city,e){
    console.log("item select");
    console.log(e);
    this.setState({
      searchResultDropdown:false,
      searchTerm:city,
      searchResultTable: true,
    })
    this.props.searchDealerInCity(city)
  }

  searchNearbyDealer(){
    console.log("resetting dealer table")
    this.setState({
      searchResultDropdown:false,
      searchTerm:"",
      searchResultTable:false,
    })
    this.props.searchNearbyDealer()
  }

  componentDidMount(){
    this.setState({
      searchResultDropdown:false,
      mapPopover:false,
    })
  }

  render() {
  
    // console.log("dealerList:", this.props.dealerList)
    // console.log("preferred:", this.props.preferredDealer.WorkshopId)
    // console.log("selected:", this.props.selectedDealer.WorkshopId)
    // console.log("expanded:", this.props.expandedItem)
   
    const tableHearderStyle = this.props.expandedItem === null ? "search" : "back"
    return (
      <div className="filterable-table">
        <TableHeader
          type={tableHearderStyle}
          handleBackClick={this.props.handleBackClick}
          onSearchBarChange={this.onSearchBarChange}
          gotoCurrentLocation={this.props.gotoCurrentLocation}
          searchTerm={this.state.searchTerm}
          onSearchBarSelect={this.onSearchBarSelect}
          clearSearchBar={this.searchNearbyDealer}
        />
        <Transition
          in={this.state.searchResultDropdown === true}
          mountOnEnter={true}
          unmountOnExit={true}
          timeout={fadeDuration}
        >
          {(state) => {
            return (
              <div className="filterable-table-dealer-list-parent" style={{
                 ...fixFadeStyle,
                 ...transitionfadeStyles[state]
               }}>
                <div style={{width:"100%", height:"calc(100% - 44px)"}} onClick={()=>this.dismissSearchResult()}>

                  <SearchResult
                    searchInput = {this.state.searchTerm}
                    itemList = {this.props.citylist}
                    onItemSelect = {this.searchDealerInCity}
                    onAllSelect = {this.searchNearbyDealer}
                  />
                </div>
              </div>
            )
          }}
        </Transition>
        <div className="filterable-table-dealer-list">
            {this.props.expandedItem === null ?
              ((this.props.selectedDealer !== null && !this.state.searchResultTable) || (this.props.selectedDealer !== null && this.state.searchResultTable && this.props.selectedDealer.City === this.state.searchTerm)) ?
              this.renderSelectedItem(this.props.selectedDealer)
              : ''
            : this.renderExpanedItem(this.props.expandedItem)}
            {this.props.expandedItem === null ?
              ((this.props.preferredDealer !== null && !this.state.searchResultTable) || (this.props.preferredDealer !== null && this.state.searchResultTable && this.props.preferredDealer.City === this.state.searchTerm)) ?
                this.props.selectedDealer ?
                  this.props.preferredDealer.WorkshopId === this.props.selectedDealer.WorkshopId ? ''
                  : this.renderPreferredItem(this.props.preferredDealer)
                : this.renderPreferredItem(this.props.preferredDealer)
              : ''
            : ''}
            {this.props.expandedItem === null ?
              this.props.dealerList.length === 0 ? <div className="search-no-result"> {this.props.loadingStatus === 0 ? T.translate("booking.workshop.locating nearby dealers") : T.translate("booking.workshop.no nearby dealer found")}  </div>
              : this.props.dealerList.map(this.renderTableItem)
            : ''}
            {this.props.expandedItem === null ? '' :
              this.props.hasLocation && !isNaN(parseFloat(this.props.expandedItem.Latitude)) && !isNaN(parseFloat(this.props.expandedItem.Longitude)) ?
                <div>
                  <DealerMap
                    dealerLocation={{lat:parseFloat(this.props.expandedItem.Latitude), lng:parseFloat(this.props.expandedItem.Longitude)}}
                    onIconClick={this.props.onIconClick}
                    currentLocation={this.props.currentLocation}
                    selectedDealerID={this.props.expandedItem.WorkshopId}
                    showMapPopover={this.showMapPopover}
                  />
                  {typeof(this.props.isSettingMode) === 'undefined' ?
                    <button className="btn button_general expand-select-workshop-btn" onClick={() => this.props.handleSelectItemClick(this.props.expandedItem)}>
                      {T.translate("booking.workshop.button.select this workshop")}
                    </button>
                    :
                    <button className="btn button_general expand-select-workshop-btn" onClick={() => this.props.handlePreferedClick(this.props.expandedItem)}>
                      {T.translate("booking.workshop.preference.button.next")}
                    </button>
                  }
                </div>
                :
                <div>
                  {typeof(this.props.isSettingMode) === 'undefined' ?
                    <button className="btn button_general expand-select-workshop-btn" onClick={() => this.props.handleSelectItemClick(this.props.expandedItem)}>
                      {T.translate("booking.workshop.button.select this workshop")}
                    </button>
                    :
                    <button className="btn button_general expand-select-workshop-btn" onClick={() => this.props.handlePreferedClick(this.props.expandedItem)}>
                     Sonraki
                    </button>
                  }
                </div>
            }
        </div>
        <Transition
          in={true}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}
          timeout={fadeDuration}
        >
          {(state) => {
            return (
              <div style={{
                 ...fixFadeStyle,
                 ...transitionfadeStyles[state]
               }}>
                {this.state.mapPopover ?
                  <DealerMapPopover
                    dealerLocation = {{lat:parseFloat(this.props.expandedItem.Latitude), lng:parseFloat(this.props.expandedItem.Longitude)}}
                    currentLocation = {this.props.currentLocation}
                    closePopover = {this.closeMapPopover}
                  /> : ''
                }
                </div>
              )
            }}
        </Transition>
      </div>

    )
  }
}

FilterableTable.propTypes = {
  dealerList: PropTypes.array,
  handleItemSelection: PropTypes.func,
  expandedItem: PropTypes.object,
  handleBackClick: PropTypes.func,
  handleSelectItemClick: PropTypes.func,
  handlePreferedClick: PropTypes.func,
  preferredDealer: PropTypes.object,
}

FilterableTable.defaultProps = {
  dealerList: [],
  handleItemSelection: i => i,
  expandedItem: null,
  preferredDealer: null,
}
