const reasonInput = document.querySelector('#input-reason');
const amountInput = document.querySelector('#input-amount');
const cancelBtn = document.querySelector('#btn-cancel');
const confirmBtn = document.querySelector('#btn-confirm');
const expensesList = document.querySelector('#expenses-list');
const totalExpensesOutput = document.querySelector('#total-expenses');

let totalExpenses = 0;

const clear = () => {
  reasonInput.value = '';
  amountInput.value = '';
};

confirmBtn.addEventListener('click', () => {
  const enteredReason = reasonInput.value;
  const enteredAmount = amountInput.value;

  // validation
  if (enteredReason.trim().length <= 0 || enteredAmount <= 0 || enteredAmount.trim().length <= 0) {
    // show alert
    presentAlert();
    return;
  }

  // console.log(enteredReason, enteredAmount);
  // create ionic element (just like regular html elements)
  const newItem = document.createElement('ion-item');
  newItem.textContent = enteredReason + ': $' + enteredAmount;
  // append it to expense list
  expensesList.appendChild(newItem);

  totalExpenses += +enteredAmount;
  totalExpensesOutput.textContent = totalExpenses;

  // clear inputs
  clear();
});

cancelBtn.addEventListener('click', clear);

// creating and presenting ionic alert
const presentAlert = async () => {
  const alert = document.createElement('ion-alert');
  //alert.cssClass = 'my-custom-class';
  alert.header = 'Alert';
  //alert.subHeader = 'Subtitle';
  alert.message = 'Please enter valid input.';
  alert.buttons = ['OK'];

  document.body.appendChild(alert);
  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
};
