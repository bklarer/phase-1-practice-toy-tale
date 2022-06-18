let addToy = false;


const toyURL = 'http://localhost:3000/toys'  
  

document.addEventListener("DOMContentLoaded", () => {
  
  fetchToys(toyURL)

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

const toyForm = document.querySelector('.add-toy-form')

toyForm.addEventListener('submit', function (event) {
  toyAdd(toyURL);
  event.preventDefault();
  toyForm.reset();
});

function fetchToys(toyURL) {
  fetch(toyURL)
  .then(resp => resp.json())
  .then(data => {data.forEach(toy => createToy(toy))})
  .catch(error => console.log(error))
}

function toyAdd(toyURL) {
  const POST = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": `${event.target[0].value}`,
      "image": `${event.target[1].value}`,
      "likes": 0
    })
  };
    fetch(toyURL, POST)
    .then(resp => resp.json())
    .then(toy => createToy(toy))
    .catch(error => console.log(error))
};

function createToy(toy) {
  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  const p = document.createElement("p")
  const img = document.createElement('img')
  div.setAttribute("class", "card")
  img.setAttribute("class", "toy-avatar")
  const likeButton = document.createElement("button")
  likeButton.setAttribute("id", `${toy.id}`)
  likeButton.setAttribute("class", "like-btn")
  likeButton.textContent = "Like"

  h2.textContent = toy.name
  img.src = toy.image
  p.textContent = `${toy.likes} likes`

  div.append(h2, img, p, likeButton)

  const toyCollection = document.querySelector('#toy-collection')

  toyCollection.appendChild(div);

  document.getElementById(`${toy.id}`).addEventListener("click", event => {addLikes()})

}

function addLikes() {
 let id = event.target.id;
 let likeNumber = event.target.parentNode.childNodes[2].textContent.split(" ")[0]
 let addALike = Number(likeNumber) + 1
 const PATCH = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    "likes": addALike
  })
 };
 fetch(`${toyURL}/${id}`, PATCH)
 .then(resp => resp.json())
 .then(toy => {
  document.getElementById(`${id}`).parentNode.childNodes[2].textContent = `${toy.likes} likes`
 })
}
});