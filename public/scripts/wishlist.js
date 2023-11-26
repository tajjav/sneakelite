document.addEventListener('DOMContentLoaded', function() {
  var wishlistButtons = document.querySelectorAll('.wishlist-btn');

  wishlistButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var heartIcon = btn.querySelector('.fa-heart');
      
      heartIcon.classList.toggle('heart-red');
      heartIcon.classList.toggle('fa-regular');
      heartIcon.classList.toggle('fa-solid');
      
      heartIcon.classList.add('bounce');
      setTimeout(function() {
        heartIcon.classList.remove('bounce');
      }, 300);
    });
  });
});