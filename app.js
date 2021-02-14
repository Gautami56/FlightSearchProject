let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let Flight = jsonData;
let dateObj = new Date();
let month = dateObj.getMonth();
let currMonth = dateObj.getMonth();
let year = dateObj.getFullYear();
let currYear = dateObj.getFullYear();
let tDate = dateObj;
let stayOpen = false;
let pickedDate = "";
let table = _("cal");
let cal = _("calender");
let xhr = new XMLHttpRequest();
let fromTo = "from";
let resultRangeArray = [];

_("month").innerHTML = months[month];
_("year").innerHTML = year;
_("prev").addEventListener("click", () => trackMonth("prev"));
_("next").addEventListener("click", () => trackMonth("next"));
_("one-way").addEventListener("click", () => toggleReturnBox("one-way"));
_("return").addEventListener("click", () => toggleReturnBox("return"));
_("flight-form").addEventListener("submit", onSubmit);
_("leave-date").addEventListener("focus", showCalender);
_("leave-date").addEventListener("blur", hideCalender);
_("return-date").addEventListener("focus", showCalender);
_("return-date").addEventListener("blur", hideCalender);
_("rangeValueSpan").addEventListener("change", rangeDisplay());

function _(id) {
  return document.getElementById(id);
}

function addZero(d) {
  if (d < 10) return "0" + d;
  return d;
}

function convertDate(d) {
  var ts = new Date(d).toString();
  ts = ts.substr(0, 15);
  return ts;
}

function onSubmit(e) {
  // on submitting to search oneway and return flights
  e.preventDefault();
  let form = this;
  let returnTrip = form.elements[0];
  let onewayTrip = form.elements[1];
  let departFrom = form.elements[2].value;
  let arrivingAt = form.elements[3].value;
  let leavingOn = form.elements[4].value;
  let returningOn = form.elements[5].value;
  let adults = form.elements[6].value;
  let children = form.elements[7].value;
  let sortedOneWayResult = [];
  let sortedReturnResult = [];
  let result = [];

  var Depart = convertDate(leavingOn);
  var Return = convertDate(returningOn);
  ////one way logic
  if (onewayTrip.checked === true || returnTrip.checked === true) {
    sortedOneWayResult = Flight.filter((value) => {
      if (
        value.from == departFrom &&
        value.to == arrivingAt &&
        value.deptDate == leavingOn
      ) {
        return {
          cost: value.cost,
          deptFrom: value.from,
          arriveAt: value.to,
          deptDate: value.deptDate,
          deptTime: value.deptTime,
          arriveTime: value.arriveTime,
        };
      }
    });
  }
  if (onewayTrip.checked === true && sortedOneWayResult.length > 0) {
    var div7 = document.querySelector("#parentDiv1");
    div7.innerHTML = ``;
    var div8 = document.querySelector("#div1234");
    div8.innerHTML = ``;
    var divelement1 = document.querySelector("#header1234");
    divelement1 = document.querySelector("h1");
    divelement1.innerHTML = ''
    divelement1.innerHTML = `<h1 class="heading">${departFrom} > ${arrivingAt}<div class="date"><h4 class="h3">Depart: ${Depart}</h4></div></h1>`;
    if (sortedOneWayResult.length > 0) {
      sortedOneWayResult.map((productItem) => {
        var div = document.getElementById("#parentDiv");
        div = document.querySelector("#div1234");
        div.innerHTML =
          div.innerHTML +
          ` 
          <div class='product'>
          <div class="product-tumb">
              <img src="images/dog-running.jpg" alt="" />
          </div>
          <div class="product-details">
          
          <h1>Rs.${productItem.cost}.00</h1>
         <div class="onewaydiv">
          <span>A1-202</span>
              <h4>${productItem.from}>${productItem.to}</h4>          
              <p> 
                  Depart: ${productItem.deptTime}<br/>
                  Arrive: ${productItem.arriveTime}
              </p>
              </div>
              
                  <div class="product-image">
              <img src="./ticket.jpg" alt=""width="150" height="95px" /><br />
              <button class= "buttonstyle">BOOK NOW</button>
              
          </div>
                 
              </div>
              <br />
          </div>
      </div>    
          `;
      });
    }
  }
  if (returnTrip.checked === true) {
    var div5 = document.querySelector("#parentDiv1");
    div5.innerHTML = ``;
    var div6 = document.querySelector("#div1234");
    div6.innerHTML = ``;

    sortedReturnResult = Flight.filter((value) => {
      if (
        returningOn &&
        value.deptDate == returningOn &&
        value.from == arrivingAt &&
        value.to == departFrom
      ) {
        return {
          cost: value.cost,
          returnDepartFrom: value.from,
          returnArriveTo: value.to,
          returnDate: value.deptDate,
          returnDeptTime: value.deptTime,
          returnArriveTime: value.arriveTime,
        };
      }
    });

    if (sortedOneWayResult.length > 0 && sortedReturnResult.length > 0) {
      result = sortedOneWayResult.flatMap((d) =>
        sortedReturnResult.map((v) => {
          return { d, v };
        })
      );
      resultRangeArray = result;
    }
    var divelement = document.getElementById("header1234");
    divelement = document.querySelector("h1");

    divelement.innerHTML = `<h1 class="heading">${departFrom} > ${arrivingAt} > ${departFrom}<div class="date"><h3 class="h3">Return: ${Return}</h3><h4 class="h3">Depart: ${Depart}</h4></div></h1>`;
    var div = document.getElementById("#parentDiv");
    div = document.querySelector("#div1234");

    if (result.length > 0) {
      result.map((productItem) => {
        div.innerHTML =
          div.innerHTML +
          `
      
        <div class='product'>
            <div class="product-tumb">
                <img src="images/dog-running.jpg" alt="" />
            </div>
            <div class="product-details">
            
            <h1>Rs.${productItem.d.cost}.00</h1>
           <div class="onewaydiv">
            <span>A1-202</span>
                <h4>${productItem.d.from}>${productItem.d.to}</h4>          
                <p> 
                    Depart: ${productItem.d.deptTime}<br/>
                    Arrive: ${productItem.d.arriveTime}
                </p>
                </div>
                <div class="returndiv">
                <span>A1-203</span>
                    <h4>${productItem.v.from}>${productItem.v.to}</h4>          
                    <p> 
                        Depart: ${productItem.v.deptTime}<br/>
                        Arrive: ${productItem.v.arriveTime}
                    </p>
                    </div>
                    <div class="product-image">
                <img src="./ticket.jpg" alt=""width="150" height="95px" /><br />
                <button class= "buttonstyle">BOOK NOW</button>
                
            </div>
                   
                </div>
                <br />
            </div>
        </div>`;
      });
    }
  }
}

