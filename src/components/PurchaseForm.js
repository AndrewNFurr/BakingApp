import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import { createBill } from '../features/bills/billsSlice'
import { selectCurrentUser } from '../features/users/usersSlice';

const PurchaseForm = () => {
    //const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState("");

    const dispatch = useDispatch();
    const { user } = useSelector(selectCurrentUser);
  
    // useEffect(() => {
    //   setTitle(props.title || "") ;
    //   setDescription(props.description || "");
    //   setAmount(props.amount || "");
    //   setType(props.type || "");
    // }, []);

    const handleSubmit = () => {
        const newBill = {
            userId: user.id,
            title,
            description,
            amount,
            type
        };
        const payment = dispatch(createBill(newBill));
        return payment;
    }

    return <div className='bill-form-container'>
            <form 
                id='bill-form'
                onSubmit={(event) => event.preventDefault()}>
            <label for="title">Title of Bill</label><br/>
            <input 
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            /><br/>
            <label for="decription">Description</label><br/>
            <input 
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            /><br/>
            <label for="amount">Amount</label><br/>
            <input 
                type="number"
                name="amount"
                id="amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
            /><br/>
        </form>
        <label for="type">Type of Bill</label>
        <select 
            name="type" 
            id="type" 
            form="bill-form"
            style={{
                display: "block"
            }}
            value={type}
            onChange={(event) => {
              setType(event.target.value);
            }}>
            <option value="" selected disabled hidden>Choose here</option>
            <option value='loan'>Loan</option>
            <option value='credit'>Credit</option>
            <option value='utility'>Utility</option>
            <option value='restaurant'>Restaurant</option>
            <option value='grocery'>Grocery</option>
        </select>
        <Button onClick={handleSubmit}>
            Make Purchase
        </Button>
    </div>
}

export default PurchaseForm