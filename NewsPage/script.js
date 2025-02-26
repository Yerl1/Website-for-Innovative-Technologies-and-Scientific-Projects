
$(".card").hover(function(){
    $(this).toggleClass('scale-up').siblings().toggleClass('scale-down')
});
const smallContainer = `
    <div class="card-body">
        <h5 class="card-title">Some Title</h5>
        <p class="card-subtitle"><small class="text-body-secondary">Technology</small></p>
        <p style="text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            ipsa accusamus totam placeat
            architecto provident mollitia</p>
    </div>
`

const mediumContainer = `
        <img src="img/image1.jpg" height="75%" class="card-img-top" alt="...">
        <div class="card-body">
             <h5 class="card-title">Some Title</h5>
             <p class="card-subtitle"><small class="text-body-secondary">Blog</small></p>
        </div>
`

const LargeContainer = `
        <img src="img/Image4.jpg"  height="50%" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Some Title</h5>
            <p class="card-subtitle"><small class="text-body-secondary">Technology</small></p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem inventore incidunt fugit
                accusamus</p>
        </div>
`

$(window).scroll(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        for(let i = 0; i < 3; i++){
            number = (Math.round(Math.random() * 10) % 3)
            newElement = document.createElement("div");
            newElement.classList.add("card");
            newElement.classList.add("shadow-sm");
            if(number == 0){
                newElement.classList.add("card_large");
                newElement.innerHTML = String(LargeContainer);
            }
            if(number == 1){
                newElement.classList.add("card_medium");
                newElement.innerHTML = String(mediumContainer);
            }
            if(number == 2){
                newElement.classList.add("card_small");
                newElement.innerHTML = String(smallContainer);
            }
            $(newElement).hide().appendTo("#cardContainer").fadeIn(1200);
        }
        $(window).scrollTop($(window).scrollTop()-1);
    }
});