function toggleReturnBox(btn) {
  let box1 = _("return-box");

  if (btn == "return") {
    box1.style.opacity = 1;
  }
  if (btn == "one-way") {
    box1.style.opacity = 0;
  }
}

function whichCityBox(ft) {
  fromTo = ft;
}

function addFromCity(o) {
  _("dep-from").value = o.innerText;
  _("depart-res").style.display = "none";
}

function addToCity(o) {
  _("dep-to").value = o.innerText;

  _("arrive-res").style.display = "none";
}

function positionCalender(box) {
  let boxPos = _("search-form").getBoundingClientRect(),
    leaveBoxPos = _("leave-date").getBoundingClientRect(),
    returnBoxPos = _("return-date").getBoundingClientRect(),
    leaveTopPos = leaveBoxPos.top - boxPos.top,
    leaveLeftPos = leaveBoxPos.left - boxPos.left,
    returnTopPos = returnBoxPos.top - boxPos.top,
    returnLeftPos = returnBoxPos.left - boxPos.left;

  if (box === "leave-date") {
    cal.style.top = leaveTopPos + 32 + "px";
    cal.style.left = leaveLeftPos + "px";
  } else if (box === "return-date") {
    cal.style.top = returnTopPos + 32 + "px";
    cal.style.left = returnLeftPos + "px";
  }
  if (box === "leave-date-hide") {
    cal.style.top = leaveTopPos + 32 + "px";
    cal.style.left = leaveLeftPos + "px";
  }
}

function showCalender() {
  cal.style.opacity = 1;
  cal.style.pointerEvents = "auto";
  stayOpen = true;
  pickedDate = this.id;
  positionCalender(pickedDate);
}

function hideCalender() {
  if (stayOpen) {
    cal.style.opacity = 0;
    pickedDate = this.id;
    positionCalender(`${pickedDate}-hide`);
  }
}

