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
      balance -= amount;

      historyLogs.push({
        operationType: 'Withdrawal of credits',
        credits: amount,
        operationTime: new Date().toLocaleString('en-GB')
      });
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

      if (amountPlusTaxes > balance) {
        console.log(`Error: You can't transfer credits - balance exceeded.`);
      } else if (amountPlusTaxes > transactionLimit) {
        console.log(
            `Error: You can't transfer credits - transaction limit exceeded.`);
      } else {
        this.takeCredits(amountPlusTaxes);
        card.putCredits(amount);
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
    } else {
      console.log(`Error: You've reached maximum amount of cards!`);
    }
  }

  getCardByKey(key) {
    return this.cards[key - 1];
  }
}
