document.addEventListener('DOMContentLoaded', function() {
  var wishlistButtons = document.querySelectorAll('.wishlist-btn');

  wishlistButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var heartIcon = btn.querySelector('.fa-heart');
      
      const shoeId = btn.getAttribute("data-id");
      $.post("/api/favourites", {shoeId})
      .then((res) => {
        console.log(res);
        heartIcon.classList.toggle('heart-red');
        heartIcon.classList.toggle('fa-regular');
        heartIcon.classList.toggle('fa-solid');
        
        heartIcon.classList.add('bounce');
        })

      setTimeout(function() {
        heartIcon.classList.remove('bounce');
      }, 300);
    });
  });
});

// store id as html property as data property.
// javascript to grab it