function getCellDate() {
  var tds = document.querySelectorAll("tbody td"),
    i;
  for (i = 0; i < tds.length; i++) {
    let btn = tds[i];
    btn.addEventListener("click", fetchDate);
  }
}

function fetchDate() {
  let td = this.getAttribute("data-date");
  if (pickedDate == "leave-date") {
    _("leave-date").setAttribute("value", td);
  }
  if (pickedDate == "return-date") {
    _("return-date").value = td;
  }
  stayOpen = false;
  hideCalender();
}

function trackMonth(dir) {
  if (dir == "prev") month -= 1;
  if (dir == "next") month += 1;
  if (month > 11) {
    month = 0;
    year += 1;
  }
  if (month < 0) {
    month = 11;
    year -= 1;
  }
  _("month").innerHTML = months[month];
  _("year").innerHTML = year;
  calender(month, year);
}

function rangeDisplay() {
  
  // display the search results based on the search slider
  var inputelement = document.getElementById("rangeValueSpan");
  var inputValue = inputelement.value;
  var resultFinalArray = [];
  inputelement = document.querySelector("#rangeV");

  inputelement.innerHTML = `<p class="inputValue">${inputValue}</p>`;
  if (resultRangeArray.length > 0) {
    resultFinalArray = resultRangeArray.filter((item) => {
      if (inputValue && item.d.cost == inputValue) {
        return item;
      }
    });

    if (resultFinalArray.length > 0) {
      var div2 = document.querySelector("#div1234");
      div2.innerHTML = ``;
      var div1 = document.getElementById("#parentDiv1");
      div1 = document.querySelector("#parentDiv1");
      div1.innerHTML = ``;
      resultFinalArray.map((productItem) => {
        div1.innerHTML =
          div1.innerHTML +
          `<div class='product'>
            <div class="product-tumb">
                <img src="images/dog-running.jpg" alt="" />
            </div>
            <div class="product-details">
            
            <h1>Rs.${productItem.d.cost}.00</h1>
           <div class="onewaydiv">
            <span>A1-202</span>
                <h4>${productItem.d.from}>${productItem.d.to}</h4>          
                <p> 
                    Depart: ${productItem.d.deptTime}<br/>
                    Arrive: ${productItem.d.arriveTime}
                </p>
                </div>
                <div class="returndiv">
                <span>A1-203</span>
                    <h4>${productItem.v.from}>${productItem.v.to}</h4>          
                    <p> 
                        Depart: ${productItem.v.deptTime}<br/>
                        Arrive: ${productItem.v.arriveTime}
                    </p>
                    </div>
                    <div class="product-image">
                <img src="./ticket.jpg" alt=""width="150" height="95px" /><br />
                <button class= "buttonstyle">BOOK NOW</button>
                
            </div>
                   
                </div>
                <br />
            </div>
        </div>`;
      });
    }
  }
}
function calender(month, year) {
  let today = dateObj.getDate();
  let firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var monthLength = new Date(year, month + 1, 0).getDate();
  let html = "";
  let dd;

  // DAYS OF WEEK HEADER
  html += "<tr>";
  for (let i = 0; i < weekDays.length; i++) {
    html += "<td>" + weekDays[i] + "</td>";
  }
  html += "</tr>";

  // CALENDAR PART
  var count = 0; // count of table's <td> cells
  if (startDay !== 0) {
    // Leave these cells blank
    html += "<tr><td colspan='" + startDay + "'></td>";
    count = startDay;
  }
  for (var day = 1; day <= monthLength; day++) {
    if (count % 7 === 0) {
      // new table row
      html += "<tr>";
    }

    dd = addZero(year) + "/" + addZero(month + 1) + "/" + day;

    if ((count < today && month == currMonth) || year < currYear) {
      html += "<td class='closed' data-date=" + dd + ">" + day + "</td>";
    } else {
      html += "<td class='normal' data-date=" + dd + ">" + day + "</td>";
    }

    count++;
    if (count % 7 === 0) {
      html += "</tr>";
    }
  }
  var blankCells = 7 - (count % 7);
  if (blankCells < 7) {
    html += "<td colspan='" + blankCells + "'></td></tr>";
  }

  table.innerHTML = html;

  getCellDate();
}

calender(month, year);
positionCalender("leave-date");