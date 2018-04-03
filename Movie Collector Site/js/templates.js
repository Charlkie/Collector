const test_item_template = ({
    budget,
    genres,
    homepage,
    keywords,
    title,
    id,
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
