import React from 'react';
import { createSelectedDateClass, createDayClassName,
createInDateRangeClass, extendWidth } from './utils.js';

const Day = (props) => (
    <div className="datepicker-day-container">
        <div
          className={createSelectedDateClass(props.day, props.selectedDate, props.showCalendar,
            props.startDate, props.endDate)}
        />
        <div
          className={createInDateRangeClass(props.day, props.selectedDate, props.showCalendar,
            props.startDate, props.endDate)}
          style={extendWidth(props.day, props.startDate, props.endDate)}
        />
        <div
          className={`${createDayClassName(props.day, props.selectedDate, props.startDate,
            props.endDate)}`}
          onClick={() => {
              if (!props.day.isOverMaxDate) {
                  if (props.active) {
                      if (props.active === 'start') {
                          const newStartDate = props.day.clone();
                          props.changeStartDate(newStartDate);
                      } else if (props.active === 'end') {
                          const newEndDate = props.day.clone();
                          props.changeEndDate(newEndDate);
                      }
                  } else {
                      if (props.changeSelectedDate) {
                          const newSelectedDate = props.day.clone();
                          props.changeSelectedDate(newSelectedDate);
                      }
                  }
              }
          }}
        >
            {props.day.date()}
        </div>
    </div>
);

Day.propTypes = {
    showCalendar: React.PropTypes.bool,
    selectedDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    day: React.PropTypes.object,
    changeSelectedDate: React.PropTypes.func,
};

export default Day;
