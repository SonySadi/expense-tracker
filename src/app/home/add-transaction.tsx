import React, { useState, useRef } from "react";
import Transaction from "@/app/types/transaction";

export default function AddTransaction({
  transactions,
  setTransactions,
  calculateBalance,
}: {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  calculateBalance: () => string;
}) {
  const [error, setError] = useState<{
    text?: string;
    amount?: string;
    balance?: string;
  }>({ text: "", amount: "", balance: "" });

  const textRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textRef.current || !amountRef.current) return;

    const text = textRef.current.value.trim();
    const amount = parseFloat(amountRef.current.value);

    let hasError = false;
    let errorMessages = { text: "", amount: "", balance: "" };

    if (!text) {
      errorMessages.text = "Text cannot be empty!";
      hasError = true;
    }

    if (isNaN(amount)) {
      errorMessages.amount = "Amount cannot be empty or non-numeric!";
      hasError = true;
    } else if (amount === 0) {
      errorMessages.amount = "Amount cannot be zero!";
      hasError = true;
    }

    if (hasError) {
      setError(errorMessages);
      return;
    }

    const newTransaction = {
      id: transactions.length,
      text,
      amount: parseFloat(String(amount)),
    };

    const newBalance = parseFloat(calculateBalance()) + newTransaction.amount;
    if (newBalance < 0) {
      errorMessages.balance = "Balance cannot be negative!";
      setError(errorMessages);
      return;
    }

    setTransactions([newTransaction, ...transactions]);
    if (textRef.current) textRef.current.value = "";
    if (amountRef.current) amountRef.current.value = "";
    setError({ text: "", amount: "" });
  };

  return (
    <>
      <h3 className="font-bold border-b-2 border-gray-300 mb-3 py-2 dark:border-neutral-400">
        Add new transaction
      </h3>
      <form onSubmit={handleAddTransaction}>
        <div className="mb-3">
          <label className="block py-2">Text</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-neutral-400 bg-white shadow-sm dark:bg-neutral-800 rounded-md"
            placeholder="Enter text..."
            ref={textRef}
          />
          {error.text && <p className="text-red-500 text-sm">{error.text}</p>}
        </div>
        <div className="mb-3">
          <label className="block">Amount</label>
          <p className="text-xs text-gray-500 mb-2 dark:text-gray-300">
            (negative - expense, positive - income)
          </p>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 dark:border-neutral-400 bg-white shadow-sm dark:bg-neutral-800 rounded-md"
            placeholder="Enter amount..."
            ref={amountRef}
          />
          {error.amount && (
            <p className="text-red-500 text-sm">{error.amount}</p>
          )}
        </div>

        {error.balance && (
          <p className="text-red-500 text-sm mb-3">{error.balance}</p>
        )}
        <button className="w-full bg-blue-500 text-white p-2 hover:shadow-lg dark:bg-blue-700 dark:font-bold rounded-md">
          Add transaction
        </button>
      </form>
    </>
  );
}
