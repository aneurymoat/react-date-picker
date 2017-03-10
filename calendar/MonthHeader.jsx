import React from 'react';

const MonthHeader = () => (
    <div className="month-headers">
        {
            ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                .map((headerString, index) => (
                    <div
                      className={
                            `month-header ${(
                                index === 0 ? 'first-month-header' : 'rest-of-week-header'
                            )}`
                        }
                      key={`month-header-${index}`}
                    >
                        {headerString}
                    </div>
                ))
        }
    </div>
);

export default MonthHeader;
