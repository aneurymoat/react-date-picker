import React from 'react';
import Week from './Week.jsx';

const Month = (props) => (
    <div className="datepicker-month">
        {
            props.weeks.map((week, index) => (
                <Week
                  index={index}
                  week={week}
                  showCalendar={props.showCalendar}
                  selectedDate={props.selectedDate}
                  maxDate={props.maxDate}
                  key={`week-${index}`}
                  changeSelectedDate={props.changeSelectedDate}
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

Month.propTypes = {
    showCalendar: React.PropTypes.bool,
    active: React.PropTypes.string,
    currentDate: React.PropTypes.object,
    selectedDate: React.PropTypes.object,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    weeks: React.PropTypes.array,
    changeSelectedDate: React.PropTypes.func,
    changeStartDate: React.PropTypes.func,
    changeEndDate: React.PropTypes.func,
};

export default Month;
