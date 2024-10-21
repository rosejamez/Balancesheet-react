// src/components/BalanceSheet.tsx
import React, { useState } from 'react';

interface Transaction {
    type: 'credit' | 'debit';
    amount: number;
    purpose: string;
    timestamp: string;
}

const BalanceSheet: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [credit, setCredit] = useState(0);
    const [debit, setDebit] = useState(0);
    const [amount, setAmount] = useState<string>('');
    const [purpose, setPurpose] = useState<string>('');
    const [type, setType] = useState<'credit' | 'debit'>('credit');

    const handleAddTransaction = () => {
        const value = parseFloat(amount);
        if (isNaN(value) || value <= 0 || purpose.trim() === '') return;

        const newTransaction: Transaction = {
            type,
            amount: value,
            purpose,
            timestamp: new Date().toLocaleString(),
        };

        setTransactions([...transactions, newTransaction]);

        if (type === 'credit') {
            setCredit(credit + value);
        } else {
            setDebit(debit + value);
        }

        // Reset input fields
        setAmount('');
        setPurpose('');
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPurpose(e.target.value);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as 'credit' | 'debit');
    };

    const balance = credit - debit;

    return (
        <div>
            <h1>Balance Sheet</h1>
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Amount"
                />
                <input
                    type="text"
                    value={purpose}
                    onChange={handlePurposeChange}
                    placeholder="Purpose"
                />
                <select value={type} onChange={handleTypeChange}>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
                <button onClick={handleAddTransaction}>Add Transaction</button>
            </div>
            <h2>Transactions</h2>
            <ul>
                {transactions.map((trans, index) => (
                    <li key={index}>
                        {trans.type.charAt(0).toUpperCase() + trans.type.slice(1)}: ${trans.amount.toFixed(2)} 
                        | Purpose: {trans.purpose} 
                        | Date: {trans.timestamp}
                    </li>
                ))}
            </ul>
            <h2>Credits: ${credit.toFixed(2)}</h2>
            <h2>Debits: ${debit.toFixed(2)}</h2>
            <h2>Balance: ${balance.toFixed(2)}</h2>
        </div>
    );
};

export default BalanceSheet;

