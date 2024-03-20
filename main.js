//button ve inputları çekme
const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

//console.log(spendingInput, priceInput, formBtn)

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter)

let total = 0;

function updateTotal(price) {
    //total değeri ve girilen değeri toplama
    total += Number(price);
    //console.log(price)
    totalInfo.innerText = total
    //console.log(total)

}

//gider oluşturma
function addExpense(e) {
    e.preventDefault()
    //console.log( "tıklandı") 

    //console.log(spendingInput.value ,priceInput.value)

    //eski kullanım priceInput ===
    //if=olsa !=olmasa
    if (!priceInput.value || !spendingInput.value) {
        alert("Boş Gider Eklenemez!")
        //fonksiyonu durdurmak için
        return;
    }


    // 1) kullanıcı veri girdiğinde ve ekle dediğindediv oluştur
    const spendingDiv = document.createElement("div");

    //2) class ekleme
    spendingDiv.classList.add("spending")

    //console.dir(statusCheck)
    if (statusCheck.checked) {
        spendingDiv.classList.add("payed");
    }

    // 3) içeriğini ayarlama
    spendingDiv.innerHTML =
        `<h2>${spendingInput.value} =</h2>
<h2 id= "value">${priceInput.value}</h2>

<div class="buttons">
    <img id= "payment" src="images/payment.png" alt="">
    <img id= "remove" src="images/delete.png" alt="">
</div>`
    // 4) listeye eleman ekleme
    list.appendChild(spendingDiv);

    //toplamı güncelle
    updateTotal(priceInput.value)

    //formu temizleme
    spendingInput.value = "";
    priceInput.value = "";
}
function handleClick(e) {
    const element = e.target
    //console.dir(element)

    if (element.id === "remove") {

        // parentElement: tıklanılan elemeanın kapsayıcısına ulaşma
        // (kapsayıcısının kapsayıcısı)
        const wrapper = element.parentElement.parentElement
        //console.log(wrapper)

        //silinen elemanın fiyarını alma
        const deletedPrice = wrapper.querySelector("#value ").innerText
        Number(deletedPrice.innerText);

        //silinen elemanın fiyatını toplamdam çıkarmak
        //updateTotal i güncelleme
        updateTotal(- Number(deletedPrice))

        //kapsayıcı kaldır(remove elemeanları silmeye yarar)
        wrapper.remove()
    }
}


function handleFilter(e) {
    const items = list.childNodes;
    items.forEach((item) => {
        if (item.nodeType === 1) { // Sadece HTML öğelerini işle
            switch (e.target.value) {
                case "all":
                    item.style.display = "flex"
                    break;

                case "payed":
                    // Yalnızca class'ı "payed" olanları gizle
                    if (!item.classList.contains("payed")) {
                        item.style.display = "none"
                    } else {
                        item.style.display = "flex"; // "payed" class'ı yoksa göster
                    }
                    break;

                    case "not-payed":
                        if(item.classList.contains( "payed")){
                            item.style.display = "none"
                        }
                        else{
                            item.style.display = "flex"
                        }
                        break;
            }
        }
    });
}
