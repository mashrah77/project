let title = document.getElementById("title");
let Price = document.getElementById("Price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let Total = document.getElementById("Total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let sumbit = document.getElementById("sumbit");

let moodUpCre = "create";
let tmp; //متغير مساعد
//get total
function getTotal() {
  if (Price.value != "") {
    let result = +Price.value + +taxes.value + +ads.value - discount.value; ///جمع القيم واضافتها الي الTOTAL
    Total.innerHTML = result;
    Total.style.background = "#040"; ///
  } else {
    Total.innerHTML = "";
    Total.style.background = "#a00d02";
  }
}

// creete
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product); //
} else {
  datapro = [];
}
sumbit.onclick = function () {
  let newpro = {
    title: title.value, //toLowerCase(),
    Price: Price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    Total: Total.innerHTML,
    count: count.value,
    category: category.value, //toLowerCase(),
  };
  //count
  ///شوط ال الابديت
  if (
    title.value != "" &&
    Price.value != "" &&
    category.value != "" &&
    newpro.count <= 100
  ) {
    if (moodUpCre === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i <= newpro.count; i++) {
          datapro.push(newpro); //انشاء منتج على عدد الل
        }
      } else {
        datapro.push(newpro); ///لوادخل المستخدم رقم غلط او مثلا سالب او حرف او رمز  انشائ منتج واحد
      }
    } else {
      datapro[tmp] = newpro;
      moodUpCre = "create";
      count.style.display = "black";
      sumbit.innerHTML = "Create انشاء";
    }

    ///sava
    localStorage.setItem("product", JSON.stringify(datapro)); //لحقط العناصر
    cleardata();
    showData();
  }
};

///clear data

function cleardata() {
  title.value = "";
  Price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  Total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//reed عرض
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
                <tr>
                       <td>${i + 1}</td>
                       <td>${datapro[i].title}</td>
                       <td>${datapro[i].Price}</td>
                       <td>${datapro[i].taxes}</td>
                       <td>${datapro[i].ads}</td>
                       <td>${datapro[i].discount}</td>
                       <td>${datapro[i].Total}</td>
                       <td>${datapro[i].category}</td>
                       <td><button onclick="Updatadet(${i})" id="Updata">Updata</button></td>
                       <td><button onclick="deletdata(${i})" id="Delet">Delete</button></td>

                    </tr> `;
  }
  ///زرار حذف الكل
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick = " deleteAll()">DeleteAll=${datapro.length}</button>
`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();
////حذف عنصر
function deletdata(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}
////حذف الكل
function deleteAll() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}
////تعديل
function Updatadet(i) {
  title.value = datapro[i].title;
  Price.value = datapro[i].Price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  sumbit.innerHTML = "Update تعديل";
  moodUpCre = "update";
  tmp = i;
  scroll({
    //لرفع الموشر الشريط الجانبي
    top: 0,
    behavior: "smooth",
  });
  showData();
}
///////////////////////////////////////////////////////////////////

//searsh
let searshMood = "title";
function getsearshMood(id) {
  let searsh = document.getElementById("searsh"); //نادينا مربع البحث
  if (id === "searshTitle") {
    searshMood = "title";
    // searsh.placeholder = "Searsh By Title البحث حسب العنوان";
  } else {
    searshMood = "category";
    // searsh.placeholder = "Searsh By Category البحث حسب الفئة";
  }
  searsh.placeholder = "Searsh By Title " + searshMood; //احتصار للصطرين السابقين المعلقين
  searsh.focus(); //عند الضغط على الي زرار افتح مربع البحث
  searsh.value = "";
  showData();
  ////////////////////
}

function searshData(value) {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    ///احتصار للوب الي معلقه داخل الشرط تحت
    if (searshMood == "title") {
      // for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
             <tr>
                       <td>${i}</td>
                       <td>${datapro[i].title}</td>
                       <td>${datapro[i].Price}</td>
                       <td>${datapro[i].taxes}</td>
                       <td>${datapro[i].ads}</td>
                       <td>${datapro[i].discount}</td>
                       <td>${datapro[i].Total}</td>
                       <td>${datapro[i].category}</td>
                       <td><button onclick ="Updatadet(${i})" id="Updata">Updata</button></td>
                       <td><button onclick ="deletdata(${i})" id="Delet">Delet</button></td>
   
                    </tr> `;
      }
      //}
    } else {
      ///اذا بحث بالفئة
      //for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
             <tr>
                       <td>${i}</td>
                       <td>${datapro[i].title}</td>
                       <td>${datapro[i].Price}</td>
                       <td>${datapro[i].taxes}</td>
                       <td>${datapro[i].ads}</td>
                       <td>${datapro[i].discount}</td>
                       <td>${datapro[i].Total}</td>
                       <td>${datapro[i].category}</td>
                       <td><button onclick ="Updatadet(${i})" id="Updata">Updata</button></td>
                       <td><button onclick ="deletdata(${i})" id="Delet">Delet</button></td>
   
                    </tr> `;
      }
      //}
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
