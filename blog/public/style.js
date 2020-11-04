search_items = () => {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName('box');
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none"
        } else {
            x[i].style.display = "list-item";
        }
    }
}
function openNav() {
  document.getElementById("mySidenav").style.width = "350px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

