
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');


    street=$('#street').val();
    city=$('#city').val();

    var gimage_url='https://maps.googleapis.com/maps/api/streetview';
    gimage_url+='?'+$.param({
      'size':'600x300','location':street,'key':'AIzaSyB56fqWM8kN5IS9iTIH_v7UFigqyY6ZN14'
    });

    $('body').append('<img class="bgimg" src='+gimage_url+">").error(function(e){
      $('body').append('<img class="bgimg" src="https://dummyimage.com/600x400/ffffff/fff">');
    });

    var nytimes_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytimes_url += '?' + $.param({
      'api-key': "71da9083b0aa48bfb3969822ca19d9a6",'q': city
    });


    $.getJSON( nytimes_url, function( data ){
      //console.log(data);
      var items = [];
      $.each( data.response.docs, function( item ) {
        //console.log(data.response.docs[item].document_type);
        items.push( "</p><a href='" + data.response.docs[item].web_url + "'>" + data.response.docs[item].headline.main + "</a><p>"+data.response.docs[item].snippet+"</p>" );
        });
    $( "<ul/>", {
        "class": "article-list",
        html: items.join( "" )
      }).appendTo( $('#nytimes-articles'));
    }).error(function(){

      $('.wikipedia-container').remove();
      $('body').append("<div><h2>New York Times Articles Couldn't be loaded</h2></div>")

    });

    var wikitimeout=setTimeout(function(){
      $wikiElem.text("Failed to get wikipedia links")},8000);


    //console.log(city);
    $.ajax( {
        url: 'https://en.wikipedia.org/w/api.php',
        data:{
          action:'query',
          srsearch:city,
          list:'search',
          format:'json',
          inprop:'url',
          gsrprop:'snippet',
          prop:'info'
        },
        dataType: 'jsonp',
        //jsonp: "callback",
        success: function(data) {
          searchRes=data.query.search
          for(i=0;i<searchRes.length;i++)
          {
            $('.wikipedia-container').append('<p><ul><a href=https://en.wikipedia.org/wiki/'+escape(searchRes[i].title)+'>'+searchRes[i].title+'</a></ul></p>')

          }
          clearTimeout(wikitimeout);
        }


    }
  );

    return false;
};

$('#form-container').submit(loadData);
