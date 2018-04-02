
$(document).ready(function() {

var sortFilter = localStorage.getItem("sort")

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

database = $.ajax({
        async: false,
        method: "GET",
        url: "test.json"
    });


function filterBy(filter) {
    JsontoHTML()
    for (let i=0; i < all_html.length; i++) {
        let c = hello2[i];
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
    for (let i = 0; i < hello2.length; i++) {
        c = hello2[i];
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

$("#Thriller").on("click", function() {
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
    localStorage.setItem("filter", "all")
})

$("#Alphabetical").click(function() {
    $("#sort-btn").text("Alphabetical")
    localStorage.setItem("sort", "azSort")
    console.log(localStorage.getItem("sort"))
    azSort(0)
    
})
$("#Reverse-Alphabetical").click(function() {
    $("#sort-btn").text("Alphabetical")
    azSort(1)
    localStorage.setItem("sort", "reverse-azSort")
    console.log(localStorage.getItem("sort"))
})
$("#Most-popular").click(function() {
    $("#sort-btn").text("Most Popular")
    voteSort(1)
    localStorage.setItem("sort", "most-popular")
    console.log(localStorage.getItem("sort"))
})
$("#Least-popular").click(function() {
    $("#sort-btn").text("Least-popular")
    voteSort(0)
    localStorage.setItem("sort", "Least-popular")
})
$("#Longest").click(function() {
    $("#sort-btn").text("Longest")
    if (sortFilter != "Longest") runtimeSort(1)
    localStorage.setItem("sort", "Longest")
    sortFilter = "Longest"
})
$("#Shortest").click(function() {
    $("#sort-btn").text("Shortest")
    if (sortFilter != "Shortest") runtimeSort(0)
    sortFilter = "Shortest"
})

let hello1 = database.responseText;
let hello2 = JSON.parse(hello1);

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
        $("#sort-btn").text("Longest") /////////////////////////////////////
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
        for (let i = 0; i < hello2.length; i++) {
            c = hello2[i];
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

function azSort(reverse) {
    currentItems()
    all_html.sort(function(a ,b) 
        {
            if(a.title < b.title) return -1;
            if(a.title > b.title) return 1;
            return 0;
        }
    )
    if (reverse === 1) all_html.reverse()
    itemtoHTML()
}

$("ul.items li").click(function() {
    thisTitle = $(this).attr("id")
    all_html.find("li#"+thisTitle)
    })
})