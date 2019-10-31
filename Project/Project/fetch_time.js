let xhr = new XMLHttpRequest();

// let json = JSON.stringify({
//   name: "John",
//   surname: "Smith"
// });

xhr.open("GET", ' http://localhost:3000/posts/1')
//xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);

