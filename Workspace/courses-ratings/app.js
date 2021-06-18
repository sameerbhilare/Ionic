const courseNameInput = document.querySelector('#input-course-name');
const courseRatingInput = document.querySelector('#input-course-rating');
const addBtn = document.querySelector('#btn-add');
const courseList = document.querySelector('#course-list');
const alertCtrl = document.querySelector('ion-alert-controller');

addBtn.addEventListener('click', () => {
  const enteredCourseName = courseNameInput.value;
  const enteredCourseRating = courseRatingInput.value;

  if (
    enteredCourseName.trim().length <= 0 ||
    enteredCourseRating.trim().length <= 0 ||
    enteredCourseRating < 1 ||
    enteredCourseRating > 5
  ) {
    presentAlert();
    return;
  }

  const newItem = document.createElement('ion-item');
  newItem.innerHTML = `<strong>${enteredCourseName}:</strong>&nbsp;${enteredCourseRating}/5`;

  courseList.appendChild(newItem);

  courseNameInput.value = '';
  courseRatingInput.value = '';
});

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
