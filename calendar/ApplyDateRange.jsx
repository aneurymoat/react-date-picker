import React from 'react';

class ApplyDateRange extends React.Component {
    render() {
        let finalRender = null;
        if (this.props.showApplyDateRange) {
            finalRender = (
                <div className="datepicker-apply-date-range-container">
                    <a onClick={this.props.applyDateRange} className="apply-date-range">
                      Apply Date Range
                    </a>
                </div>
            );
        }
        return finalRender;
    }
}

export default ApplyDateRange;

ApplyDateRange.propTypes = {
    showApplyDateRange: React.PropTypes.bool,
    applyDateRange: React.PropTypes.func,
};
