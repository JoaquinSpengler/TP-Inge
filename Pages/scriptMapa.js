function iniciarMap(){
    var coord = {lat:-34.52222222 ,lng: -58.7};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 50,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}
