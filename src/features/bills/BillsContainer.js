import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    loadBills,
    selectBills
} from './billsSlice';
import { Bills } from '../../components'

const Bill = () => {
    const dispatch = useDispatch();
    const bills = useSelector(selectBills);
    
    useEffect(() => {
        const dis = dispatch(loadBills());
    }, []);

    if (!bills) {
        return null;
    }

    return <div>
        <Bills  
            bills={bills}
        />
    </div>
};

export default Bill;