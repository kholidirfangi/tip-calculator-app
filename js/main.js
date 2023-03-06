const tip = document.querySelectorAll('.tip');
const bill = document.querySelector('#bill');
const numberOfPeople = document.querySelector('#number-of-people');

// when select tip click
tip.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const active = document.querySelector('.active');
    if (active) active.classList.remove('active');
    e.target.classList.add('active');

    let tipValue = e.target.innerText;
    tipValue = tipValue.substr(0, tipValue.length - 1);

    if (bill.value === '') return;
    if (numberOfPeople.value === '') numberOfPeople.value = 1;

    calculateTip(
      parseFloat(bill.value),
      parseInt(tipValue),
      parseInt(numberOfPeople.value)
    );
  });
});

const customPersentage = document.querySelector('#custom');

customPersentage.addEventListener('blur', (e) => {
  if (bill.value === '') {
    resetEverything();
    return;
  }

  if (numberOfPeople.value === '') numberOfPeople.value = 1;

  calculateTip(
    parseFloat(bill.value),
    parseFloat(e.target.value),
    parseInt(numberOfPeople.value)
  );
});

const billTipAmount = document.querySelector('.bill-tip-amount');
const billTotalPerPerson = document.querySelector('.total-tip-amount');

function calculateTip(billAmount, tipPersentage, numberOfPeople) {
  let tipAmount = (billAmount * (tipPersentage / 100)) / numberOfPeople;
  let tip = Math.floor(tipAmount * 100) / 100;
  tip = tip.toFixed(2);

  let totalAmount = (tipAmount * numberOfPeople + billAmount) / numberOfPeople;
  totalAmount = totalAmount.toFixed(2);

  billTipAmount.innerHTML = `$${tip}`;
  billTotalPerPerson.innerHTML = `$${totalAmount}`;

}

const resetButton = document.querySelector('button');
resetButton.addEventListener('click', resetEverything);

function resetEverything() {
  billTipAmount.innerHTML = '$0.00';
  billTotalPerPerson.innerHTML = '$0.00';
  bill.value = '';
  numberOfPeople.value = '';
  customPersentage.value = '';
}
