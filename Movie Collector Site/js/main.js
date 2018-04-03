$(document).ready(function() {

// Set topnav and background colour variables
colour = "rgb(65, 65, 65)"
backgroundColor = "rgb(25,25,25)"

$(window).scroll(function(){                          
if ($(this).scrollTop() === 0) {
    $(".navbar").css("background", "rgb(0,0,0,0)")
    $(".navbar").css("box-shadow", "none")
} else {
    $('.navbar').fadeIn(5000);
    $(".navbar").css("background", colour)
    $(".navbar").css("box-shadow", "0px 5px 5px rgb(50,50,50)")
}
})

$(".blue").click(function() {
    colour = "rgb(0, 67, 87)"
    $("html, .filter-sort-bar").css("background", "rgb(0, 44, 58)")
    if ($(winodw).scrollTop() != 0) $(".navbar").css("background", colour)
    })
$(".dark").click(function() {
    colour = "rgb(65, 65, 65)"
    $("html, .filter-sort-bar").css("background", "rgb(25,25,25)")
    if ($(winodw).scrollTop() != 0) $("html, .filter-sort-bar").css("background", "rgb(25,25,25)")
}
)
$(".light").click(function() {
    colour = "rgb(120, 120, 120)"
    $("html, .filter-sort-bar").css("background", "rgb(150,150,150)")
    if ($(winodw).scrollTop() != 0) $(".navbar").css("background", colour)
})

database = $.ajax({
        async: false,
        method: "GET",
        url: "js/database.json"
    });


function filterBy(filter) {
    JsontoHTML()
    for (let i=0; i < all_html.length; i++) {
        let c = databaseObj[i];
        let genre = (JSON.parse(c["genres"]))
        for (let a=0; a < genre.length; a++){
            if (genre[a]["name"] === filter) {
                $(".items").append([all_html[i]].map(test_item_template).join(""));
            }
        }
    }
    storage()
}

function itemtoHTML() {
    for (let i=0; i < all_html.length; i++) {
        $(".items").append([all_html[i]].map(test_item_template).join(""));
    }
}

function JsontoHTML() {
    $("ul.items").empty()
    all_html = []
    for (let i = 0; i < databaseObj.length; i++) {
        c = databaseObj[i];
        let keywrd = (JSON.parse(c["keywords"]))
        kwrds = []
        for (let a=0; a < keywrd.length; a++) {
            kwrds.push(keywrd[a]["name"])
            }
        let test = new MovieInfo(c["budget"], c["genres"], c["homepage"], c["runtime"], c["vote_average"], 
                                    kwrds, c["title"], c["id"], c["image_url"],c["image_url1"], c["image_url2"], 
                                    c["overview"] )
        all_html.push(test)
        }
}

function allItems() {
    JsontoHTML()
    itemtoHTML()
}

$("#Thriller").click(function() {
    filterBy("Thriller")
    localStorage.setItem("filter", "Thriller")
})

$("#Adventure").click(function() {
    filterBy("Adventure")
    localStorage.setItem("filter", "Adventure")
})

$("#Comedy").click(function() {
    filterBy("Comedy")
    localStorage.setItem("filter", "Comedy")
})
$("#Animation").click(function() {
    filterBy("Animation")
    localStorage.setItem("filter", "Animation")
})

$(".all").click(function() {
    allItems()
    $("#sort-btn").text("Default")
    $("#genre-btn").text("all")
    localStorage.setItem("filter", "all")
    localStorage.setItem("sort", "all")
})

$("#Alphabetical").click(function() {
    $("#sort-btn").text("Alphabetical")
    azSort(0)
    localStorage.setItem("sort", "azSort")
})
$("#Reverse-Alphabetical").click(function() {
    $("#sort-btn").text("Reverse Alphabetical")
    azSort(1)
    localStorage.setItem("sort", "reverse-azSort")
})
$("#Most_popular").click(function() {
    $("#sort-btn").text("Most Popular")
    voteSort(1)
    localStorage.setItem("sort", "Most_popular")
})
$("#Least_popular").click(function() {
    $("#sort-btn").text("Least popular")
    voteSort(0)
    localStorage.setItem("sort", "Least_popular")
})
$("#Longest").click(function() {
    $("#sort-btn").text("Longest")
    // if (sortFilter != "Longest") 
    runtimeSort(1)
    localStorage.setItem("sort", "Longest")
    sortFilter = "Longest"
})
$("#Shortest").click(function() {
    $("#sort-btn").text("Shortest")
    if (sortFilter != "Shortest") runtimeSort(0)
    sortFilter = "Shortest"
})

let databaseText = database.responseText;
let databaseObj = JSON.parse(databaseText);

let filter = localStorage.getItem("filter")
let sort = localStorage.getItem("sort")

if (filter === null || filter === "all") {
    allItems()
    $("#genre-btn").text("all")
}else {
    filterBy(filter)
    $("#genre-btn").text(filter)
}

if (sort != null ) {
    if (sort === "Shortest") {
        runtimeSort(1)
        $("#sort-btn").text("Longest")
    }
    else if (sort === "Longest") {
        runtimeSort(0)
        $("#sort-btn").text("Shortest")
    }
    else if (sort === "azSort") {
        azSort(0)
        $("#sort-btn").text("Alphabetical")
    }
    else if (sort === "reverse-azSort") {
        azSort(1)
        $("#sort-btn").text("Reverse Alphabetical")
    }
    else if (sort === "Most_popular") {
        voteSort(0)
        $("#sort-btn").text("Most popular")
    }
    else if (sort === "Least_popular") {
        voteSort(1)
        $("#sort-btn").text("Least popular")
    }
    else if (sort === "all") {
        allItems()
        $("#sort-btn").text("Default")
    }
}
var sortFilter = localStorage.getItem("sort") //Default

function storage() {
    if (sortFilter != null ) {
        if (sortFilter === "Shortest") {
            runtimeSort(0)
            $("#sort-btn").text("Shortest")
        }
        else if (sortFilter === "Longest") {
            runtimeSort(1)
            $("#sort-btn").text("Longest")
        }
    }
}
$("#genre-drpdwn a").click(function() {
    let text = $(this).text()
    $("#genre-btn").text(text)
})
$("#sort-btn a").click(function() {
    let text = $(this).text()
    $("#sort-drpdwn").text(text)
})

function JsontoHTMLSort(array) {
    $("ul.items").empty()
    all_html = []
    for (let j=0; j < array.length; j++){
        for (let i = 0; i < databaseObj.length; i++) {
            c = databaseObj[i];
            if (c["title"] === array[j]) {
                let keywrd = (JSON.parse(c["keywords"]))
                kwrds = []
                for (let k=0; k < keywrd.length; k++) {
                    kwrds.push(keywrd[k]["name"])
                    }
                let test = new MovieInfo(c["budget"], c["genres"], c["homepage"], c["runtime"], c["vote_average"], 
                                            kwrds, c["title"], c["id"], c["image_url"],c["image_url1"], c["image_url2"], 
                                            c["overview"] )
                all_html.push(test)
            }
        }
    }
}

function currentItems() {
    children= []
        for (let i=1; i <$("ul.items").children().length+1; i++) {
            children.push($("ul.items li:nth-child("+i+")").find("h2").text())
        }
        $("ul.items").empty()
        JsontoHTMLSort(children)
}

function runtimeSort(reverse) {
    currentItems() 
    all_html.sort(function(a ,b) {return Number(a.runtime) - Number(b.runtime)})
    if (reverse === 1) {all_html.reverse()}
    itemtoHTML()
}

function voteSort(reverse) {
    currentItems()
    all_html.sort(function(a ,b) {return Number(a.vote_average) - Number(b.vote_average)})
    if (reverse === 1) all_html.reverse()
    itemtoHTML()
}
//the alphabetic and reverse alphabetic sort function
function azSort(reverse) {
    currentItems()
    //sort current items by looping through each element and seing 
    //whether the integer version of the string is greater than the next item.
    //if so it swaps the item, if the words are the same then they stay in the same place
    all_html.sort(function(a ,b) 
        {
            if(a.title < b.title) return -1;
            if(a.title > b.title) return 1;
            return 0;
        }
    )
    if (reverse === 1) all_html.reverse() //reverse string if the reverse argument is True
    itemtoHTML() //appends sorted items into unorderd items list 
}

//Opens the contact modal when message icon is clicked
$(".contact").click(function() {
    $('#Contact').modal('toggle');
})

//Whenver a list item is clicked, whether it is initially loaded or appended after sorting or filtering,
//it will open a modal with all the information from the json database using ajax.
$(document).on("click", "ul.items li",function(e) {
    e.preventDefault(); //prevents the default page reload of modals
    $('#myModal').modal('toggle'); // opens modal
    thisTitle = $(this).attr("id") // Finds the id(name) of element clicked
    movieNo = false 
    //Finds the item in the database by searching for which title matches the id of the clicked element
    for (let i=0; i < all_html.length; i++) {
        let obj = databaseObj[i];
        if (obj["title"].includes(thisTitle)) {
            movieNo = obj
        }
    }
    //adds text from the element in databse to modal
    $(".modal-title").text(movieNo["title"])
    $(".modal-body p").text(movieNo["overview"])
    $(".modal-body .release").text(movieNo["release_date"])
    $(".modal-body .budget").text("$"+movieNo["budget"])
    $(".modal-body .revenue").text("$"+movieNo["revenue"])
    $(".modal-body .homepage").text(movieNo["homepage"])
    $(".modal-body .homepage").attr("href", movieNo["homepage"])
    $(".modal-body .runtime").text(movieNo["runtime"])
    $(".modal-footer .tagline").text('"'+movieNo["tagline"]+'"')
    })
})