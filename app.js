// initial data fetching
const fetchAi = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools/`;

    fetch(url)
        .then(res => res.json())
        .then(data => showCards(data.data))
        .catch(err => console.log(err))
};

const showCards = (aiTools) => {
    // console.log(aiTools);

    //destructuring...
    let { tools } = aiTools;
    // console.log(tools);

    tools = tools.slice(0, 6);


    const cardContainer = document.getElementById('card-body');
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    tools.forEach(tool => {
        const { name, image, published_in } = tool;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'mb-4');
        cardDiv.innerHTML = `
        <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>

                <div class="">
                    <h5 class="card-title">${name}</h5>
                    <div>${published_in}</div>
                </div>
            </div>
        </div>
    `;
        rowDiv.appendChild(cardDiv);
    });
    cardContainer.appendChild(rowDiv);

};

