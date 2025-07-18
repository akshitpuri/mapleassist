import React, { useState } from 'react';


import CalculatorLayout from '../CalculatorLayout';


import BackButton from '../../BackButton';


import { Helmet } from 'react-helmet';




export default function KineticEnergyCalculator() {


const [mode, setMode] = useState('ke'); // 'ke', 'mass', 'velocity'


const [mass, setMass] = useState('');


const [velocity, setVelocity] = useState('');


const [ke, setKE] = useState('');


const [result, setResult] = useState(null);




const calculate = () => {


const m = parseFloat(mass);


const v = parseFloat(velocity);


const k = parseFloat(ke);




switch (mode) {


case 'ke':


if (isNaN(m) || isNaN(v)) {


setResult('Please enter valid mass and velocity.');


return;


}


setResult({


type: 'Kinetic Energy',


value: (0.5 * m * v ** 2).toFixed(4),


units: 'Joules'


});


break;


case 'mass':


if (isNaN(k) || isNaN(v) || v === 0) {


setResult('Please enter valid kinetic energy and velocity.');


return;


}


setResult({


type: 'Mass',


value: (2 * k / v ** 2).toFixed(4),


units: 'kg'


});


break;


case 'velocity':


if (isNaN(k) || isNaN(m) || m === 0) {


setResult('Please enter valid kinetic energy and mass.');


return;


}


setResult({


type: 'Velocity',


value: Math.sqrt(2 * k / m).toFixed(4),


units: 'm/s'


});


break;


default:


setResult('Invalid calculation mode.');


}


};




return (


<CalculatorLayout title="🧪 Kinetic Energy Calculator">


<Helmet>


<title>Kinetic Energy Calculator – MapleAssist</title>


<meta name="description" content="Calculate kinetic energy, mass, or velocity using the formula KE = ½mv². Supports physics and motion analysis." />


<meta name="keywords" content="kinetic energy calculator, physics tool, motion energy, mapleassist science calculator" />


</Helmet>




<BackButton />




<p style={{


fontSize: '1rem',


lineHeight: '1.6',


marginBottom: '24px',


color: '#444'


}}>


Select what you want to calculate — <strong>kinetic energy</strong>, <strong>mass</strong>, or <strong>velocity</strong> — and enter the other two values. This tool uses:


<br />


<code>KE = ½ × mass × velocity²</code>


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


<option value="ke">Calculate Kinetic Energy</option>


<option value="mass">Calculate Mass</option>


<option value="velocity">Calculate Velocity</option>


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


{(mode === 'ke' || mode === 'velocity') && (


<input


type="number"


placeholder="Mass (kg)"


value={mass}


onChange={(e) => setMass(e.target.value)}


/>


)}


{(mode === 'ke' || mode === 'mass') && (


<input


type="number"


placeholder="Velocity (m/s)"


value={velocity}


onChange={(e) => setVelocity(e.target.value)}


/>


)}


{(mode === 'mass' || mode === 'velocity') && (


<input


type="number"


placeholder="Kinetic Energy (J)"


value={ke}


onChange={(e) => setKE(e.target.value)}


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
