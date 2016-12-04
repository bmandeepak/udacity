
function getImage(){
  var url_img1='http://lorempixel.com/output/nature-q-c-640-480-8.jpg'
  var url_img2='http://lorempixel.com/output/nature-q-c-640-480-8.jpg'
  var image_name1='nature-q-c-640-480-8.jpg'

  $('#cat_element').append('<img id="nature1" src='+'"'+url_img1+'"'+'></img>');
  $('#cat_element').append('<h3>'+image_name1+'</h3>');
  $('#cat_element').append('<img id="nature2" src='+'"'+url_img2+'"'+'></img>');
  $('#cat_element').append('<h3>'+image_name1+'</h3>');
};

function getClicks(image_id,id) {

    var count=[0,0]

    $("#"+image_id).on('click',function(e){
      if(image_id=='nature1'){
        count[0]+=1
        $("#"+id).remove();
        $('#count').append('<div id="1"><div id='+id+'><h3>You clicked' +image_id +' '+ count[0]+' times</h3></div></div>');
      }
      else {
        count[1]+=1
        $("#"+id).remove();
        $('#count').append('<div id="2"><div id='+id+'><h3>You clicked' +image_id +' '+ count[1]+' times</h3></div></div>');
      }
    });
    return false;
};
getImage();
getClicks('nature1','click_count_img1');
getClicks('nature2','click_count_img2');
