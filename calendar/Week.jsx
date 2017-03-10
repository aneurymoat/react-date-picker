import React from 'react';
import Day from './Day.jsx';

const Week = (props) => (
    <div className="datepicker-week">
        {
            props.week.map((day, index) => (
                <Day
                  showCalendar={props.showCalendar}
                  selectedDate={props.selectedDate}
                  maxDate={props.maxDate}
                  day={day}
                  changeSelectedDate={props.changeSelectedDate}
                  key={`week-${props.index}-day-${index}`}
                  startDate={props.startDate}
                  endDate={props.endDate}
                  changeStartDate={props.changeStartDate}
                  changeEndDate={props.changeEndDate}
                  active={props.active}
                />
            ))
        }
    </div>
);

Week.propTypes = {
    showCalendar: React.PropTypes.bool,
    active: React.PropTypes.string,
    index: React.PropTypes.number,
    week: React.PropTypes.array,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    selectedDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    changeSelectedDate: React.PropTypes.func,
    changeStartDate: React.PropTypes.func,
    changeEndDate: React.PropTypes.func,
};

export default Week;
