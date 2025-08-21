(function(){
  const brand = document.querySelector('.brand');
  if (!brand) return;
  brand.addEventListener('click', function(e){
    e.preventDefault();
    window.location.href = 'index.html';
  });
})();


