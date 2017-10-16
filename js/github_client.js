const token = "" //use own token
const baseUrl = "https://api.github.com/"
//define functions here
var createGist = function(file_name, content, description, token){
  const repo = baseUrl + "gists"
  const postData = {
    description: description,
    public: true,
    files: {file_name: {content: content}}}

  fetch(repo,{
    headers: {Authorization: "token "+token},
    method: "post",
    body: JSON.stringify(postData)
  }).then(resp => resp.json())
  .then(json => {
    const newNode = document.createElement("li")
    const ul = document.querySelector("#gists ul")
    newNode.innerHTML = `<a href='${json.html_url}' target='_blank'>${json.description}</a>`
    const firstLi = document.querySelector("#gists ul li")
    ul.insertBefore(newNode, firstLi)
    const form = document.getElementById("createGist")
    form.reset()
  })
};

var myGists = function (username, token){
  const repo = "users/" + username + "/gists"
  fetch(baseUrl + repo, {
    headers: {
      Authorization: `token ${token}`}
  })
  .then(function(resp) {return resp.json()})
  .then(json => {
    const gists = document.getElementById("gists")
    let gistHTML = "<ul>"
    json.forEach(function(gist) {
      gistHTML += `<li><a href='${gist.html_url}' target='_blank'>${gist.description}</a></li>`
    })
    gistHTML += "</ul>"
    gists.innerHTML = gistHTML
  })

};

var bindCreateButton = function() {
  // call functions here
  const form = document.getElementsByTagName("form")[0]
  form.addEventListener("submit", function(e) {
    e.preventDefault()
    const token = document.getElementById("token").value
    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    const content = document.getElementById("content").value
    createGist(name, content, description, token)
  })
};

$(document).ready(function(){
  // bindCreateButton()
  myGists("cpan001", token)
  bindCreateButton()
});
