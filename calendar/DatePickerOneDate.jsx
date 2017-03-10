/* global document, $ */

import React from 'react';
import moment from 'moment';
import Calendar from './Calendar.jsx';
import InputBox from './InputBox.jsx';
import { validateDate, createWeeks } from './utils.js';
// import { MOAT_STATIC_URL } from '../utils/constants.js';

const MOAT_STATIC_URL = ''

class DatePickerOneDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: this.props.selectedDate,
            currentDate: this.props.selectedDate,
            showCalendar: this.props.showCalendar,
            currentInput: this.props.selectedDate.format('MMMM DD, YYYY'),
            maxDate: this.props.maxDate,
        };
        this.changeSelectedDate = this.changeSelectedDate.bind(this);
        this.switchMonth = this.switchMonth.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const self = this;
        $(document).on('click', (e) => {
            const contains = $.contains(self.node, e.target);
            if (!contains) {
                self.setState({
                    showCalendar: false,
                });
            }
        });
        window.onpopstate = function onpopstate(e) {
            if (e.state) {
                const lastDate = e.state.lastInfo;
                const newMomentDate = moment(lastDate, 'YYYY-MM-DD');
                self.setState({
                    selectedDate: newMomentDate,
                    currentDate: newMomentDate,
                    currentInput: newMomentDate.format('MMMM DD, YYYY'),
                });
                self.props.changeDate(newMomentDate, false);
            }
        };
    }

    changeSelectedDate(selectedDate) {
        this.setState({
            selectedDate,
            currentDate: selectedDate,
            currentInput: selectedDate.format('MMMM DD, YYYY'),
        });
        this.toggleCalendar();
        this.props.changeDate(selectedDate, true);
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

    toggleCalendar() {
        if (!this.props.fetching) {
            this.setState({
                showCalendar: !this.state.showCalendar,
            });
        }
    }

    handleChange(e) {
        let value = e.target.value;
        const validDate = validateDate(e.target.value);
        if (validDate.valid) {
            const format = validDate.format;
            const newSelectedDate = moment(value, format);
            value = newSelectedDate.format('MMMM DD, YYYY');
            this.changeSelectedDate(newSelectedDate);
        }
        this.setState({
            currentInput: value,
        });
    }

    render() {
        let weeks = createWeeks(this.state.currentDate, this.state.maxDate);
        let calendarShadow = this.state.showCalendar ? 'calendar-shadow' : '';
        return (
            <div className="date-picker-one-date" ref={node => (this.node = node)}>
                <div className="top-bar">
                    <div
                      className="calendar-icon-container pointer col-xs-2"
                      onClick={this.toggleCalendar}
                    >
                        <img
                          src={`${MOAT_STATIC_URL}/img/calendar/icon.svg`}
                          className="calendar-icon"
                          alt="Calendar icon"
                        />
                    </div>
                    <InputBox
                      onClick={this.toggleCalendar}
                      currentInput={this.state.currentInput}
                      onChange={this.handleChange}
                      showCalendar={this.state.showCalendar}
                      className={"datepicker-inputbox-container col-xs-10"}
                    />
                </div>
                <Calendar
                  showCalendar={this.state.showCalendar}
                  currentDate={this.state.currentDate}
                  switchMonth={this.switchMonth}
                  changeSelectedDate={this.changeSelectedDate}
                  selectedDate={this.state.selectedDate}
                  maxDate={this.state.maxDate}
                  weeks={weeks}
                  calendarShadow={calendarShadow}
                />
            </div>
        );
    }
}

DatePickerOneDate.defaultProps = {
    selectedDate: moment().subtract(1, 'days'),
    showCalendar: false,
    maxDate: moment().subtract(1, 'days'),
};

DatePickerOneDate.propTypes = {
    fetching: React.PropTypes.bool,
    showCalendar: React.PropTypes.bool,
    selectedDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    changeDate: React.PropTypes.func,
};

export default DatePickerOneDate;
