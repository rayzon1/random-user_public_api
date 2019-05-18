const searchContainer = $('.search-container');
const randomUser = 'https://randomuser.me/api/?results=12&nat=us';

searchContainer.append(`<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`);

$(document).on('click', '.card', function () {
    const name = $(this)
                    .children()
                    .children()[1];

    let $modals = $('.modal-container');

    $($modals[0])
        .find('#modal-prev')
        .attr('disabled', true)
        .css('opacity', '0.2');

    $($modals[11])
        .find('#modal-next')
        .attr('disabled', true)
        .css('opacity', '0.2');

    for (let i = 0; i < $modals.length; i ++) {
        let chosen = $($modals[i]).children().children()[1];
        let chosen1 = $(chosen).children()[1];
        if ($(name).text() == $(chosen1).text()) {
            $($modals[i]).show();
        }
    }
});

$(document).on('click', '.modal-close-btn', function () {
    let parent = $(this).parent().parent();
    $(parent).hide();
})

$(document).on('click', '.modal-prev', function() {
    const $parent = $(this).parent().parent();
    $($parent).hide();
    $($parent).prev().show();
})

$(document).on('click', '.modal-next', function() {
    const $parent = $(this).parent().parent();
    $($parent).hide();
    $($parent).next().show();
})

$(document).on('mouseenter', '.card', function() {
    $(this)
        .css('box-shadow', '0 4px 8px 0 rgba(0,0,0,0.3),0 6px 20px 0 rgba(0,0,0,0.19)')
        .click(function(){$(this).css('box-shadow', '')})
})

$(document).on('mouseleave', '.card', function() {
    $(this).css('box-shadow', '')
})

const apiRequest = async (url) => {
    const val = await fetch(url);
    return await val.json();
}


apiRequest(randomUser)
    .then(val => {
        const direct = new EmployeeDirectory(val);
        direct.generateContainer();
        return val;
    })
    .catch(err => console.log(err))
    .then(val => {
        const overlay = new EmployeeOverlay(val);
        overlay.generateOverlay();
    })