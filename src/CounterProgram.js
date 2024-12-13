import react,{useState} from 'react';

function CounterProgram(){
    const [num, setNum] = useState(0);

    const IncNum = () => {
        setNum(num+1);
    }
    const DecNum = () => {
        setNum(num-1);
    }
    const ResetNum = () => {
        setNum(0);
    }

    const [payment, setPayment] = useState('');

    function handlePaymentChange(e){
        setPayment(e.target.value);
    }

    const [name, setName] = useState('Guest');


    const [delivery, setDelivery] = useState('');


    function handleDelivery(e) {
        setDelivery(e.target.value);

    }


    function handleChange(e){
        setName(e.target.value);
    }
return(
    <>

<div>{num}</div>
    <button onClick={IncNum}>Increase</button>
    <button onClick={DecNum}>Decrease</button>
    <button onClick={ResetNum}>Reset</button>

    <div>Name:{name}</div>

<input value={name} onChange={handleChange} />


<div>Payment Method: {payment}</div>

<select value={payment} onChange={handlePaymentChange}>
    <option>Debit Card</option>
    <option>Credit Card</option>
    <option>Cash</option>
    <option>Esewa</option>
</select>

<div> Delivery: {delivery}</div>

<input type="radio" value='Cash on Delivery'
checked={delivery==='Cash on Delivery'}
onChange={handleDelivery} />Cash
<input type="radio" value='HalfPayment'
checked={delivery==='HalfPayment'}
onChange={handleDelivery} />HalfPayment
    </>
);


};

export  default CounterProgram;