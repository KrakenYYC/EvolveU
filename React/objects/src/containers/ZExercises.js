import React from "react";
import "./ZExercises.css";

class AccountsController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newAccountName: "",
      newAccountBalance: 0
    };
  }

  componentDidMount() {
    this.newAccountName.focus();
  }

  render() {
    const currentState = this.props.currentState;
    let maxBalanceAccount = "";
    let minBalanceAccount = "";
    let totalBalance = 0;

    if (currentState.accounts.length > 0) {
      const maxReducer = (max, current) => Math.max(max, current);
      const minReducer = (min, current) => Math.min(min, current);
      const totalReducer = (value, current) => value + current;

      const maxBalance = currentState.accounts
        .map(account => account.balance)
        .reduce(maxReducer);
      const minBalance = currentState.accounts
        .map(account => account.balance)
        .reduce(minReducer);

      totalBalance = currentState.accounts
        .map(account => account.balance)
        .reduce(totalReducer);

      const isMaxBalance = account => account.balance === maxBalance;
      const isMinBalance = account => account.balance === minBalance;

      minBalanceAccount =
        currentState.accounts[currentState.accounts.findIndex(isMinBalance)]
          .name;

      maxBalanceAccount =
        currentState.accounts[currentState.accounts.findIndex(isMaxBalance)]
          .name;
    }

    return (
      <div className="AccountsControllerSection">
        <div className="AccountsControllerBox">
          <h4>Accounts Overview:</h4>
          <p>
            <span className="AccountLabel">Maximfffffffum:</span>
            <span className="AccountValue">{maxBalanceAccount}</span>
          </p>
          <p>
            <span className="AccountLabel">Minimum:</span>
            <span className="AccountValue">{minBalanceAccount}</span>
          </p>
          <p>
            <span className="AccountLabel">Total:</span>
            <span className="AccountValue">{totalBalance}</span>
          </p>
        </div>

        <div className="AccountsControllerBox">
          <h4>Open New Account:</h4>
          <p>
            <span className="AccountLabel">Name:</span>
            <span>
              <input
                type="text"
                className="AccountField"
                ref={newAccountName => {
                  this.newAccountName = newAccountName;
                }}
                onChange={input =>
                  this.setState({ newAccountName: input.target.value })
                }
                value={this.state.newAccountName}
              />
            </span>
          </p>

          <p>
            <span className="AccountLabel">Balance:</span>
            <span>
              <input
                type="text"
                className="AccountField"
                onChange={input =>
                  this.setState({
                    newAccountBalance: Number(
                      input.target.value.replace(/[^0-9.]/g, "")
                    )
                  })
                }
                value={this.state.newAccountBalance}
              />
            </span>
          </p>

          <p className="AccountButtonP">
            <button
              className="AccountButton"
              onClick={() => {
                if (this.state.newAccountName.length > 0) {
                  const accountIndex = this.state.newAccountName;
                  const adjustmentValue = this.state.newAccountBalance;
                  const adjustmentType = "open";
                  this.props.adjustAccount(
                    accountIndex,
                    adjustmentType,
                    adjustmentValue
                  );
                } else {
                  this.newAccountName.focus();
                }
              }}
            >
              Open
            </button>
          </p>
        </div>
      </div>
    );
  }
}
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <div className="AccountsListBox">
        <p>
          <span className="AccountLabel">Account:</span>
          <span className="AccountValue">{this.props.account.name}</span>
        </p>
        <p>
          <span className="AccountLabel">Balance:</span>
          <span className="AccountValue">{this.props.account.balance}</span>
        </p>
        <p className="AccountButtonP">
          <span className="AccountLabel">Adjust:</span>
          <span>
            <input type="text" className="AccountField" ref={this.myRef} />
          </span>
        </p>
        <p className="AccountButtonP">
          <button
            className="AccountButton"
            onClick={() => {
              const adjustmentValue = this.myRef.current.value;
              if (adjustmentValue !== "") {
                const accountIndex = this.props.index;
                const adjustmentType = "rename";
                this.myRef.current.value = "";
                this.props.adjustAccount(
                  accountIndex,
                  adjustmentType,
                  adjustmentValue
                );
              }
            }}
          >
            Rename
          </button>
          <button
            className="AccountButton"
            onClick={() => {
              const adjustmentValue = Number(this.myRef.current.value);
              if (!isNaN(adjustmentValue)) {
                const accountIndex = this.props.index;
                const adjustmentType = "deposit";
                this.myRef.current.value = "";
                this.props.adjustAccount(
                  accountIndex,
                  adjustmentType,
                  adjustmentValue
                );
              }
            }}
          >
            Deposit
          </button>

          <button
            className="AccountButton"
            onClick={() => {
              const adjustmentValue = Number(this.myRef.current.value);
              if (
                !isNaN(adjustmentValue) &&
                adjustmentValue <= this.props.account.balance
              ) {
                const accountIndex = this.props.index;
                const adjustmentType = "withdraw";
                this.myRef.current.value = "";
                this.props.adjustAccount(
                  accountIndex,
                  adjustmentType,
                  adjustmentValue
                );
              }
            }}
          >
            Withdraw
          </button>
          <button
            className="AccountButton"
            onClick={() => {
              const adjustmentValue = this.myRef.current.value;
              const accountIndex = this.props.index;
              const adjustmentType = "close";
              this.myRef.current.value = "";
              this.props.adjustAccount(
                accountIndex,
                adjustmentType,
                adjustmentValue
              );
            }}
          >
            Close
          </button>
        </p>
      </div>
    );
  }
}
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .

//this is the only thing that gets exported

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
  }

  adjustAccount = (accountIndex, adjustmentType, adjustmentValue) => {
    const savedState = this.state;
    if (adjustmentType === "open") {
      const newAccount = { name: accountIndex, balance: adjustmentValue };
      savedState.accounts.push(newAccount);
    } else if (adjustmentType === "rename") {
      savedState.accounts[accountIndex].name = adjustmentValue;
    } else if (adjustmentType === "close") {
      savedState.accounts.splice(accountIndex, 1);
    } else if (adjustmentType === "deposit") {
      savedState.accounts[accountIndex].balance += adjustmentValue;
    } else if (adjustmentType === "withdraw") {
      savedState.accounts[accountIndex].balance -= adjustmentValue;
    }

    this.setState(savedState);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Module 140 - Accounts
          <AccountsController
            currentState={this.state}
            adjustAccount={this.adjustAccount}
          />
          <div className="AccountsListSection">
            {this.state.accounts.map((account, index) => (
              <div key={index}>
                <Account
                  account={account}
                  key={index}
                  index={index}
                  adjustAccount={this.adjustAccount}
                />
              </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default Accounts;
