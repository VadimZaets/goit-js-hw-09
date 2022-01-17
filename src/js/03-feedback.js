import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener('input', throttle(onFormDataInput, 500));

populateFormData();

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData[refs.input.name] || !formData[refs.textarea.name]) {
    console.log('заполните все поля формы');
  } else {
    console.log(formData);
    console.log('отправляем форму');

    event.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);
    formData[refs.input.name] = '';
    formData[refs.textarea.name] = '';
    // console.log(formData);
  }
}

function onFormDataInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  const parseddData = JSON.parse(savedData);

  console.log(parseddData);

  if (savedData) {
    if (parseddData.email) {
      refs.input.value = parseddData.email;
      formData[refs.input.name] = parseddData.email;
    }
    if (parseddData.message) {
      refs.textarea.value = parseddData.message;
      formData[refs.textarea.name] = parseddData.message;
    }
  }
}
