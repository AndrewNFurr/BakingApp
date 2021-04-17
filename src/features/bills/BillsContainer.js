import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    loadBills,
    selectBills
} from './billsSlice';

const Bill = () => {
    const dispatch = useDispatch();
    const bills = useSelector(selectBills);

    useEffect(() => {
        const dis = dispatch(loadBills());

    }, [dis, bills]);

    if (!bills) {
        return null;
    }

    return <div>
        Bills
    </div>
};

export default Bill;