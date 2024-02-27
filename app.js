

const loadPhone = async (name) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}


const displayPhones = async (phones) => {
    const phoneContainer = document.getElementById('phone-container');
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

}

// handle search button
const handleSearch = () =>{
    const inputName = document.getElementById('input-box');
    loadPhone(inputName.value);
}





