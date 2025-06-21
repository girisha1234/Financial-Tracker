import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

function App() {
  // Safe initialization from localStorage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing transactions from localStorage", error);
      return [];
    }
  });

  // Update localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    console.log("Updated transactions:", transactions); // Optional debug
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...updatedTransaction, id } : t
      )
    );
  };

  return (
    <Router>
      <Navbar />
      <h1 className="main-heading">Personal Finance Tracker</h1>
      <Routes>
        <Route 
        path="/"
        element={<Home transactions={transactions} />}
        />

        <Route
          path="/transactions"
          element={
            <Transactions
              transactions={transactions} 
              addTransaction={addTransaction}
              deleteTransaction={deleteTransaction}
              editTransaction={editTransaction}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard transactions={transactions} />}  // optional fix
        />
      </Routes>
    </Router>
  );
}

export default App;