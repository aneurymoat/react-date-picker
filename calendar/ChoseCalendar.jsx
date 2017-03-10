import moment from 'moment';
import React from 'react';
import DatePickerOneDate from './DatePickerOneDate.jsx';
import DatePickerRange from './DatePickerRange.jsx';

class ChoseCalendar extends React.Component {
    render() {
        let finalRender = null;
        if (this.props.mode === 'one-date') {
            finalRender = (
                <DatePickerOneDate
                  changeDate={this.props.changeDate}
                  selectedDate={this.props.selectedDate}
                  fetching={this.props.fetching}
                />
            );
        } else if (this.props.mode === 'date-range') {
            if (this.props.startDate &&
                this.props.endDate) {
                finalRender = (
                    <DatePickerRange
                      startDate={moment(this.props.startDate, 'YYYY-MM-DD')}
                      endDate={moment(this.props.endDate, 'YYYY-MM-DD')}
                      applyDateRange={this.props.applyDateRange}
                    />
                );
            }
        }
        return finalRender;
    }
}

export default ChoseCalendar;

ChoseCalendar.defaultProps = {
    fetching: false,
    startDate: '',
    endDate: '',
    selectedDate: moment().subtract(1, 'days'),
    applyDateRange: function applyDateRange() {},
    changeDate: function changeDate() {},
};

ChoseCalendar.propTypes = {
    fetching: React.PropTypes.bool,
    startDate: React.PropTypes.string,
    endDate: React.PropTypes.string,
    mode: React.PropTypes.string,
    selectedDate: React.PropTypes.object,
    changeDate: React.PropTypes.func,
    applyDateRange: React.PropTypes.func,
};
