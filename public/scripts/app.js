// Client facing scripts here
$(document).ready(() => {
  $('#filterForm').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    console.log(formData);
    $.ajax('api/filter', {
      method: 'GET',
      data: formData,
    })
    .then(function(results){
      $(`#results-container`).html(" ");
      for (let shoe of results.shoe_listings) {
        $(`#results-container`).append(`<div class="shoe-listing">
        <h3>${shoe.title}</h3>
        <p>Brand: ${shoe.brand}</p>
        <p>Size: ${shoe.size}</p>
        <p>Price: ${shoe.price}</p>
        <p>Condition: ${shoe.condition}</p>
        <p>Description: ${shoe.description}</p>
      </div>`)
      }
    })
  })
});
