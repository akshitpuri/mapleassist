import React, { useState } from 'react';


import CalculatorLayout from '../CalculatorLayout';


import BackButton from '../../BackButton';


import { Helmet } from 'react-helmet';




export default function PythagoreanTheoremCalculator() {


const [mode, setMode] = useState('hypotenuse'); // 'hypotenuse', 'legA', 'legB'


const [a, setA] = useState('');


const [b, setB] = useState('');


const [c, setC] = useState('');


const [result, setResult] = useState(null);




const calculate = () => {


const aNum = parseFloat(a);


const bNum = parseFloat(b);


const cNum = parseFloat(c);




switch (mode) {


case 'hypotenuse':


if (isNaN(aNum) || isNaN(bNum)) {


setResult('Please enter valid values for both legs.');


return;


}


setResult({


type: 'Hypotenuse',


formula: `√(${aNum}² + ${bNum}²)`,


value: Math.sqrt(aNum ** 2 + bNum ** 2).toFixed(6),


units: 'units'


});


break;


case 'legA':


if (isNaN(bNum) || isNaN(cNum) || cNum <= bNum) {


setResult('Please enter valid hypotenuse and leg B.');


return;


}


setResult({


type: 'Leg A',


formula: `√(${cNum}² - ${bNum}²)`,


value: Math.sqrt(cNum ** 2 - bNum ** 2).toFixed(6),


units: 'units'


});


break;


case 'legB':


if (isNaN(aNum) || isNaN(cNum) || cNum <= aNum) {


setResult('Please enter valid hypotenuse and leg A.');


return;


}


setResult({


type: 'Leg B',


formula: `√(${cNum}² - ${aNum}²)`,


value: Math.sqrt(cNum ** 2 - aNum ** 2).toFixed(6),


units: 'units'


});


break;


default:


setResult('Invalid calculation mode.');


}


};




return (


<CalculatorLayout title="📐 Pythagorean Theorem Calculator">


<Helmet>


<title>Pythagorean Theorem Calculator – MapleAssist</title>


<meta name="description" content="Calculate the missing side of a right triangle using the Pythagorean theorem. Supports hypotenuse and leg calculations." />


<meta name="keywords" content="pythagorean theorem calculator, right triangle, hypotenuse, mapleassist math tool" />


</Helmet>




<BackButton />




<p style={{


fontSize: '1rem',


lineHeight: '1.6',


marginBottom: '24px',


color: '#444'


}}>


Select which side to calculate — <strong>hypotenuse</strong>, <strong>leg A</strong>, or <strong>leg B</strong> — and enter the other two values. This tool uses:


<br />


<code>a² + b² = c²</code>


</p>




{/* 🔘 Mode Selector */}


<div style={{ textAlign: 'center', marginBottom: '16px' }}>


<select


value={mode}


onChange={(e) => {


setMode(e.target.value);


setResult(null);


}}


style={{


padding: '10px',


fontSize: '1rem',


borderRadius: '8px',


border: '1px solid #ccc'


}}


>


<option value="hypotenuse">Calculate Hypotenuse</option>


<option value="legA">Calculate Leg A</option>


<option value="legB">Calculate Leg B</option>


</select>


</div>




{/* 🔢 Inputs */}


<div style={{


display: 'grid',


gridTemplateColumns: '1fr 1fr',


gap: '20px',


maxWidth: '500px',


margin: '0 auto',


marginBottom: '20px'


}}>


{(mode !== 'legA') && (


<input type="number" placeholder="Leg A (a)" value={a} onChange={(e) => setA(e.target.value)} />


)}


{(mode !== 'legB') && (


<input type="number" placeholder="Leg B (b)" value={b} onChange={(e) => setB(e.target.value)} />


)}


{(mode !== 'hypotenuse') && (


<input type="number" placeholder="Hypotenuse (c)" value={c} onChange={(e) => setC(e.target.value)} />


)}


</div>




<div style={{ textAlign: 'center', marginBottom: '20px' }}>


<button


onClick={calculate}


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


Calculate


</button>


</div>




{/* 📊 Output */}


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


<p><strong>{result.type}:</strong> {result.value} {result.units}</p>


<p><strong>Formula Used:</strong> {result.formula}</p>


</div>


)}


</CalculatorLayout>


);


}
