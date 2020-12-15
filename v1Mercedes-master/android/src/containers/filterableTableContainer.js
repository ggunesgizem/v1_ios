import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FilterableTable from '../components/FilterableTable'
import { getDealerList, selectDealer, selectPrefered } from '../actions/dealerActions'
import { updateStage, setCurrentStage } from '../actions/bookingAction'

class FilterableTableContainer extends Component {
  constructor(props) {
    super(props)
    this.handleItemSelection = this.handleItemSelection.bind(this)
    this.handleBackClick = this.handleBackClick.bind(this)
    this.handleSelectItemClick = this.handleSelectItemClick.bind(this)
    this.handlePreferedClick = this.handlePreferedClick.bind(this)
    this.state = {
      expandedItem: null,
    }
  }

  // componentWillReceiveProps(props){
  //   this.setState({
  //     expandedItem: props.expandedItem,
  //   })
  // }

  componentDidMount() {
    // this.props.getDealerList()
  }
  handleItemSelection(item, e) {

    // this.props.selectDealer(item)
    this.props.onItemSelect(item.WorkshopId)
    this.setState({
      expandedItem: item
    })
  }

  handleSelectItemClick(item) {
    this.props.selectDealer(item)
    if(this.props.latestStage < 1){
      this.props.updateStage(1)
    } else {
      console.log("not updating latestStage: ", this.props.latestStage)
    }
    this.props.setCurrentStage(1)
  }

  handleBackClick(e) {
    e.preventDefault()
    this.setState({
      expandedItem: null
    })
  }

  handlePreferedClick(dealer) {
    if(this.props.isSettingMode){
      if(!this.props.preferredDealer){
        this.props.selectPrefered(dealer)
      } else if(this.props.preferredDealer.WorkshopId !== dealer.WorkshopId){
        this.props.selectPrefered(dealer)
      }
      this.props.settingPageForward()
    } else {
      if(!this.props.preferredDealer){
        this.props.selectPrefered(dealer)
      } else if(this.props.preferredDealer.WorkshopId !== dealer.WorkshopId){
        this.props.selectPrefered(dealer)
      } else {
        this.props.selectPrefered(null)
      }
    }
  }

  render() {
    return (
      <FilterableTable
        dealerList={this.props.lookingAt == 0 ? this.props.nearbyDealerList : this.props.dealerList}
        citylist={this.props.citylist}
        preferredDealer={this.props.preferredDealer}
        selectedDealer={this.props.selectedDealer}
        handleItemSelection={this.handleItemSelection}
        expandedItem={this.state.expandedItem}
        handleBackClick={this.handleBackClick}
        handleSelectItemClick={this.handleSelectItemClick}
        handlePreferedClick={this.handlePreferedClick}
        distanceList={this.props.distanceList}
        gotoCurrentLocation={this.props.gotoCurrentLocation}
        currentLocation={this.props.currentLocation}
        hasLocation={this.props.hasLocation}
        onIconClick={this.props.onIconClick}
        searchDealerInCity={this.props.searchDealerInCity}
        searchNearbyDealer={this.props.searchNearbyDealer}
        isSettingMode={this.props.isSettingMode}
        loadingStatus={this.props.loadingStatus}
      />
    )
  }
}

function mapStateToProps(state) {
  const { dealer } = state
  return {
    nearbyDealerList : dealer.nearbyDealerList,
    dealerList: dealer.all,
    preferredDealer: dealer.prefered,
    latestStage: state.booking.latestStage,
    selectedDealer: dealer.selected,
    loadingStatus: state.loading.status,
  }
}

FilterableTableContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


FilterableTableContainer.propTypes = {
  dealerList: PropTypes.array,
  getDealerList: PropTypes.func,
  selectDealer: PropTypes.func,
  goToSelectDateRoute: PropTypes.func,
  selectPrefered: PropTypes.func,
  preferredDealer: PropTypes.object,
  selectedDealer: PropTypes.object,
}

export default connect(mapStateToProps, { getDealerList, selectDealer, selectPrefered, updateStage, setCurrentStage })(FilterableTableContainer)
