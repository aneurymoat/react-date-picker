import moment from 'moment';

function isOverMaxDate(day, maxDate, dayInCurrentMonth) {
    const modifiedDay = day;
    if (modifiedDay.isAfter(maxDate) || modifiedDay.isSame(maxDate, 'day')) {
        modifiedDay.isOverMaxDate = true;
        modifiedDay.type = 'over-max-date';
    } else {
        modifiedDay.type = dayInCurrentMonth ? 'valid' : 'not-valid';
        modifiedDay.isOverMaxDate = false;
    }
    return modifiedDay;
}

function fillInLastWeek(weeks, maxDate) {
    const lastWeek = weeks[weeks.length - 1];
    if (lastWeek.length !== 7) {
        const numToAdd = 7 - lastWeek.length;
        const lastDay = lastWeek[lastWeek.length - 1];
        for (let i = 1; i <= numToAdd; i++) {
            const nextMonthDay = lastDay.clone().add(i, 'days');
            const modifiedDay = isOverMaxDate(nextMonthDay, maxDate, false);
            weeks[weeks.length - 1].push(modifiedDay);
        }
    }
}

function fillInDaysOfTheMonth(startOfMonth, weeks, maxDate) {
    const daysInMonth = moment(startOfMonth).daysInMonth();
    const arrayOfDays = new Array(daysInMonth);
    let currentWeekIndex = 0;
    for (let i = 0; i < arrayOfDays.length; i++) {
        const newDay = startOfMonth.clone().add(i, 'days');
        isOverMaxDate(newDay, maxDate, true);
        if (weeks[currentWeekIndex] === undefined) {
            weeks.push([]);
        }
        const currentWeek = weeks[currentWeekIndex];
        currentWeek.push(newDay);
        if (currentWeek.length === 7) {
            currentWeekIndex += 1;
        }
    }
}

function fillInFirstWeek(startOfMonth, weeks, maxDate) {
    const startOfWeek = startOfMonth.day();
    if (startOfWeek !== 0) {
        const nullDays = startOfWeek;
        for (let i = nullDays; i > 0; i--) {
            const previousDay = startOfMonth.clone().subtract(i, 'days');
            isOverMaxDate(previousDay, maxDate, false);
            weeks[0].push(previousDay);
        }
    }
}

export function createWeeks(currentDate, maxDate) {
    const weeks = [[]];
    const startOfMonth = currentDate.clone().startOf('month');
    fillInFirstWeek(startOfMonth, weeks, maxDate);
    fillInDaysOfTheMonth(startOfMonth, weeks, maxDate);
    fillInLastWeek(weeks, maxDate);
    return weeks;
}

export function validateDate(inputValue) {
    const numberDashSyntax = moment(inputValue, 'MM-DD-YYYY', true).isValid() ||
                            moment(inputValue, 'MM-D-YYYY', true).isValid() ||
                            moment(inputValue, 'M-DD-YYYY', true).isValid() ||
                            moment(inputValue, 'M-D-YYYY', true).isValid();
    const numberSlashSyntax = moment(inputValue, 'MM/DD/YYYY', true).isValid() ||
                            moment(inputValue, 'MM/D/YYYY', true).isValid() ||
                            moment(inputValue, 'M/DD/YYYY', true).isValid() ||
                            moment(inputValue, 'M/D/YYYY', true).isValid();
    const stringCommaSyntax = moment(inputValue, 'MMMM DD, YYYY', true).isValid() ||
                            moment(inputValue, 'MMMM D, YYYY', true).isValid() ||
                            moment(inputValue, 'MMM DD, YYYY', true).isValid() ||
                            moment(inputValue, 'MMM D, YYYY', true).isValid();
    const stringSpaceSyntax = moment(inputValue, 'MMMM DD YYYY', true).isValid() ||
                            moment(inputValue, 'MMMM D YYYY', true).isValid() ||
                            moment(inputValue, 'MMM DD YYYY', true).isValid() ||
                            moment(inputValue, 'MMM D YYYY', true).isValid();
    const validDate = {
        format: '',
        valid: false,
    };
    if (numberDashSyntax) {
        validDate.valid = true;
        validDate.format = 'MM-DD-YYYY';
    } else if (numberSlashSyntax) {
        validDate.valid = true;
        validDate.format = 'MM/DD/YYYY';
    } else if (stringCommaSyntax) {
        validDate.valid = true;
        validDate.format = 'MMMM DD, YYYY';
    } else if (stringSpaceSyntax) {
        validDate.valid = true;
        validDate.format = 'MMMM DD YYYY';
    }
    const momentDay = moment(inputValue, validDate.format);
    const maxDate = moment().subtract(1, 'days').clone();
    if (momentDay.isAfter(maxDate)) {
        validDate.valid = false;
    }
    return validDate;
}

