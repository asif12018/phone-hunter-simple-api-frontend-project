

const loadPhone = async (name) => {
    //clear phone container before adding

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`);
    const data = await res.json();
    const phones = data.data;

    displayPhones(phones);
}


const displayPhones = async (phones) => {
      //adding total result on h1 tag
    const h1 = document.getElementById('total-result');
    h1.classList.add('p-4', 'm-4');
    
    h1.innerText = `total result: ${phones.length}`;
    //showing only 12 phones
    let lessPhone = phones.slice(0,12);
    const phoneContainer = document.getElementById('phone-container');
    //show all button show by condition
    const showAllBtn = document.getElementById('show-all');
    if(phones.length > 12){
        showAllBtn.classList.remove('hidden');
    }
    lessPhone.forEach(phone => {
        
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

}

// handle search button
const handleSearch = () =>{
    const inputName = document.getElementById('input-box');
    loadPhone(inputName.value);
}





