const loadBook = () => {
    const inputField = document.getElementById("input-field");
    const inputText = inputField.value;
    inputField.value = '';

    if (inputText === '') {
        const block = document.getElementById("bloc");
        block.style.display = 'block';
    }
    else {
        const block = document.getElementById("bloc");
        block.style.display = 'none';

        const url = `https://openlibrary.org/search.json?q=${inputText}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                showError(data.numFound)
                showBook(data.docs)
            }

            )
    }

}

const showError = error => {
    if (error === 0) {
        alert('No Result Found!!!')
        document.getElementById("total-item").style.display = 'none';
    }
    else {
        const totalItem = document.getElementById("total-item");

        const newP = document.createElement("p");
        newP.innerHTML = `Total  ${error} Books`;
        totalItem.innerHTML = '';

        totalItem.appendChild(newP);
    }

}

const showBook = items => {
    const book = items.slice(0, 50);


    // Total Item Show
    const lengthItem = document.getElementById("length-item");

    const newP = document.createElement("p");
    newP.innerHTML = `You got ${book.length} Books`;
    lengthItem.innerHTML = '';

    lengthItem.appendChild(newP);


    const showItem = document.getElementById("show-item");
    showItem.textContent = '';

    if (book.length === null) {
        const block = document.getElementById("block");
        block.style.display = 'block';
    }

    else {

        const block = document.getElementById("block");
        block.style.display = 'none';

        book.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Book Name : ${book.title}</h5>
                <p class="card-text">Book Author : ${book.author_name}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">First Publish Year : ${book.first_publish_year}</small>
            </div>
        </div>
    
            `
            showItem.appendChild(div);
        });

    }



}
