import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setSelectedDate } from '../../../../actions/ui/selectedDate'

import NavigationDateButton from './NavigationDateButton'
import ChoosedDate from './ChoosedDate'

import './index.css'

class DateColumn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: new Date(),
      initialDate: new Date(),
      isShowCalendar: false,
      scrollTopPixels: 0,
    }
    this.handleChoosedDateClick = this.handleChoosedDateClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleNextDayClick = this.handleNextDayClick.bind(this);
    this.handlePreviousDayClick = this.handlePreviousDayClick.bind(this);
  }

  componentWillMount = () => {
    if (this.props.selectedDate) {
      this.setState({
        selectedDate: this.props.selectedDate
      })
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.selectedDate != nextState.selectedDate) {
      this.props.setSelectedDate(nextState.selectedDate);
    }
  }

  handleScroll = (e) => {
    var scrollTop = window.pageYOffset
    this.setState({
      scrollTop: scrollTop
    })
  }

  checkIfShowNavigate = () => {
    const { initialDate, selectedDate } = this.state;
    let showPrev = true;
    let showNext = true;
    if (selectedDate.getMonth() === initialDate.getMonth() && selectedDate.getDate() === 1) {
      showPrev = false;
    }
    if (selectedDate.getMonth() === (initialDate.getMonth() + 2) && new Date(selectedDate.getTime() + 86400000).getDate() === 1) {
      showNext = false;
    }
    return {
      showPrev,
      showNext
    }
  }

  handlePreviousDayClick = () => {
    let date = this.state.selectedDate;
    date = new Date(date.setDate(date.getDate() - 1));
    this.setState({
      selectedDate: date
    })
  }

  handleNextDayClick = () => {
    let date = this.state.selectedDate;
    date = new Date(date.setDate(date.getDate() + 1));
    this.setState({
      selectedDate: date
    })
  }

  handleChoosedDateClick = () => {
    this.setState({
      isShowCalendar: !this.state.isShowCalendar
    })
  }

  handleDayClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  }

  findElemTopPixels = () => {
    const headerHeight = 71; //mobile header height
    const scrollTop = this.state.scrollTop || 0;
    if (scrollTop > headerHeight) {
      return 0
    }
    else {
      return headerHeight - scrollTop;
    }
  }

  render() {  
    const {
      selectedDate, 
      isShowCalendar
    } = this.state;
    const {
      showPrev,
      showNext
    } = this.checkIfShowNavigate();
    const topDateColumnPixels = this.findElemTopPixels();
    
    return (
      <div className="dateColumn" style={{ top: topDateColumnPixels + 'px' }} >
        <NavigationDateButton
          isShow={showPrev}
          type='previous'
          handleClick={this.handlePreviousDayClick}
        />
        <ChoosedDate 
          selectedDate={selectedDate}
          isShowCalendar={isShowCalendar}
          handleChoosedDateClick={this.handleChoosedDateClick}
          handleDayClick={this.handleDayClick} 
        />
        <NavigationDateButton
          isShow={showNext}
          type='next'
          handleClick={this.handleNextDayClick}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate
})

const mapDispatchToProps = {
  setSelectedDate
}

export default connect(mapStateToProps, mapDispatchToProps)(DateColumn);