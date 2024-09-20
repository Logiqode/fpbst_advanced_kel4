import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Navbar from '../components/Navbar'; 

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [data, setData] = useState({ balance: 0, expenses: [] });

  useEffect(() => {
    // Initialize data from localStorage
    const storedData = JSON.parse(localStorage.getItem('userData')) || { balance: 0, expenses: [] };
    setData(storedData);
  }, []);

  // Process data for the pie chart
  const categories = data.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.expense;
    return acc;
  }, {});

  const totalExpenses = Object.values(categories).reduce((sum, value) => sum + value, 0);

  const chartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 flex space-x-6">
        <div className="w-3/4 space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold mb-4">Latest Transactions</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 text-left">Date</th>
                  <th className="py-2 text-left">Category</th>
                  <th className="py-2 text-left">Expense</th>
                </tr>
              </thead>
              <tbody>
                {data.expenses.slice(0, 5).map((expense, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2">{expense.date}</td>
                    <td className="py-2">{expense.category}</td>
                    <td className="py-2">${expense.expense.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-1/4 space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold mb-4">Remaining balance this month:</h3>
            <p className="text-2xl font-bold">
              ${data.balance - totalExpenses} / ${data.balance}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300 h-64">
            <h3 className="text-lg font-semibold mb-4">Expenditures:</h3>
            <div className="w-fit h-fit">
              <Pie data={chartData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
