import React from 'react';
import { SingleBill } from './index';

const Bills = ({
    bills
}) => {
    return <div>
        {
            bills.map((bill) => {
                return <SingleBill bill={bill} />
            })
        }
    </div>
}

module

export default Bills;