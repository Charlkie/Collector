//function that takes the parameters budget and poster, which is then return a list item of the elemetn
const movie_item_template = ({
    title,
    poster,
}) => `
<li id=${title}>
    <div class="bg-img" style="background-image: url('${poster}')"></div>
    <a href="#">
        <div class="content">
            <h2>${title}</h2>
        </div>
    </a>
</li>
`
