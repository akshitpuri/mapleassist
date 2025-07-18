import React, { useState } from 'react';


import CalculatorLayout from '../CalculatorLayout';


import BackButton from '../../BackButton';


import { Helmet } from 'react-helmet';




export default function ForceCalculator() {


const [mode, setMode] = useState('force'); // 'force', 'mass', 'acceleration'


const [mass, setMass] = useState('');


const [acceleration, setAcceleration] = useState('');


const [force, setForce] = useState('');


const [result, setResult] = useState(null);




const calculate = () => {


const m = parseFloat(mass);


const a = parseFloat(acceleration);


const f = parseFloat(force);




switch (mode) {


case 'force':


if (isNaN(m) || isNaN(a)) {


setResult('Please enter valid mass and acceleration.');


return;


}


setResult({


type: 'Force',


value: (m * a).toFixed(4),


units: 'Newtons (N)'


});


break;


case 'mass':


if (isNaN(f) || isNaN(a) || a === 0) {


setResult('Please enter valid force and acceleration.');


return;


}


setResult({


type: 'Mass',


value: (f / a).toFixed(4),


units: 'kg'


});


break;


case 'acceleration':


if (isNaN(f) || isNaN(m) || m === 0) {


setResult('Please enter valid force and mass.');


return;


}


setResult({


type: 'Acceleration',


value: (f / m).toFixed(4),


units: 'm/s²'


});


break;


default:


setResult('Invalid calculation mode.');


}


};




return (


<CalculatorLayout title="🧪 Force Calculator">


<Helmet>


<title>Force Calculator – MapleAssist</title>


<meta name="description" content="Calculate force, mass, or acceleration using Newton's second law. Supports physics and motion analysis." />


<meta name="keywords" content="force calculator, physics tool, Newton's law, mapleassist science calculator" />


</Helmet>




<BackButton />




<p style={{


fontSize: '1rem',


lineHeight: '1.6',


marginBottom: '24px',


color: '#444'


}}>


Select what you want to calculate — <strong>force</strong>, <strong>mass</strong>, or <strong>acceleration</strong> — and enter the other two values. This tool uses:


<br />


<code>F = m × a</code>


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


<option value="force">Calculate Force</option>


<option value="mass">Calculate Mass</option>


<option value="acceleration">Calculate Acceleration</option>


</select>


</div>




{/* 🔢 Inputs */}


<div style={{


display: 'flex',


flexDirection: 'column',


gap: '12px',


maxWidth: '400px',


margin: '0 auto',


marginBottom: '20px'


}}>


{(mode === 'force' || mode === 'acceleration') && (


<input


type="number"


placeholder="Mass (kg)"


value={mass}


onChange={(e) => setMass(e.target.value)}


/>


)}


{(mode === 'force' || mode === 'mass') && (


<input


type="number"


placeholder="Acceleration (m/s²)"


value={acceleration}


onChange={(e) => setAcceleration(e.target.value)}


/>


)}


{(mode === 'mass' || mode === 'acceleration') && (


<input


type="number"


placeholder="Force (N)"


value={force}


onChange={(e) => setForce(e.target.value)}


/>


)}


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


</div>


)}


</CalculatorLayout>


);


}
