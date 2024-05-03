import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import './index.css'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updataTransactionList = transactionList.filter(
      eachtransaction => id !== eachtransaction.id,
    )
    this.setState({
      transactionList: updataTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachtransaction => eachtransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  OnChangeoptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getExpense = () => {
    const {transactionList} = this.state
    let expensesAmount = 0

    transactionList.forEach(eachtransaction => {
      if (eachtransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachtransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0

    transactionList.forEach(eachtransaction => {
      if (eachtransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachtransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachtransaction => {
      if (eachtransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachtransaction.amount
      } else {
        expensesAmount += eachtransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {transactionList, titleInput, amountInput, optionId} = this.state
    const {balanceAmount} = this.getBalance()
    const {incomeAmount} = this.getIncome()
    const {expensesAmount} = this.getExpense()
    return (
      <div className="whole">
        <div className="upperBg">
          <h1 className="headingHi">Hi, Richard</h1>
          <p className="firstPara">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-details">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-header">Add Transaction</h1>
              <label className="input-label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
                placeholder="TITLE"
              />
              <label className="input-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="title"
                value={amountInput}
                onChange={this.onChangeAmountInput}
                placeholder="AMOUNT"
              />
              <label className="input-label" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={optionId}
                onChange={this.OnChangeoptionId}
              >
                {transactionTypeOptions.map(eachoption => (
                  <option key={eachoption.optionId} value={eachoption.optionId}>
                    {eachoption.displayText}
                  </option>
                ))}
              </select>
              <button className="button" type="submit">
                Add
              </button>
            </form>

            <div className="history-transaction">
              <h1>History</h1>
              <div className="transaction-table-container">
                <ul className="transaction-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title </p>
                    <p className="table-header-cell"> Amount </p>
                    <p className="table-header-cell"> Type </p>
                  </li>
                  {transactionList.map(eachtransaction => (
                    <TransactionItem
                      key={eachtransaction.id}
                      transactionDetails={eachtransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
