

const loadPhone = async (name,isShowAll) => {
    //clear phone container before adding
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    //loading data from api
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`);
    const data = await res.json();
    const phones = data.data;
    
    displayPhones(phones,isShowAll);
}


const displayPhones = async (phones,isShowAll) => {
      //adding total result on h1 tag
    const h1 = document.getElementById('total-result');
    h1.classList.add('p-4', 'm-4');
    
    h1.innerText = `total result: ${phones.length}`;
    //showing only 12 phones
    
    const phoneContainer = document.getElementById('phone-container');
    //show all button show by condition
    const showAllBtn = document.getElementById('show-all');
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }else{
        showAllBtn.classList.add('hidden');
    }
    
    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }else{
        showAllBtn.classList.add('hidden')
    }

    phones.forEach(phone => {
        
        const div = document.createElement('div');
       
        div.innerHTML = `
        <div class="card max-w-full bg-gray-100 bg-base-100 shadow-xl col-span-1 md:col-span-2 lg:col-span-1 mx-auto p-4">
  <figure><img src="${phone.image}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>${phone.slug}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `;

        phoneContainer.appendChild(div);
    });

//         hide loading spinner
  toggleLoadingSpinner(false);

}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const inputName = document.getElementById('input-box');
    loadPhone(inputName.value,isShowAll);
}

//loading spinner
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
    
    

}

//handle show All
const handleShowAll = ()=>{
    handleSearch(true);
}





