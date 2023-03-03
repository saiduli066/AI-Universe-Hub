
// initial data fetching
const fetchAi = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools/`;
    document.getElementById('spinner').classList.remove('d-none');//spinner
    
    /* this additional code because of the show more btn coming up until the cards  loaded */
    document.getElementById('show-more').classList.add('d-none');  //for show more btn
    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById('spinner').classList.add('d-none');//spinner
            showCards(data.data);
            //show more btn
            document.getElementById('show-more').classList.remove('d-none');
           
        })
        .catch(err => console.log(err))
};

const showCards = (aiTools) => {
    // console.log(aiTools);

    //destructuring...
    let { tools } = aiTools;
    // console.log(tools);

    // tools = tools.slice(0, 6);


    const cardContainer = document.getElementById('card-body');
    cardContainer.innerHTML = '';
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    tools.forEach(tool => {
        const { name, image, published_in, features, id } = tool;
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'mb-4');
      
       

        
        cardDiv.innerHTML = `
        <div class="card">
            <img src="${image}" class="card-img-top img-fluid" style="width: 450px; height: 250px;" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>
                  
                 <div class="d-flex justify-content-between align-items-center">   
                <div >
                    <h5 class="card-title">${name}</h5>
                    <p id="feature-text" class="card-text m-0 p-0">1.${features ? features[0] : "unavailable"}</p>
                    <p class="card-text m-0 p-0">2.${features ? features[1] : "unavailable"}</p>
                    <p class="card-text m-0 p-0">3.${features ? features[2] : ""}</p>
                    <div><i class="far fa-calendar-alt"></i> ${published_in}</div>
                </div>
                <div>
                
             <button id="modal-pointer" onclick="loadSingleData('${id}')" class="rounded-circle text-danger border   border-0 p-2" style="background-color: #dc35461a;" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                <i class="fas fa-arrow-right"></i>
            </button>
                </div>
                </div>
            </div>
        </div>
    `;
        rowDiv.appendChild(cardDiv);
    });
    cardContainer.appendChild(rowDiv);

    
};

const loadSingleData = (id) => {
  
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
    
    
}

const showSingleData = () => {
    
}

// const showMoreButton = document.getElementById('show-more');
// showMoreButton.addEventListener('click', () => {
//     const cards = document.querySelectorAll('.card');
//     console.log(cards);
//     cards.forEach((card) => {
//         card.classList.remove('d-none');
//     });
// });

//
// const loadMore = () => {
    
// }

// // 
// document.getElementById('show-more').addEventListener('click', function () {
    
// })

// // Show only the first six cards by default
// const cardsToShow = 6;
// const cardContainer = document.getElementById('card-body');
// const cards = document.querySelectorAll('.card');
// console.log(cards);
// cards.forEach((card, index) => {
//     if (index >= cardsToShow) {
//         card.classList.add('d-none');
//     }
// });

// // show all the cards..
// const showMoreButton = document.getElementById('show-more');
// showMoreButton.addEventListener('click', () => {
//     cards.forEach((card) => {
//         card.classList.remove('d-none');
//     });
// });


