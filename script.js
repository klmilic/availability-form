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
    let boxes = document.getElementById(table).getElementsByTagName('input');
    if (checkbox.checked == true) {
        for (var node of boxes) {
            node.checked = true;
        }
    } else {
        for (var node of boxes) {
            node.checked = false;
        }
    }
}
