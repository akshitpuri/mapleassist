import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function SubnetCalculator() {
  const [ip, setIp] = useState('');
  const [cidr, setCidr] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const ipParts = ip.split('.').map(Number);
    const prefix = parseInt(cidr);

    if (
      ipParts.length !== 4 ||
      ipParts.some(part => part < 0 || part > 255 || isNaN(part)) ||
      isNaN(prefix) || prefix < 1 || prefix > 32
    ) {
      setResult('Please enter a valid IPv4 address and CIDR range (e.g. 192.168.1.0/24)');
      return;
    }

    const ipNum = ipParts.reduce((acc, part) => (acc << 8) + part, 0);
    const mask = ~(2 ** (32 - prefix) - 1) >>> 0;
    const network = ipNum & mask;
    const broadcast = network | ~mask >>> 0;
    const firstHost = network + 1;
    const lastHost = broadcast - 1;
    const hostCount = Math.max(0, lastHost - firstHost + 1);

    const toIP = (num) =>
      [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');

    setResult({
      subnetMask: toIP(mask),
      networkAddress: toIP(network),
      broadcastAddress: toIP(broadcast),
      firstHost: hostCount > 0 ? toIP(firstHost) : 'N/A',
      lastHost: hostCount > 0 ? toIP(lastHost) : 'N/A',
      hostCount
    });
  };

  return (
    <CalculatorLayout title="🌐 Subnet Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Calculate subnet details for an IPv4 address using CIDR notation. Find the network range, usable hosts, subnet mask, and broadcast address. Example: <code>192.168.1.0/24</code>
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="Enter IP address (e.g. 192.168.1.0)"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          min="1"
          max="32"
          placeholder="Enter CIDR (e.g. 24)"
          value={cidr}
          onChange={(e) => setCidr(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
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
          Calculate Subnet
        </button>
      </div>

      {/* 📊 Results */}
      {result && (
        typeof result === 'string' ? (
          <div style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#e53935',
            marginTop: '20px'
          }}>
            <strong>{result}</strong>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            maxWidth: '500px',
            margin: '0 auto',
            fontSize: '1.05rem',
            color: '#333',
            textAlign: 'center'
          }}>
            <p><strong>Subnet Mask:</strong> {result.subnetMask}</p>
            <p><strong>Network Address:</strong> {result.networkAddress}</p>
            <p><strong>Broadcast Address:</strong> {result.broadcastAddress}</p>
            <p><strong>Usable Host Range:</strong> {result.firstHost} – {result.lastHost}</p>
            <p><strong>Total Hosts:</strong> {result.hostCount}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}