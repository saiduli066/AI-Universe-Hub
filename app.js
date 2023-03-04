
// initial data fetching
const fetchAi = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools/`;
    document.getElementById('spinner').classList.remove('d-none');//spinner
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById('spinner').classList.add('d-none');//spinner
            showCards(data.data);
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
        
        // console.log(id);
        const cardDiv = document.createElement('div');
        
        cardDiv.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'mb-4', 'card');

         //when the card's id is greater than 6, 'd-none' class will be added to cardDiv
        if (id > 6) {
            cardDiv.classList.add('d-none'); 
        }

        
        cardDiv.innerHTML = `
        <div class="card">
            <img src="${image}" class="card-img-top img-fluid" style="width: 450px; height: 250px;" alt="">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                 <p id="feature-text" class="card-text m-0 p-0">1.${features[0]? features[0] : "unavailable"}</p>
                    <p class="card-text m-0 p-0">2.${features[1] ? features[1] : "unavailable"}</p>
                    <p class="card-text m-0 p-0">3.${features[2] ? features[2]: "not available"}</p>
                  
                 <div class="d-flex justify-content-between align-items-end">   
                <div >
                    <h5 class="card-title m-2">${name}</h5>
                   
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

    toggleShowMoreButton(true);
    
};




const loadSingleData = (id) => {
  
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showSingleData(data.data))
    
    
}

const showSingleData = (details) => {
    const Title = document.getElementById('title');
    //
    const { description, pricing, features, integrations, image_link, input_output_examples, accuracy } = details;

    // console.log(accuracy);
    
    Title.innerText = `${description}`;

// set the price and plan 
    document.getElementById('month-basic-price').innerText = `${pricing[0].price ? pricing[0].price : 'free of cost'}`;
    document.getElementById('month-basic-plan').innerText = `${pricing[0].plan}`;

    document.getElementById('month-pro-price').innerText = `${pricing[1].price ? pricing[1].price : 'free of cost'}`;
    document.getElementById('month-pro-plan').innerText = `${pricing[1].plan}`;


    document.getElementById('enterprise-contact').innerText = `${pricing[2].price ? pricing[2].price : 'free of coast'}`;
    document.getElementById('enterprise-section').innerText = `${pricing[2].plan}`;
    
    
    
    
    document.getElementById('feature-1').innerText = `${features['1']['feature_name']}`;
    document.getElementById('feature-2').innerText = `${features['2']['feature_name']}`;
    document.getElementById('feature-3').innerText = `${features['3']
    ['feature_name']}`;

    for (let i = 0; i < integrations.length; i++) {
        let index = i + 1;
        document.getElementById(`integration-${index}`).innerText = integrations[i];
       
    }

    // modal inner image and a accuracy badge in it.
    //showing the batch with accuracy ,if there's no accuracy nothing will be shown.

    document.getElementById('img-container').innerHTML = `
        
        <div class="card">
        <img class="w-100 " style="" src='${image_link[0]}' alt="">
        <div class="card-img-overlay">
      <sup>${ accuracy.score ? '<span class="badge bg-danger float-end">' + accuracy.score * 100 + '% accuracy</span>' : '' }</sup>

        </div>
        </div>
    `;

//   qna by ai
    document.getElementById('asked-question').innerText = `${input_output_examples[0].input}`;

    document.getElementById('ai-reply').innerText = `${input_output_examples[0].output}`;

    
}


// Get the button and card container
const sortButton = document.getElementById('sort-button');
const cardContainer = document.getElementById('card-body');

// Add event listener to button
const sortByDate =() => {

    // Get all cards and convert them to an array
    const cards = Array.from(cardContainer.querySelectorAll('.card'));
    console.log(cards);

    // Sort the cards by their data-date attribute using a compare function
    cards.sort(function (card1, card2) {
        const date1 = new Date(card1.dataset.date);
        console.log(date1);
        const date2 = new Date(card2.dataset.date);
        return date1 - date2;
    });

    // Remove all cards from the container
    cardContainer.innerHTML = '';

    // Adding the sorted cards back to the container
    cards.forEach(function (card) {
        cardContainer.appendChild(card);
    });
};


// show more...
const showMoreButton = document.getElementById('show-more');
showMoreButton.addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    console.log(cards);
    cards.forEach((card) => {
        card.classList.remove('d-none');
    });
    toggleShowMoreButton(false);
});

const toggleShowMoreButton = isShowing => {
    const showMoreButton = document.getElementById('show-more');
    if (isShowing) {
        showMoreButton.classList.remove('d-none');
    }
    else {
        showMoreButton.classList.add('d-none');
    }
}

