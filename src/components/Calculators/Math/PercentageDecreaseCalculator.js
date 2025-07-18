import React, { useState } from 'react';


import CalculatorLayout from '../CalculatorLayout';


import BackButton from '../../BackButton';


import { Helmet } from 'react-helmet';




export default function PercentageDecreaseCalculator() {


const [original, setOriginal] = useState('');


const [newValue, setNewValue] = useState('');


const [result, setResult] = useState(null);




const calculateDecrease = () => {


const orig = parseFloat(original);


const newVal = parseFloat(newValue);




if (isNaN(orig) || isNaN(newVal) || orig === 0) {


setResult('Please enter valid numbers. Original value must not be zero.');


return;


}




const diff = orig - newVal;


const percent = (diff / orig) * 100;




setResult({


original: orig.toFixed(2),


newValue: newVal.toFixed(2),


difference: diff.toFixed(2),


percentage: percent.toFixed(2)


});


};




return (


<CalculatorLayout title="📉 Percentage Decrease Calculator">


<Helmet>


<title>Percentage Decrease Calculator – MapleAssist</title>


<meta name="description" content="Calculate the percentage decrease between two values. Supports clean formatting and step-by-step logic." />


<meta name="keywords" content="percentage decrease calculator, percent drop, value reduction, mapleassist math tool" />


</Helmet>




<BackButton />




<p style={{


fontSize: '1rem',


lineHeight: '1.6',


marginBottom: '24px',


color: '#444'


}}>


Enter the <strong>original value</strong> and the <strong>new value</strong> to calculate the percentage decrease. This tool uses:


<br />


<code>Percentage Decrease = ((Original − New) / Original) × 100</code>


</p>




{/* 🔢 Inputs */}


<div style={{


display: 'grid',


gridTemplateColumns: '1fr 1fr',


gap: '20px',


maxWidth: '500px',


margin: '0 auto',


marginBottom: '20px'


}}>


<input


type="number"


placeholder="Original Value"


value={original}


onChange={(e) => setOriginal(e.target.value)}


/>


<input


type="number"


placeholder="New Value"


value={newValue}


onChange={(e) => setNewValue(e.target.value)}


/>


</div>




<div style={{ textAlign: 'center', marginBottom: '20px' }}>


<button


onClick={calculateDecrease}


style={{


padding: '10px',


backgroundColor: '#3f51b5',


color: '#fff',


border: 'none',


borderRadius: '6px',


fontSize: '1rem',


cursor: 'pointer'


}}


>


Calculate Decrease


</button>


</div>




{/* 📊 Result */}


{typeof result === 'string' ? (


<div style={{


color: '#f44336',


backgroundColor: '#fff6f6',


padding: '12px',


borderRadius: '6px',


maxWidth: '500px',


margin: '0 auto',


textAlign: 'center'


}}>


{result}


</div>


) : result && (


<div style={{


backgroundColor: '#fff',


padding: '20px',


borderRadius: '10px',


boxShadow: '0 1px 6px rgba(0,0,0,0.08)',


maxWidth: '500px',


margin: '0 auto',


fontSize: '1.1rem',


color: '#333',


textAlign: 'center'


}}>


<p><strong>Original Value:</strong> {result.original}</p>


<p><strong>New Value:</strong> {result.newValue}</p>


<p><strong>Difference:</strong> {result.difference}</p>


<p><strong>Percentage Decrease:</strong> {result.percentage}%</p>


</div>


)}


</CalculatorLayout>


);


}
