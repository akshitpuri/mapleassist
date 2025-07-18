import React, { useState } from 'react';


import CalculatorLayout from '../CalculatorLayout';


import BackButton from '../../BackButton';


import { Helmet } from 'react-helmet';




export default function SquareRootCalculator() {


const [input, setInput] = useState('');


const [result, setResult] = useState(null);




const calculateSquareRoot = () => {


const num = parseFloat(input);


if (isNaN(num)) {


setResult('Please enter a valid number.');


return;


}




const root = Math.sqrt(num);


setResult({


original: num,


squareRoot: isNaN(root) ? 'NaN' : root.toFixed(6),


square: isNaN(root) ? 'NaN' : Math.pow(root, 2).toFixed(6)


});


};




return (


<CalculatorLayout title="🧮 Square Root Calculator">


<Helmet>


<title>Square Root Calculator – MapleAssist</title>


<meta name="description" content="Calculate the square root of any number using Math.sqrt. Supports decimals, negatives, and clean formatting." />


<meta name="keywords" content="square root calculator, sqrt, math tool, mapleassist" />


</Helmet>




<BackButton />




<p style={{


fontSize: '1rem',


lineHeight: '1.6',


marginBottom: '24px',


color: '#444'


}}>


Enter a number to find its <strong>square root</strong>. This tool uses:


<br />


<code>√x = x^(1/2)</code> and supports decimal inputs. Negative numbers return <code>NaN</code>.


</p>




{/* 🔢 Input */}


<div style={{


display: 'flex',


flexDirection: 'column',


gap: '12px',


maxWidth: '400px',


margin: '0 auto',


marginBottom: '20px'


}}>


<input


type="number"


placeholder="Enter number (e.g. 49, 0.25, -9)"


value={input}


onChange={(e) => setInput(e.target.value)}


/>


<button


onClick={calculateSquareRoot}


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


Calculate Square Root


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


<p><strong>Input:</strong> {result.original}</p>


<p><strong>Square Root:</strong> {result.squareRoot}</p>


<p><strong>Verification:</strong> {result.square} = {result.original}</p>


</div>


)}


</CalculatorLayout>


);


}
