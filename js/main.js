
searchContainer.append(`<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`);



$(document).on('click', '.card', function () {
    const name = $(this).children().children()[1];

    let modals = $('.modal-container');

    for (let i = 0; i < modals.length; i ++) {
        let chosen = $(modals[i]).children().children()[1];
        let chosen1 = $(chosen).children()[1];
        if ($(name).text() == $(chosen1).text()) {
            $(modals[i]).removeAttr('hidden');
        }
    }
});

$(document).on('click', '.modal-close-btn', function () {
    let parent = $(this).parent().parent();
    $(parent).attr("hidden", true);
})