console.log("client side style sheet loaded")
fetch('http://puzzle.mead.io/puzzle').then(response => {
   response.json().then((data) => {
       console.log(data)
   })
})
fetch('http://localhost:3000/weather?address=chennai').then(response => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        }else {
            console.log(data.forcast)
            console.log(data.location)
        }
    })
})

const weather = document.querySelector('form')
const inputField = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
weather.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('input Value' + inputField.value)
    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''
    fetch('/weather?address=' + inputField.value).then (response => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            messagetwo.textContent = ''
        }else {
            messageOne.textContent = data.forcast
            messagetwo.textContent = data.location
        }
    })
})
})