let count = 0,                                      //счетчик карточек
    cards = [],                                    //массив с типами карточек
    newDiv,          //новый блок, который всталвяем  
    newP,            // <p> для счетчика                                                    
    cardId = document.getElementById("table"),   //блок div в который мы помещаем все карточки
    newPage = { page: "index" }; // делаем ветку страницы

document.onclick = (e) => {      //функция, которая создает тот или иной вид карты при клике
    if (e.shiftKey && e.altKey) {     // создаем wide и добавляем в массив cards
        cards.push({type: "wide"});
        count++; 
    } else if (e.shiftKey) {        // создаем narrow и добавляем в массив cards
        cards.push({type: "narrow"});
        count++; 
    } else {
        return;
    }
    makeDiv();
    cardId.onclick = (e) => {       //при клике на карту, удаляем последнюю
        if (!e.shiftKey && !e.altKey) {
          deleteCard(); 
        } 
    };
};
function makeDiv() {       // создаем div по типу картчоки из массива, и создаем параграф дял счетчика
    newDiv = document.createElement("div");
    newDiv.className = cards[cards.length -1].type;     //даем стиль карточкам
    newP = document.createElement("p");
    newP.className = "count";      
    appendDiv();
    doWideSmall();   
};
function appendDiv() {           // вставка блока div и <p> в div
    cardId.appendChild(newDiv);
    newDiv.appendChild(newP);
    newDiv.children[0].innerHTML = count;
};
function doWideSmall() {           // функция работы с картами wide, (делает wide = 400px)
    let i = 0,
        divElement;
    leftShift();
    if ( cards[cards.length -1].type !== "wide"){ 
        for ( len = cardId.children.length; i < len; i += 1 ){
           divElement = cardId.children[i];
            if( divElement.className == "wide" ){
                divElement.style.width = "400px";
            }
        }  
    }
};
function leftShift () {                // функция сдвига и возврата карточек на 60 пикс
    if (cards.length == 1 ){
        cardId.children[cardId.children.length - 1].style.left = "0px";
    }
    if (cards.length > 1) {
        cardId.lastChild.style.left = "60px";
        cardId.children[cardId.children.length - 2].style.left = "0px";
    }
doWideBig();
};
function doWideBig () {            // функция увеличения wide если эта карточка последняя
    if (cards.length === 0 ) {
        return;
    } else if (cards[cards.length -1].type == "wide") {
        cardId.children[cardId.children.length - 1].style.width = "960px";
    } 
};
function deleteCard () {      // функция удаления последней карточки
    cardId.children[cardId.children.length - 1].remove();
    cards.pop();  
    leftShift();
    count -=1;
};
document.onmousemove = (e) => {   // функция смена цвета фона при наведении
    (e.target.className == "narrow" || e.target.className == "wide") ? document.body.style.backgroundColor = "#f6f2de" :  document.body.style.backgroundColor = '#e9e6d3';
}; 
history.pushState(newPage, "page 2", "index.html");
window.onpopstate = (a) => { (cardId.children.length === 0) ? false : deleteCard(); };  //функция 'кнопки назад'  