"use client";
import React, { useState } from "react";
import Transaction from "@/app/types/transaction";
import AddTransaction from "@/app/home/add-transaction";
import TransactionHistory from "@/app/home/history";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const calculateBalance = () => {
    return transactions
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
  };

  const calculateIncome = () => {
    return transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
  };

  const calculateExpense = () => {
    return transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  return (
    <div>
      <header className="flex items-center justify-between mx-12 py-2 m-4 dark:text-white">
        <h1 className="font-bold text-xl">Expense Tracker</h1>
      </header>
      <main className="flex flex-col mx-10 bg-gray-50 dark:bg-neutral-700 p-4 shadow-xl rounded-lg mb-6 border border-gray-300 dark:border-transparent">
        <div className="grid md:grid-cols-2 gap-4 w-full">
          <div>
            <div className="flex justify-center flex-wrap">
              <section className="mb-6 w-full md:w-auto mr-2 dark:text-white">
                <div className="font-bold p-6 text-center bg-white dark:bg-neutral-800 shadow-md rounded-md">
                  <h3>Your Balance</h3>{" "}
                  <h1 className="text-3xl">${calculateBalance()}</h1>
                </div>
              </section>

              <section className="flex justify-around md:w-auto w-full bg-white dark:bg-neutral-800 shadow-md mb-6 rounded-md">
                <div className="p-6 text-center">
                  <h3>Income</h3>
                  <p className="text-green-500 font-bold">
                    ${calculateIncome()}
                  </p>
                </div>
                <div className="border-l-2 border-gray-300 my-2"></div>
                <div className="p-6 text-center">
                  <h3>Expense</h3>
                  <p className="text-red-700 font-bold">
                    ${Math.abs(calculateExpense()).toFixed(2)}
                  </p>
                </div>
              </section>
            </div>

            <section className="w-full mb-6 md:hidden block">
              <TransactionHistory transactions={transactions} />
            </section>

            <section className="w-full">
              <AddTransaction
                calculateBalance={calculateBalance}
                setTransactions={setTransactions}
                transactions={transactions}
              />
            </section>
          </div>
          <div className="hidden md:block mx-4">
            <TransactionHistory
              transactions={transactions}
              setTransactions={setTransactions}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
