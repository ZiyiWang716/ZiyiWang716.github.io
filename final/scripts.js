var loadPhoto = function(event) {
    var image = document.getElementById('photoOutput');
    image.src = URL.createObjectURL(event.target.files[0]);
};