const test_item_template = ({
    budget,
    genres,
    homepage,
    keywords,
    title,
    id,
    poster,
    poster1,
    poster2
}) => `
<li id=${title}>
    <div class="bg-img" style="background-image: url('${poster}'), url('${poster1}'), url('${poster2}') ;"></div>
    <a href="#">
        <div class="content">
            <h2>${title}</h2>
        </div>
    </a>
</li>
`
// const modal_template = ({
//     budget,
//     genres,
//     homepage,
//     keywords,
//     title,
//     id,
//     poster,
//     poster1,
//     poster2,
//     overview
// }) => `
// <div id="myModal" class="modal" tabindex="-1" role="dialog">
//     <div class="modal-dialog" role="document">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h5 class="modal-title">${title}</h5>
//                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                 </button>
//                 </div>
//                 <div class="modal-body">
//                     <p>${overview}</p>
//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-primary">Save changes</button>
//                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </body>
// `
