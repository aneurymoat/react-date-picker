import React from 'react';
import CalendarHeader from './CalendarHeader.jsx';
import Month from './Month.jsx';
import MonthHeader from './MonthHeader.jsx';
import ApplyDateRange from './ApplyDateRange.jsx';
import { getCurrentMonth, getPreviousMonth, getNextMonth, getCalendarHeight } from './utils.js';

const Calendar = (props) => (
    <div className={`datepicker-calendar-container ${props.calendarShadow}`}>
        <div
          className={`datepicker-calendar
            ${getCalendarHeight(props.showCalendar, props.weeks.length)}`}
        >
            <CalendarHeader
              currentMonth={getCurrentMonth(props.currentDate)}
              switchMonth={props.switchMonth}
              previousMonth={getPreviousMonth(props.currentDate)}
              nextMonth={getNextMonth(props.currentDate)}
            />
            <MonthHeader />
            <Month
              showCalendar={props.showCalendar}
              currentDate={props.currentDate}
              selectedDate={props.selectedDate}
              maxDate={props.maxDate}
              weeks={props.weeks}
              changeSelectedDate={props.changeSelectedDate}
              startDate={props.startDate}
              endDate={props.endDate}
              changeStartDate={props.changeStartDate}
              changeEndDate={props.changeEndDate}
              active={props.active}
            />
            <ApplyDateRange
              showApplyDateRange={props.showApplyDateRange}
              applyDateRange={props.applyDateRange}
            />
        </div>
    </div>
);

Calendar.propTypes = {
    showCalendar: React.PropTypes.bool,
    showApplyDateRange: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    active: React.PropTypes.string,
    calendarShadow: React.PropTypes.string,
    weeks: React.PropTypes.array,
    currentDate: React.PropTypes.object,
    selectedDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    switchMonth: React.PropTypes.func,
    changeSelectedDate: React.PropTypes.func,
    changeStartDate: React.PropTypes.func,
    changeEndDate: React.PropTypes.func,
    applyDateRange: React.PropTypes.func,
};

export default Calendar;
