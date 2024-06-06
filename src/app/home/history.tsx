import React from "react";
import Transaction from "@/app/types/transaction";
import clsx from "clsx";

export default function TransactionHistory({
  transactions,
  setTransactions,
}: {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}) {
  return (
    <>
      <h3 className="font-bold border-b-2 border-gray-300 mb-3 py-2 dark:text-white dark:border-neutral-400">
        History
      </h3>

      <ul>
        {transactions.map((transaction, index) => (
          <li
            className={`flex justify-between bg-white dark:bg-neutral-800 p-2 shadow-md hover:shadow-lg mb-2 border-r-4 rounded-md ${
              transaction.amount < 0 ? "border-red-700" : "border-green-500"
            } relative group`}
            key={transaction.id}
          >
            <h4>{transaction.text}</h4>
            <p
              className={clsx({
                "transition-all duration-300 ease-in-out transform group-hover:-translate-x-8":
                  index === 0,
              })}
            >
              {transaction.amount < 0 ? "-" : "+"}$
              {Math.abs(transaction.amount).toFixed(2)}
            </p>
            <button
              className={clsx(
                index === 0
                  ? "text-white absolute right-2 bg-red-500 rounded-full px-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  : "hidden"
              )}
              onClick={() => {
                setTransactions(
                  transactions.filter((t) => t.id !== transaction.id)
                );
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
