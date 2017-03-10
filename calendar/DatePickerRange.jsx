/* global document, $ */

import React from 'react';
import moment from 'moment';
import Calendar from './Calendar.jsx';
import InputBox from './InputBox.jsx';
import { validateDate, createWeeks } from './utils.js';
// import { MOAT_STATIC_URL } from '../utils/constants.js';

class DatePickerRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            currentStartInput: this.props.startDate.format('MMM DD, YYYY'),
            currentEndInput: this.props.endDate.format('MMM DD, YYYY'),
            showCalendar: this.props.showCalendar,
            maxDate: this.props.maxDate,
            currentDate: this.props.startDate,
            active: null,
        };
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.switchMonth = this.switchMonth.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.startDateClicked = this.startDateClicked.bind(this);
        this.endDateClicked = this.endDateClicked.bind(this);
        this.applyDateRange = this.applyDateRange.bind(this);
    }

    componentDidMount() {
        const self = this;
        $(document).on('click', (e) => {
            if (self.node) {
                const contains = $.contains(self.node, e.target);
                if (!contains) {
                    self.setState({
                        showCalendar: false,
                    });
                }
            }
        });
    }

    changeStartDate(newStartDate) {
        const newState = {
            startDate: newStartDate,
            currentDate: newStartDate,
        };
        if (this.state.endDate) {
            if (newStartDate.isAfter(this.state.endDate)) {
                newState.endDate = newStartDate.clone();
                newState.currentEndInput = newStartDate.format('MMM DD, YYYY');
            }
        }
        this.setState(newState);
        sendEventToGa('DatePicker', 'Calendar Click', newStartDate.format('YYYY-MM-DD'), 0);
        sendEventToGa('DatePicker', 'Start Date Change', newStartDate.format('YYYY-MM-DD'), 0);
    }

    changeEndDate(newEndDate) {
        const newState = {
            endDate: newEndDate,
            currentDate: newEndDate,
        };
        if (this.state.startDate) {
            if (newEndDate.isBefore(this.state.startDate)) {
                newState.startDate = newEndDate.clone();
                newState.currentStartInput = newEndDate.format('MMM DD, YYYY');
            }
        }
        this.setState(newState);
        sendEventToGa('DatePicker', 'Calendar Click', newEndDate.format('YYYY-MM-DD'), 0);
        sendEventToGa('DatePicker', 'End Date Change', newEndDate.format('YYYY-MM-DD'), 0);
    }

    switchMonth(direction) {
        let newCurrentDate;
        if (direction === 'back') {
            newCurrentDate = this.state.currentDate.clone().subtract(1, 'months');
        } else if (direction === 'next') {
            newCurrentDate = this.state.currentDate.clone().add(1, 'months');
        }
        this.setState({
            currentDate: newCurrentDate,
        });
    }

    startDateClicked() {
        this.setState({
            active: 'start',
            showCalendar: true,
        });
    }

    endDateClicked() {
        this.setState({
            active: 'end',
            showCalendar: true,
        });
    }

    toggleCalendar() {
        if (!this.state.showCalendar) {
            sendEventToGa('DatePicker', 'Open', '');
        }
        this.setState({
            showCalendar: !this.state.showCalendar,
            active: !this.state.showCalendar ? 'start' : '',
        });
    }

    handleStartDateChange(e) {
        const value = e.target.value;
        const validDate = validateDate(e.target.value);
        if (validDate.valid) {
            const format = validDate.format;
            const newStartDate = moment(value, format);
            this.changeStartDate(newStartDate);
        }
        this.setState({
            currentStartInput: value,
        });
    }

    handleEndDateChange(e) {
        const value = e.target.value;
        const validDate = validateDate(e.target.value);
        if (validDate.valid) {
            const format = validDate.format;
            const newEndDate = moment(value, format);
            this.changeEndDate(newEndDate);
        }
        this.setState({
            currentEndInput: value,
        });
    }

    applyDateRange() {
        const { startDate, endDate } = this.state;
        this.setState({
            showCalendar: false,
            active: null,
            currentStartInput: startDate.format('MMM DD, YYYY'),
            currentEndInput: endDate.format('MMM DD, YYYY'),
        });
        this.props.applyDateRange(startDate, endDate);
        const eventLabel = `${startDate.format('YYYY-MM-DD')} to ${endDate.format('YYYY-MM-DD')}`;
        sendEventToGa('DatePicker', 'Apply Date Range Click', eventLabel, 1);
    }

    render() {
        const weeks = createWeeks(this.state.currentDate, this.state.maxDate);
        const calendarShadow = this.state.showCalendar ? 'calendar-shadow' : '';
        const removeOverflowHidden = this.state.showCalendar ? '' : 'hide-overflow';
        const arrowSrc = `${MOAT_STATIC_URL}/img/calendar/gray-arrow.svg`;
        return (
            <div
              className={`date-picker-range ${removeOverflowHidden}`}
              ref={node => (this.node = node)}
            >
                <div className="top-bar">
                    <div
                      className="calendar-icon-container pointer"
                      onClick={this.toggleCalendar}
                    >
                        <img
                          src={`${MOAT_STATIC_URL}/img/calendar/icon.svg`}
                          className="calendar-icon"
                          alt="Calendar icon"
                        />
                    </div>
                    <InputBox
                      onClick={this.startDateClicked}
                      currentInput={this.state.currentStartInput}
                      onChange={this.handleStartDateChange}
                      active={this.state.active === 'start'}
                      className={'datepicker-inputbox-container first-input'}
                    />
                    <div className="arrow-icon-container">
                        <img
                          src={arrowSrc}
                          className="arrow-icon"
                          alt="Arrow icon"
                        />
                    </div>
                    <InputBox
                      onClick={this.endDateClicked}
                      currentInput={this.state.currentEndInput}
                      onChange={this.handleEndDateChange}
                      active={this.state.active === 'end'}
                      className={'datepicker-inputbox-container'}
                    />
                </div>
                <Calendar
                  showCalendar={this.state.showCalendar}
                  currentDate={this.state.currentDate}
                  switchMonth={this.switchMonth}
                  changeStartDate={this.changeStartDate}
                  changeEndDate={this.changeEndDate}
                  active={this.state.active}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  maxDate={this.state.maxDate}
                  weeks={weeks}
                  calendarShadow={calendarShadow}
                  showApplyDateRange
                  applyDateRange={this.applyDateRange}
                />
            </div>
        );
    }
}

DatePickerRange.defaultProps = {
    showCalendar: false,
    maxDate: moment(),
};

DatePickerRange.propTypes = {
    showCalendar: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    applyDateRange: React.PropTypes.func,
};

export default DatePickerRange;
