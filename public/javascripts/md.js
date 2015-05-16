/**
 * Created by zhoubinjia on 15/5/12.
 */

var converter = new Showdown.converter();

var $markdown_text = $(".markdown-text");
var $markdown_preview = $(".markdown-preview");

convert();

$markdown_text.on("input", function () {
    convert();
});

$markdown_text.on("scroll", function () {
    $markdown_preview.scrollTop($markdown_text.scrollTop())
});

function convert() {
    $markdown_preview.html(converter.makeHtml($markdown_text.val()));
}