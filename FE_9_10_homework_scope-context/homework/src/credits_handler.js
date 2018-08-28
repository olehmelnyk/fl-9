function userCard(key) {
  let balance = 100,
      transactionLimit = 100,
      historyLogs = [],
      tax = 0.5,
      hundredPercent = 100;

  return {
    getCardOptions() {
      return {balance, transactionLimit, historyLogs, key};
    },

    putCredits(amount) {
      balance += amount;

      historyLogs.push({
        operationType: 'Received credits',
        credits: amount,
        operationTime: new Date().toLocaleString('en-GB')
      });
    },

    takeCredits(amount) {
      if (transactionLimit && balance >= amount) {
        balance -= amount;

        historyLogs.push({
          operationType: 'Withdrawal of credits',
          credits: amount,
          operationTime: new Date().toLocaleString('en-GB')
        });
      } else {
        console.log(`Error: Transaction limit and remaining balance should be \
greater than credits you want to take.`);
      }
    },

    setTransactionLimit(amount) {
      transactionLimit = amount;

      historyLogs.push({
        operationType: 'Transaction limit change',
        credits: amount,
        operationTime: new Date().toLocaleString('en-GB')
      });
    },

    transferCredits(amount, card) {
      const amountPlusTaxes = amount * tax / hundredPercent + amount;
      const balanceExceeded = amountPlusTaxes > balance;
      const transactionLimitExceeded = amountPlusTaxes > transactionLimit;

      if (balanceExceeded) {
        console.log(`Error: You can't transfer credits - balance exceeded.`);
      } else if (transactionLimitExceeded) {
        console.log(
            `Error: You can't transfer credits - transaction limit exceeded`);
      } else {
        this.takeCredits(amountPlusTaxes);
        card.putCredits(amount);

        // should we log transfer info in history log?
        historyLogs.push({
          operationType: `Credit transfer between cards`,
          credits: amount,
          operationTime: new Date().toLocaleString('en-GB')
        });
      }
    }
  };
}

class UserAccount {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.MAX_CARDS = 3;
  }

  addCard() {
    if (this.cards.length < this.MAX_CARDS) {
      this.cards.push(userCard(this.cards.length + 1));
    } else { // should we add this?
      console.log(`Error: You've reached maximum amount of cards!`);
    }
  }

  getCardByKey(key) {
    return this.cards[key - 1];
  }
}
