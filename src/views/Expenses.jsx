import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const categories = ['Food', 'Transportation', 'Gas', 'Shopping'];

function Expenses() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState('');
  const [expense, setExpense] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData')) || { balance: 0, expenses: [] };
    setBalance(storedData.balance);
    setExpenses(storedData.expenses);
  }, []);

  const saveToLocalStorage = (updatedBalance, updatedExpenses) => {
    localStorage.setItem('userData', JSON.stringify({
      balance: updatedBalance,
      expenses: updatedExpenses,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { subject, description, category, date, expense: parseFloat(expense) };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveToLocalStorage(balance, updatedExpenses);

    setSubject('');
    setDescription('');
    setCategory(categories[0]);
    setDate('');
    setExpense('');
  };

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    saveToLocalStorage(balance, updatedExpenses);
  };

  const handleBalanceUpdate = (amount) => {
    const updatedBalance = balance + amount;
    setBalance(updatedBalance);
    saveToLocalStorage(updatedBalance, expenses);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.expense, 0);
  const remainingBalance = balance - totalExpenses;

  const exportToCSV = (data, filename) => {
    const csvContent = [
      ['Subject', 'Description', 'Category', 'Date', 'Expense'],
      ...data.map(exp => [exp.subject, exp.description, exp.category, exp.date, exp.expense]),
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    exportToCSV(expenses, 'expenses.csv');
  };

  const handleExportAndReset = () => {
    exportToCSV(expenses, 'expenses.csv');
    setBalance(0);
    setExpenses([]);
    saveToLocalStorage(0, []);
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 relative">
        {/* Export Buttons */}
        <div className="absolute top-4 right-4 space-x-2">
          <button
            onClick={handleExport}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-yellow-600"
          >
            Export
          </button>
          <button
            onClick={handleExportAndReset}
            className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600"
          >
            Export and Reset
          </button>
        </div>

        {/* Display Remaining Balance */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold">Remaining balance this month:</h2>
          <p className="text-2xl font-bold">${remainingBalance.toFixed(2)} / ${balance.toFixed(2)}</p>
        </div>

        {/* Balance Update */}
        <div className="mb-8 space-y-4">
          <h3 className="text-lg font-semibold">Update Balance</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => handleBalanceUpdate(100)}
              className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm"
            >
              Add $100
            </button>
            <button
              onClick={() => handleBalanceUpdate(-100)}
              className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm"
            >
              Remove $100
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-8">Expenses</h1>

        {/* Expense Form */}
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Expense</label>
              <input
                type="number"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mb-8">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
              >
                Add Expense
              </button>
            </div>
          </form>
        </div>

        {/* Expenses List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Expense List</h2>
          <ul className="space-y-4">
            {expenses.map((exp, index) => (
              <li key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
                <div>
                  <h3 className="text-lg font-semibold">{exp.subject}</h3>
                  <p>{exp.description}</p>
                  <p>Category: {exp.category}</p>
                  <p>Date: {exp.date}</p>
                  <p>Expense: ${exp.expense.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
