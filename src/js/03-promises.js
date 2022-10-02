import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formDataObj = {};
  formData.forEach((value, key) => {
    formDataObj[key] = Number(value);
  });
  createPromises(formDataObj);
}

function createPromises({ delay, step, amount }) {
  const array = Array.from({ length: amount }, (_, i) => delay + i * step);
  const promises = array.map(createPromise);
}

function createPromise(delay, position) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promice ${position + 1} in ${delay} ms`);
      } else {
        reject(`Rejected promice ${position + 1} in ${delay} ms`);
      }
    }, delay);
  })
    .then(value =>
      Notify.success(value, {
        position: 'center-center',
        timeout: 3000,
        width: '420px',
        borderRadius: '8px',
      })
    )
    .catch(error =>
      Notify.failure(error, {
        position: 'center-center',
        timeout: 3000,
        width: '420px',
        borderRadius: '8px',
      })
    );
}
