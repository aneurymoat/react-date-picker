import React from 'react';

const InputBox = (props) => (
    <div className={props.className} onClick={props.onClick}>
        <input
          className={props.active ? 'datepicker-inputbox-selected' : 'datepicker-inputbox'}
          onChange={props.onChange}
          value={props.currentInput}
        />
    </div>
);

InputBox.propTypes = {
    showCalendar: React.PropTypes.bool,
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    currentInput: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
};

export default InputBox;
