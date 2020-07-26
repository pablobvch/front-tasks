const fetchAll = () =>
  fetch("http://localhost:5000/api/tasks")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });

export default fetchAll;
