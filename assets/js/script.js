// VARIABLES ---------------------------------------

let myLinks = []
const myLinksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )
const inputName = document.querySelector(".input-name")
const saveNameBtn = document.querySelector(".save-name-btn")
const greetings = document.querySelector(".greetings-txt")
let nameUser = ""

const MotivationalQuote = document.querySelector(".motivational-quote")
const stoicQuotes = [`"Waste no more time arguing what a good man should be. Be One.” - Marcus Aurelius`, `"You could leave life right now. Let that determine what you do and say and think." — Marcus Aurelius`, `"He who fears death will never do anything worth of a man who is alive." — Seneca`, `“Life is very short and anxious for those who forget the past, neglect the present, and fear the future.“ — Seneca`, `“How long are you going to wait before you demand the best for yourself?“ — Epictetus`, `“Don’t explain your philosophy. Embody it.“ — Epictetus`, `“You have power over your mind — not outside events. Realize this, and you will find strength.“ ― Marcus Aurelius`, `“Hang on to your youthful enthusiasms — you’ll be able to use them better when you’re older.“ ― Seneca`, `“Wealth consists not in having great possessions, but in having few wants.“ ― Epictetus`, `“If it is not right, do not do it; if it is not true, do not say it.“ — Marcus Aurelius`, `“Begin at once to live, and count each separate day as a separate life.“ — Seneca`, `“Stop drifting…Sprint to the finish. Write off your hopes, and if your well-being matters to you, be your own savior while you can.“ — Marcus Aurelius`, `“Whatever can happen at any time can happen today.“—Seneca`, `“They lose the day in expectation of the night, and the night in fear of the dawn.“—Seneca`, `“The key is to keep company only with people who uplift you, whose presence calls forth your best.“―Epictetus`, `“The happiness of your life depends upon the quality of your thoughts.“―Marcus Aurelius`, `“If you want to improve, be content to be thought foolish and stupid.“―Epictetus“`, `“Luck is what happens when preparation meets opportunity.“ ― Seneca`]

const inputUrl = document.querySelector(".input-url")
const saveTabBtn = document.querySelector(".save-tab-btn")
const saveWriteBtn = document.querySelector(".save-write-btn")
const deleteAllBtn = document.querySelector(".delete-all-btn")

const listUl = document.querySelector(".list-ul")


// GREETINGS ---------------------------------------


if (localStorage.getItem("nameUser")) {
  inputName.remove()
  saveNameBtn.remove()
  const name = localStorage.getItem("nameUser")
  greetings.innerHTML = `${name}, Welcome Back!`
}

saveNameBtn.addEventListener("click", function() {
  nameUser = inputName.value
  localStorage.setItem("nameUser", nameUser)
  inputName.remove()
  saveNameBtn.remove()
  greetings.innerHTML = `${nameUser}, Welcome Back!`
})


// QUOTE -----------------------------------------

let randomNumber = Math.floor(Math.random() * stoicQuotes.length)
MotivationalQuote.innerHTML = stoicQuotes[randomNumber]


// CHECK CONTENT IN LOCAL STORAGE ----------------

if (myLinksFromLocalStorage) {
  myLinks = myLinksFromLocalStorage
  render(myLinks)
}


// RENDER ---------------------------------------

function render(links) {
  let listLinks = ""
  for (let i = 0; i < links.length; i++ ) {
    listLinks += `
      <li>  
        <a target='_blank' href='${links[i]}'>${links[i]}</a>
      </li>
    `
  }
  listUl.innerHTML = listLinks
}


// SAVE CHROME TAB ------------------------------

saveTabBtn.addEventListener("click", function() {    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLinks.push(tabs[0].url)
      localStorage.setItem("myLinks", JSON.stringify(myLinks) )
      render(myLinks)
  })
})


// SAVE WRITTEN INPUT ---------------------------

saveWriteBtn.addEventListener("click", function() {
  myLinks.push(inputUrl.value)
  inputUrl.value = ""
  localStorage.setItem("myLinks", JSON.stringify(myLinks) )
  render(myLinks)  
})

// DELETE ---------------------------------------

deleteAllBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  myLinks = []
  render(myLinks)
})
