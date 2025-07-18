import React, { useState } from 'react';


import CalculatorLayout from '../CalculatorLayout';


import BackButton from '../../BackButton';


import { Helmet } from 'react-helmet';




export default function CubeRootCalculator() {


const [input, setInput] = useState('');


const [result, setResult] = useState(null);




const calculateCubeRoot = () => {


const num = parseFloat(input);


if (isNaN(num)) {


setResult('Please enter a valid number.');


return;


}




const root = Math.cbrt(num);


setResult({


original: num,


cubeRoot: root.toFixed(6),


cube: Math.pow(root, 3).toFixed(6)


});


};




return (


<CalculatorLayout title="🧮 Cube Root Calculator">


<Helmet>


<title>Cube Root Calculator – MapleAssist</title>


<meta name="description" content="Calculate the cube root of any number, including negatives and decimals. Supports clean formatting and verification." />


<meta name="keywords" content="cube root calculator, cube root of negative number, mapleassist math tool" />


</Helmet>




<BackButton />




<p style={{


fontSize: '1rem',


lineHeight: '1.6',


marginBottom: '24px',


color: '#444'


}}>


Enter a number to find its <strong>cube root</strong>. This tool uses:


<br />


<code>∛x = x^(1/3)</code> and supports negative and decimal inputs.


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


placeholder="Enter number (e.g. 64, -27, 10)"


value={input}


onChange={(e) => setInput(e.target.value)}


/>


<button


onClick={calculateCubeRoot}


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


Calculate Cube Root


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


<p><strong>Cube Root:</strong> {result.cubeRoot}</p>


<p><strong>Verification:</strong> {result.cube} = {result.original}</p>


</div>


)}


</CalculatorLayout>


);


}
