import React from 'react';
// import { MOAT_STATIC_URL } from '../utils/constants.js';

const MOAT_STATIC_URL = ''

const CalendarHeader = (props) => (
    <div className="datepicker-header row no-margin">
        <div className="previous-month col-xs-4">
            <a onClick={() => { props.switchMonth('back'); }} className="no-arrow-style pointer">
                <img
                  src={`${MOAT_STATIC_URL}/img/calendar/back_arrow.svg`}
                  className="back-arrow"
                  alt="back arrow"
                />
                {props.previousMonth}
            </a>
        </div>
        <div className="col-xs-4 current-month">
            {props.currentMonth}
        </div>
        <div className="next-month col-xs-4">
            <a onClick={() => { props.switchMonth('next'); }} className="no-arrow-style pointer">
                {props.nextMonth}
                <img
                  src={`${MOAT_STATIC_URL}/img/calendar/next_arrow.svg`}
                  className="next-arrow"
                  alt="next arrow"
                />
            </a>
        </div>
    </div>
);

CalendarHeader.propTypes = {
    currentMonth: React.PropTypes.string,
    previousMonth: React.PropTypes.string,
    nextMonth: React.PropTypes.string,
    switchMonth: React.PropTypes.func,
};


export default CalendarHeader;
