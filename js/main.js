$(document).on('click', '.card', function () {
    const name = $(this).children().children()[1];
    console.log($(name).text())
});