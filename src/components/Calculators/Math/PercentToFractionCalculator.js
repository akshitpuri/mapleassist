import React, { useState } from 'react';


import CalculatorLayout from '../CalculatorLayout';


import BackButton from '../../BackButton';


import { Helmet } from 'react-helmet';




function gcd(a, b) {


return b === 0 ? a : gcd(b, a % b);


}




export default function PercentToFractionCalculator() {


const [percent, setPercent] = useState('');


const [result, setResult] = useState(null);




const convertToFraction = () => {


const p = parseFloat(percent);


if (isNaN(p)) {


setResult('Please enter a valid percentage.');


return;


}




const decimal = p / 100;


const decimalPlaces = (decimal.toString().split('.')[1] || '').length;


const denominator = Math.pow(10, decimalPlaces);


const numerator = Math.round(decimal * denominator);


const divisor = gcd(numerator, denominator);




const simplifiedNum = numerator / divisor;


const simplifiedDen = denominator / divisor;




const mixed =


simplifiedNum > simplifiedDen


? `${Math.floor(simplifiedNum / simplifiedDen)} ${simplifiedNum % simplifiedDen}/${simplifiedDen}`


: null;




setResult({


percent: p,


fraction: `${simplifiedNum}/${simplifiedDen}`,


mixed


});


};




return (


<CalculatorLayout title="🔢 Percent to Fraction Calculator">


<Helmet>


<title>Percent to Fraction Calculator – MapleAssist</title>


<meta name="description" content="Convert any percentage into a simplified fraction. Supports mixed numbers and clean formatting." />


<meta name="keywords" content="percent to fraction calculator, convert percent, simplified fraction, mapleassist math tool" />


</Helmet>




<BackButton />




<p style={{


fontSize: '1rem',


lineHeight: '1.6',


marginBottom: '24px',


color: '#444'


}}>


Enter a percentage to convert it into a <strong>simplified fraction</strong>. This tool uses:


<br />


<code>x% = x / 100</code> and reduces the result using the greatest common divisor.


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


placeholder="Enter percent (e.g. 75, 125.5)"


value={percent}


onChange={(e) => setPercent(e.target.value)}


/>


<button


onClick={convertToFraction}


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


Convert to Fraction


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


<p><strong>Input Percent:</strong> {result.percent}%</p>


<p><strong>Fraction:</strong> {result.fraction}</p>


{result.mixed && <p><strong>Mixed Number:</strong> {result.mixed}</p>}


</div>


)}


</CalculatorLayout>


);


}
