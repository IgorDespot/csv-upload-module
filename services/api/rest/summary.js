function numOfErrors(errObj) {
  return Object.keys(errObj).length;
}

function numOfSucess(response) {
  const result = [];
  response.forEach((element1) => {
    element1.status.forEach((element2) => {
      element2.actions.forEach((element) => {
        if (element.status === 'SUCCESS') { result.push(element.status); }
      });
    });
  });
  return result.length;
}

function numOfFails(response) {
  const result = [];
  response.forEach((element1) => {
    element1.status.forEach((element2) => {
      element2.actions.forEach((element) => {
        if (element.status === 'FAIL') { result.push(element.status); }
      });
    });
  });
  return result.length;
}

module.exports = {
  numOfErrors,
  numOfSucess,
  numOfFails
};
