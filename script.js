function addTimeBlock(day) {
    let end = day.length
    let begin = end - 5;
    let str = "clone_" + day.slice(begin, end);
    let extraBlock = document.getElementsByClassName(str)[0];
    let clone = extraBlock.cloneNode(true);
    clone.style.display = "flex";
    let childNodes = document.getElementById(day).getElementsByTagName('*');
        for (var node of childNodes) {
            if (node.classList.contains('add-timeslot') || node.classList.contains('remove-timeslot')) {
                node.style.pointerEvents = 'auto';
        }
    document.getElementById(day).appendChild(clone);
        
    $(document).ready(function(){

        $('.time').timepicker({
            minTime: '5:00am',
            maxTime: '11:00pm',
            step: 15,
            forceRoundTime: true
        });
    });
}
}

function hideTimeBlock(day) {
    let select = document.getElementById(day);
    if (select.childElementCount > 1) {
        select.removeChild(select.lastChild);
    }
}


function disableDiv(day) {
    let str = "#" + day + " .time";
    let check = document.querySelectorAll(str);
    if (check[0].disabled == true) {
        let childNodes = document.getElementById(day).getElementsByTagName('*');
        for (var node of childNodes) {
            if (node.classList.contains('add-timeslot') || node.classList.contains('remove-timeslot')) {
                node.style.pointerEvents = 'auto';
            }
            node.disabled = false;
        }
    } else {
        let childNodes = document.getElementById(day).getElementsByTagName('*');
        for (var node of childNodes) {
            if (node.classList.contains('add-timeslot') || node.classList.contains('remove-timeslot')) {
                node.style.pointerEvents = 'none';
            }
        node.disabled = true;
        }
      }
}

function checkAll(table, check) {
    let checkbox = document.getElementById(check);
    let tableStr = "#" + table;
    let boxes = document.querySelectorAll(tableStr + " input[type='checkbox']");
    if (checkbox.checked == true) {
        for (let i=0; i<boxes.length; i++) {
            boxes[i].checked = true;
        }
    } else {
        for (let i=0; i<boxes.length; i++) {
            boxes[i].checked = false;
        }
    }
}

function getDates() {
    const janDates = $('#jan').multiDatesPicker( "getDates" );
    const febDates = $('#feb').multiDatesPicker( "getDates" );
    const marDates = $('#mar').multiDatesPicker( "getDates" );
    const allDates = janDates;
    for (let i=0; i<febDates.length; i++) {
        allDates.push(febDates[i]);
    }
    for (let i=0; i<marDates.length; i++) {
        allDates.push(marDates[i]);
    }
    const daysOff = document.getElementById("daysOff");
    const str = allDates.toString();
    const ans = str.replaceAll(',', '\n');
    daysOff.value = ans;
}

function getTimes() {
    // Get header names (by id) for each day
    const idsSet1 = ['monSet1', 'tueSet1', 'wedSet1', 'thuSet1', 'friSet1', 'satSet1', 'sunSet1']
    const idsSet2 = ['monSet2', 'tueSet2', 'wedSet2', 'thuSet2', 'friSet2', 'satSet2', 'sunSet2']

    // Get time values for set 1
    let set1 = document.querySelectorAll('#set1 .day');
    for(let i=0; i<set1.length; i++) {
        let str = "";
        const times = set1[i].getElementsByClassName('time');
        for(let j=0; j<times.length; j++) {
            if (j%2 == 0 && times[j].value != "") {
                str += times[j].value + "-";
            } else if (j!=times.length-1) {
                str += times[j].value + "\n";
            } else {
                str += times[j].value;
            }
        }
        // Get header div and reassign name to new value
        const header = document.getElementById(idsSet1[i]);
        header.value = str;
    }
    
    // Get time values for set 2
    let set2 = document.querySelectorAll('#set2 .day');
    for(let i=0; i<set2.length; i++) {
        let str = "";
        const times = set2[i].getElementsByClassName('time');
        for(let j=0; j<times.length; j++) {
            if (j%2 == 0 && times[j].value != "") {
                str += times[j].value + "-";
            } else if (j!=times.length-1) {
                str += times[j].value + "\n";
            } else {
                str += times[j].value;
            }
        }
        // Get header div and reassign name to new value
        const header = document.getElementById(idsSet2[i]);
        header.value = str;
    }
}

function getComments() {
    const textarea = document.getElementById('textarea');
    const comments = document.getElementById('comments');
    comments.value = textarea.value;
}

function getLessonSets() {
    // Format PSLC selected lesson sets (more than 0 but less than all)
    let strPSLC = "PSLC\n";
    let countPSLC = 0;
    const lessonsPSLC = document.querySelectorAll("#pslc_lessons input[type='checkbox']");
    for(let i=1; i<lessonsPSLC.length; i++) {
        const checkbox = lessonsPSLC[i];
        if (checkbox.checked == true) {
            strPSLC += checkbox.value + "\n";
            countPSLC ++;
        }
    }
    if (countPSLC == 0) {
        strPSLC = "";
    } else if (countPSLC == 10) {
        strPSLC = "PSLC\nall\n";
    }
    // Format CCAC selected lesson sets
    let strCCAC = "\nCCAC\n";
    if (strPSLC == "") {
        strCCAC = "CCAC\n";
    }
    const lessonsCCAC = document.querySelectorAll("#ccac_lessons input[type='checkbox']");
    let countCCAC = 0;
    for (let i=1; i<lessonsCCAC.length; i++) {
        const checkbox = lessonsCCAC[i];
        if (checkbox.checked) {
            strCCAC += checkbox.value + "\n";
            countCCAC ++;
        }
    }
    if (countCCAC == 0) {
        strCCAC = "";
    } else if (countCCAC == 9 && strPSLC == "") {
        strCCAC = "CCAC\nall";
    } else if (countCCAC == 9) {
        strCCAC = "\nCCAC\nall";
    }
    // Add PSLC + CCAC into one cell value, remove empty last line
    const lessonSets = document.getElementById('lessonSets');
    const str = strPSLC + strCCAC;
    const trimStr = str.replace(/\n$/, '');
    lessonSets.value = trimStr;
}

function getQualifications() {
    const lsi = document.getElementById('lsi');
    const sal = document.getElementById('sal');
    const qualifications = document.getElementById('qualifications');
    let str = "";
    if (lsi.checked == true) {
        str += lsi.value + "\n";
    } 
    if (sal.checked == true) {
        str += sal.value;
    }
    const trimStr = str.replace(/\n$/, '');
    qualifications.value = trimStr;
}

function getStudents() {
    const days = document.querySelectorAll("#studentShifts input[type='checkbox']");
    const studentHeader = document.getElementById('student');
    let strStudent = "";
    for (let i=0; i<days.length; i++) {
        const checkbox = days[i];
        if (checkbox.checked == true) {
            strStudent += checkbox.value + "\n";
        }
    }
    const trimStr = strStudent.replace(/\n$/, '');
    console.log(trimStr);
    studentHeader.value = trimStr;
}

function formatValues() {
    getDates();
    getTimes();
    getComments();
    getLessonSets();
    getQualifications();
    getStudents();
}

window.addEventListener("load", function() {
    const form = document.getElementById('form');
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = e.target.action;
      fetch(action, {
        method: 'POST',
        body: data,
      })
      .then(() => {
        window.location.href = "confirmation.html";
      })
    });
  });
  