export function getCurrentMonth(currentDate) {
    return currentDate.format('MMMM YYYY');
}

export function getPreviousMonth(currentDate) {
    const previousMonth = currentDate.clone().subtract(1, 'months').format('MMMM');
    return previousMonth.substring(0, 3);
}

export function getNextMonth(currentDate) {
    const nextMonth = currentDate.clone().add(1, 'months').format('MMMM');
    return nextMonth.substring(0, 3);
}

export function getCalendarHeight(showCalendar, numberOfWeeks) {
    let heightClass = '';
    if (showCalendar) {
        heightClass = numberOfWeeks === 6 ? 'calendar-six-weeks' : 'calendar-five-weeks';
    }
    return heightClass;
}

export function createSelectedDateClass(day, selectedDate, showCalendar,
    startDate, endDate) {
    let selectedDateClassName = 'hide';
    let isSelectedDate = false;
    // If there is a start date, then this is the DateRangePicker
    if (startDate) {
        if (startDate.isSame(day, 'day') || endDate.isSame(day, 'day')) {
            isSelectedDate = true;
        // If the day is between the startDate and endDate and the day is Sunday
        }
    } else {
    // If there is a selected date, then this is DatePickerOneDate
        isSelectedDate = selectedDate.isSame(day, 'day');
    }
    if (isSelectedDate) {
        selectedDateClassName = 'selected-date-circle';
        if (showCalendar) {
            selectedDateClassName += ' expand-circle';
        }
    }
    return selectedDateClassName;
}

export function createInDateRangeClass(day, selectedDate, showCalendar,
    startDate, endDate) {
    let selectedDateClassName = 'hide';
    let isSelectedDate = false;
    // If there is a start date, then this is the DateRangePicker
    if (startDate) {
        if (startDate.isSame(day, 'day')) {
            isSelectedDate = true;
        // If the day is between the startDate and endDate and the day is Sunday
        } else if (day.isBetween(startDate, endDate) && day.day() === 0) {
            isSelectedDate = true;
        }
    }
    if (isSelectedDate) {
        selectedDateClassName = 'selected-date-circle-date-range';
    }
    return selectedDateClassName;
}

export function extendWidth(day, startDate, endDate) {
    let style = {};
    // Returns a number between 0 and 6 where 0 is Sunday
    const dayOfWeek = day.day();
    const Saturday = 6;
    const Sunday = 0;
    let numberOfDaysBetween = null;
    if (startDate) {
        if (day.isSame(startDate) && !day.isSame(endDate)) {
            numberOfDaysBetween = (Saturday - dayOfWeek);
            let endOfCurrentWeek = day.clone().add(numberOfDaysBetween, 'day');
            while (endOfCurrentWeek.isAfter(endDate)) {
                numberOfDaysBetween = numberOfDaysBetween - 1;
                endOfCurrentWeek = day.clone().add(numberOfDaysBetween, 'day');
            }
        } else if (day.isBetween(startDate, endDate) && dayOfWeek === Sunday) {
            const endOfCurrentWeek = day.clone().add(6, 'day');
            while (endOfCurrentWeek.isAfter(endDate)) {
                endOfCurrentWeek.subtract(1, 'day');
            }
            numberOfDaysBetween = (endOfCurrentWeek.day() - dayOfWeek);
        }
    }
    if (numberOfDaysBetween) {
        style = {
            width: (numberOfDaysBetween) * 34 + 30,
        };
    }
    return style;
}

export function createDayClassName(day, selectedDate, startDate, endDate) {
    let className = 'datepicker-day pointer day';
    if (day.type === 'not-valid') {
        className = 'datepicker-day-not-valid pointer day';
    } else if (day.type === 'over-max-date') {
        className = 'datepicker-day-over-max-date day';
    }
    let isSelectedDate = false;
    if (startDate) {
        isSelectedDate = startDate.isSame(day, 'day') || endDate.isSame(day, 'day');
    } else {
        isSelectedDate = selectedDate.isSame(day, 'day');
    }
    if (isSelectedDate) {
        className += ' selected-date';
    }
    return className;
}

