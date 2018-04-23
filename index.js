

function buildMapUrl(address,city,state ){
  
  var baseurl = '"https://maps.googleapis.com/maps/api/staticmap?size=480x480&markers=icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=cafe%257C996600%7C';
  
   var endUrl = '&key=AIzaSyCCBYO_tLYn4FLRWspZ2sdfM8cZSB983_s"';
  
 var addr =  `${address}+${city}+${state}`;
 
  return baseurl + addr+endUrl;
  
}





$( document ).ready(function() {
        var watchID = navigator.geolocation.getCurrentPosition(function(position) {

		var googleApi = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyCtWaw4xhpILx4nI-2O0fvpTDvvmP3S74I";

		console.log(googleApi);
		$.getJSON( googleApi, function( data ) {
			var item = data.results[0];
			
			var zipcode;
         	var st= $.each(item.address_components, function (value, key) {
                if (key.types[0] == "postal_code") {
                    zipcode= key.short_name;
                }
            });
         	
         	$("#citystate").val(zipcode);

		});

	});

    });





 $('#searchButton').click(function(e){
           e.preventDefault();
           
           
           $('#demo').addClass('hidden');
	var what = $("#address").val();
	var where = $("#citystate").val();
$('input[type="text"], textarea').val('');
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D%27"+where+"%27%20and%20query%3D%27"+what+"%27&format=json&callback=";

	$.getJSON( url, function( data ) {

		 try {
		var results = data.query.results.Result;
		
    }
    catch (e){
      console.log("hello" +e);
       $('#demo').removeClass('hidden');
      document.getElementById("demo").innerHTML = "**** Please enter a meaningful search Term ";
    }
      

  
  try {
var  myValue = results.length;
      
}
catch (err){
  console.log("error 2" +err);
}
	
	
	  
	 
		var html = "<table border=1 cellpadding=10><tr><th scope=col>Title</th><th scope=col>Address</th><th scope=col>Phone</th><th scope=col>Distance</th><th scope=col>Mapview</th></tr>";
  try {
   		for(var i = 0;i<results.length;i++){
   		  
     	
     			html += '<tr scope="row">'+
     			'<td>'+results[i].Title+'</td>'+
     			'<td>'+results[i].Address+'<br>'+results[i].City+', '+results[i].State+'</td>'+
     			'<td> <a href="tel:'+results[i].Phone+'">'+results[i].Phone +'</a>'+'</td>'+
     		

     			'<td>'+results[i].Distance+'</td>'+
     			'<td> ' + '<img role= presentation  src=';
     			
     			html += buildMapUrl(results[i].Address,results[i].City,results[i].State);
     			
     			html += ' alt="Mapview" border=1 height=300 width=300></img>' +  '</td>'+'</tr>';
     			
     			
   		}
  }
  
  catch(errr){
    console.log("error" +errr);
    html += "</table>";
    
    $('table').addClass('hidden');
  		$("#results").html("");
    
  }
    try {
	  if(results.length!== 0)
{
   		html += "</table>";
  		$("#results").html(html);
}
}
catch(el){
  console.log("el " +
  el);
}
	});

});


