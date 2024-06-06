import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between mx-10 py-2 mb-6">
        <h1 className="font-bold text-xl">Expense Tracker</h1>
      </header>
      <main className="flex min-h-screen flex-col mx-10">
        <section className="mb-6">
          <div className="font-bold">
            <h3>Your Balance</h3>
            <h1 className="text-3xl">$0.00</h1>
          </div>
        </section>

        <section className="flex justify-around w-full bg-white shadow-md mb-6">
          <div className="p-6 text-center">
            <h3>Income</h3>
            <p className="text-green-500 font-bold">$0.00</p>
          </div>
          <div className="border-l-2 border-gray-300 my-2"></div>
          <div className="p-6 text-center">
            <h3>Expense</h3>
            <p className="text-red-700 font-bold">$0.00</p>
          </div>
        </section>

        <section className="w-full mb-6">
          <h3 className="font-bold border-b-2 border-gray-300 mb-3 py-2">
            History
          </h3>

          <ul>
            {Array.from({ length: 3 }).map((_, index) => (
              <li
                className="flex justify-between bg-white p-2 shadow-md mb-2 border-r-4 border-red-700"
                key={index}
              >
                <h4>Income</h4>
                <p>+$0.00</p>
              </li>
            ))}
            <li className="flex justify-between bg-white p-2 shadow-md mb-2 border-r-4 border-green-500">
              <h4>Income</h4>
              <p>+$0.00</p>
            </li>
          </ul>
        </section>

        <section className="w-full mb-6">
          <h3 className="font-bold border-b-2 border-gray-300 mb-3 py-2">
            Add new transaction
          </h3>
          <form>
            <div className="mb-3">
              <label className="block py-2">Text</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 bg-white  shadow-sm"
                placeholder="Enter text..."
              />
            </div>
            <div className="mb-3">
              <label className="block">Amount</label>
              <p className="text-xs text-gray-500 mb-2">
                (negative - expense, positive - income)
              </p>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 bg-white shadow-sm"
                placeholder="Enter amount..."
              />
            </div>
            <button className="w-full bg-blue-500 text-white p-2">
              Add transaction
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
