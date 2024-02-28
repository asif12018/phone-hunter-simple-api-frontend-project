

const loadPhone = async (name = '13', isShowAll) => {
    //clear phone container before adding
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    //loading data from api
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`);
    const data = await res.json();
    const phones = data.data;

    displayPhones(phones, isShowAll);
}
loadPhone();

const displayPhones = async (phones, isShowAll) => {
    //adding total result on h1 tag
    const h1 = document.getElementById('total-result');
    h1.classList.add('p-4', 'm-4');

    h1.innerText = `total result: ${phones.length}`;
    //showing only 12 phones

    const phoneContainer = document.getElementById('phone-container');
    //show all button show by condition
    const showAllBtn = document.getElementById('show-all');
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden');
    } else {
        showAllBtn.classList.add('hidden');
    }

    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    } else {
        showAllBtn.classList.add('hidden')
    }

    phones.forEach(phone => {

        const div = document.createElement('div');

        div.innerHTML = `
        <div class="card max-w-full bg-gray-100 bg-base-100 shadow-xl col-span-1 md:col-span-2 lg:col-span-1 mx-auto p-4">
  <figure><img src="${phone.image}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="text-2xl font-bold text-black text-center">${phone.phone_name}</h2>
    <p class="text-center text-black">${phone.phone_name}</p>
    <div class="card-actions justify-end">
      <button onclick="handleShowDetail('${phone.slug}')"  class="btn btn-primary mx-auto my-4">Show Details</button>
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
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const inputName = document.getElementById('input-box');
    loadPhone(inputName.value, isShowAll);
}

//loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }



}

//handle show All
const handleShowAll = () => {
    handleSearch(true);
}

//load details function
const handleShowDetail = async (id) => {
    //single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

// show details function

const showPhoneDetails = (phone) => {
    
    const showDetails = document.getElementById('show-details');
    const div = document.createElement('div');
    
    div.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle ">
    <div class="modal-box">
        <div class="max-w-[672px]">
        <img class="mx-auto " src="${phone.image}">
        </div>
        <h3 class="font-semibold text-lg">${phone.name}</h3>
        <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class=" font-semiBold ">Storage:${phone.mainFeatures.storage}</p>
        <p class=" font-semiBold ">Display:${phone.mainFeatures.displaySize}</p>
        <p class=" font-semiBold ">Chipset:${phone.mainFeatures.chipSet}</p>
        <p class=" font-semiBold ">Slug:${phone.slug}</p>
        <p class=" font-semiBold ">Release data:${phone.releaseDate}</p>
        <p class=" font-semiBold ">Brand:${phone.brand}</p>
        
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
        </div>
    </div>
</dialog>
    `;
    showDetails.appendChild(div);
    my_modal_5.showModal();
}





