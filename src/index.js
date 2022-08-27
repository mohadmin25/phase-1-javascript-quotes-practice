document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp => resp.json())
    .then(data => data.forEach(makeEverything))
  
    const submit = document.querySelector('.btn').addEventListener('click', event => {
      event.preventDefault()
      addQuote()
    })
    
    function addQuote() {
      let quoted = document.getElementById('new-quote').value
      let authored = document.getElementById('author').value
      fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'quote': quoted,
          'author': authored
        })
      })
      .then(resp => resp.json())
      .then(makeEverything)
      }
      function makeEverything({ quote, author, id, likes }) {
        const ul = document.getElementById('quote-list')
        console.log(likes)
        let li = document.createElement('li')
        li.className = 'quote-card'
        li.innerHTML = `
        <blockquote class="blockquote">
          <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer class="blockquote-footer">Someone famous</footer>
          <br>
          <button class='btn-success'>Likes: <span>0</span></button>
          <button class='btn-danger'>Delete</button>
       </blockquote>`
       // adding event listener on the likes button
       li.querySelector('.btn-success').addEventListener('click', () => {
        fetch('http://localhost:3000/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            quoteId: id
          })
        })
        .then(resp => resp.json())
        .then(data => {
          fetch('http://localhost:3000/likes?quoteId=${data.quoteId}')
          .then(resp => resp.json())
          .then((data) => {
            li('span').textContent = data.length
          })
        })
      })
  
      document.querySelector('#quote-list').appendChild(li)
      }
  })
  Footer
  