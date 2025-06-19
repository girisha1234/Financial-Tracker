import React from 'react'
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";

const Transactions = ({
  transactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
}) => {
  return (
    <div>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
    </div>
  );
};

export default Transactions;