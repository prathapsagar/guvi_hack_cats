document.body.innerHTML = `<div class="heading-container">
<h1> Cats List</h1> </div>
<form action="">
<input type="search" placeholder="Search here" class="inputField" id="search-box">
</form>
<div id="mainContainer"  class="main-container"> </div>
<div id="myModal" class="modal">

  <!-- The Close Button -->
  <span class="close">&times;</span>

  <!-- Modal Content (The Image) -->
  <img class="modal-content" id="img01">

  <!-- Modal Caption (Image Text) -->
  <div id="caption"></div>
</div>
`;

const getData = async () => {
  try {
    const data = await fetch("https://cataas.com/api/cats");
    const cats = await data.json();
    mainContainer.innerHTML = "";
    cats.forEach((cat) => {
      displayData(cat);
    });
let searchbox = document.querySelector("#search-box");
      searchbox.addEventListener("keyup", function () {
        let textentered = searchbox.value;
       
      let  x=[]
        if(textentered!==""){
          x= cats.filter(function(cat){
            return cat.tags.indexOf(textentered) > -1;
          })
          console.log(x)
             x.forEach((cat) => {
               popupcat(cat);
             });  
        }
      });

  } catch (error) {
    console.log(error);
  }
};

getData();

const displayData = (obj) => {
  mainContainer.innerHTML += `
    <div id="subcont" class="container">
   <div i> <span> Cat ID=</div>
   <div id="cat_id">${obj.id}</div>
      <p class="para blue"> Created At=<span> ${obj.created_at}</span></p>
       <p class="para blue"> Tags=<span> ${obj.tags}</span></p>
        <img id="myImg" src="https://cataas.com/cat/${obj.id}" alt=""  >
        
    `;
};

const popupcat= (arr)=>{
  var modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementById("myImg");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src =" https://cataas.com/cat/"+arr.id
    captionText.innerHTML = "cat"
  

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
}
