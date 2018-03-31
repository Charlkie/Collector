
$(document).ready(function() {

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

let hello1 = database.responseText;
let hello2 = JSON.parse(hello1);

let filter = localStorage.getItem("filter")
if (filter === null || filter === "all") {
    allItems()
    $("#genre-btn").text("all")
}else {
    filterBy(filter)
    $("#genre-btn").text(filter)
}

$("#genre-drpdwn a").click(function() {
    let text = $(this).text()
    $("#genre-btn").text(text)
})
$("#sort-btn a").click(function() {
    let text = $(this).text()
    $("#sort-drpdwn").text(text)
})

$("#Alphabetical").click(function() {
    let text = $(this).text()
    $("#sort-btn").text(text)
    allItems()
})

// $("#Runtime").click(function() {
//     $("ul.items").empty()
//     let text = $(this).text()
//     $("#sort-btn").text(text)
//     let databaseObj = database.responseText
//     databaseObj = JSON.parse(databaseObj)
//     obj = []
//     for (let i = 0; i < databaseObj.length; i++) {
//         obj.push(databaseObj[i])
//     }
//     console.log(obj)
//     obj.sort(function(a ,b) 
//         {
//             console.log("a:", a.budget)
//             console.log("b:", b.budget)
//             return Number(a.budget) - Number(b.budget)
//         }
//     )
//     for (let i=0; i < obj.length; i++) {
//         $(".items").append([obj[i]].map(test_item_template).join(""));
//     }
// })

function convertDate(stringdate)
{
    // Internet Explorer does not like dashes in dates when converting, 
    // so lets use a regular expression to get the year, month, and day 
    var DateRegex = /([^-]*)-([^-]*)-([^-]*)/;
    var DateRegexResult = stringdate.match(DateRegex);
    var DateResult;
    var StringDateResult = "";

    // try creating a new date in a format that both Firefox and Internet Explorer understand
    try
    {
        DateResult = new Date(DateRegexResult[2]+"/"+DateRegexResult[3]+"/"+DateRegexResult[1]);
    } 
    // if there is an error, catch it and try to set the date result using a simple conversion
    catch(err) 
    { 
        DateResult = new Date(stringdate);
    }

    // format the date properly for viewing
    StringDateResult = (DateResult.getMonth()+1)+"/"+(DateResult.getDate()+1)+"/"+(DateResult.getFullYear());
    console.log(StringDateResult);

    return StringDateResult;
}

// working
// $("#Runtime").click(function() {
//     $("ul.items").empty()
//     JsontoHTML()
//     all_html.sort(function(a ,b) 
//         {
//             console.log("a:", a.budget)
//             console.log("b:", b.budget)
//             return Number(a.budget) - Number(b.budget)
//         }
//     )
//     itemtoHTML()
// })


//Testing

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

$("#Runtime").click(function() {
    children= []
    for (let i=1; i <$("ul.items").children().length+1; i++) {
        children.push($("ul.items li:nth-child("+i+")").find("h2").text())
    }
    $("ul.items").empty()
    console.log(children)
    JsontoHTMLSort(children)
    all_html.sort(function(a ,b) 
        {
            console.log("a:", a.runtime)
            console.log("b:", b.runtime)
            return Number(a.runtime) - Number(b.runtime)
        }
    )
    itemtoHTML()
})

//End of Testing


$("#Popularity").click(function() {
    $("ul.items").empty()
    JsontoHTML()
    all_html.sort(function(a ,b) 
        {
            console.log("a:", a.vote_average)
            console.log("b:", b.vote_average)
            return Number(a.vote_average) - Number(b.vote_average)
        }
    )
    all_html.reverse()
    itemtoHTML()
})

// $("#Newest").click(function() {
//     $("ul.items").empty()
//     JsontoHTML()
    
//     all_html.sort(function(a ,b) 
//         {
//             let one = convertDate(String(a.release_date))
//             let two = convertDate(String(b.release_date))
//             console.log("a:", one)
//             console.log("b:", two)
//             return Number(one) - Number(two)
//         }
//     )
//     itemtoHTML()
// })

$("ul.items li").click(function() {
    thisTitle = $(this).attr("id")
    all_html.find("li#"+thisTitle)
    })
    
    // $('#myModal').modal('toggle');


})

