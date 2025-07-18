import React, { useState } from 'react';


import CalculatorLayout from '../CalculatorLayout';


import BackButton from '../../BackButton';


import { Helmet } from 'react-helmet';




export default function QuadraticEquationCalculator() {


const [a, setA] = useState('');


const [b, setB] = useState('');


const [c, setC] = useState('');


const [result, setResult] = useState(null);




const calculateRoots = () => {


const aNum = parseFloat(a);


const bNum = parseFloat(b);


const cNum = parseFloat(c);




if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum) || aNum === 0) {


setResult('Please enter valid coefficients. "a" must not be zero.');


return;


}




const discriminant = bNum ** 2 - 4 * aNum * cNum;


let root1, root2;




if (discriminant > 0) {


const sqrtD = Math.sqrt(discriminant);


root1 = ((-bNum + sqrtD) / (2 * aNum)).toFixed(6);


root2 = ((-bNum - sqrtD) / (2 * aNum)).toFixed(6);


setResult({


type: 'Two Real Roots',


discriminant: discriminant.toFixed(6),


roots: [root1, root2]


});


} else if (discriminant === 0) {


root1 = (-bNum / (2 * aNum)).toFixed(6);


setResult({


type: 'One Real Root',


discriminant: discriminant.toFixed(6),


roots: [root1]


});


} else {


const realPart = (-bNum / (2 * aNum)).toFixed(6);


const imagPart = (Math.sqrt(-discriminant) / (2 * aNum)).toFixed(6);


setResult({


type: 'Two Complex Roots',


discriminant: discriminant.toFixed(6),


roots: [`${realPart} + ${imagPart}i`, `${realPart} - ${imagPart}i`]


});


}


};




return (


<CalculatorLayout title="📐 Quadratic Equation Calculator">


<Helmet>


<title>Quadratic Equation Calculator – MapleAssist</title>


<meta name="description" content="Solve quadratic equations using the quadratic formula. Supports real and complex roots with step-by-step logic." />


<meta name="keywords" content="quadratic equation calculator, quadratic formula, discriminant, mapleassist math tool" />


</Helmet>




<BackButton />




<p style={{


fontSize: '1rem',


lineHeight: '1.6',


marginBottom: '24px',


color: '#444'


}}>


Enter coefficients <strong>a</strong>, <strong>b</strong>, and <strong>c</strong> to solve the equation <code>ax² + bx + c = 0</code> using the quadratic formula:


<br />


<code>x = (-b ± √(b² - 4ac)) / 2a</code>


</p>




{/* 🔢 Inputs */}


<div style={{


display: 'grid',


gridTemplateColumns: '1fr 1fr 1fr',


gap: '20px',


maxWidth: '600px',


margin: '0 auto',


marginBottom: '20px'


}}>


<input type="number" placeholder="a" value={a} onChange={(e) => setA(e.target.value)} />


<input type="number" placeholder="b" value={b} onChange={(e) => setB(e.target.value)} />


<input type="number" placeholder="c" value={c} onChange={(e) => setC(e.target.value)} />


</div>




<div style={{ textAlign: 'center', marginBottom: '20px' }}>


<button


onClick={calculateRoots}


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


Solve Equation


</button>


</div>




{/* 📊 Result */}


{typeof result === 'string' ? (


<div style={{


color: '#f44336',


backgroundColor: '#fff6f6',


padding: '12px',


borderRadius: '6px',


maxWidth: '600px',


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


maxWidth: '600px',


margin: '0 auto',


fontSize: '1.1rem',


color: '#333'


}}>


<p><strong>Type:</strong> {result.type}</p>


<p><strong>Discriminant:</strong> {result.discriminant}</p>


<p><strong>Roots:</strong> {result.roots.join(', ')}</p>


</div>


)}


</CalculatorLayout>


);


}
