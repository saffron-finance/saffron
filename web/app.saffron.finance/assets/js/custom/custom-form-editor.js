/*
------------------------------------
    : Custom - Form Editors js :
------------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- Form Editors - Tinymce -- */
    if($("#tinymce-example").length > 0) {
        tinymce.init({
            selector: "textarea#tinymce-example",
            theme: "modern",
            height:320,
            plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality emoticons template paste textcolor"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
            style_formats: [
                {title: 'Bold text', inline: 'b'},
                {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
                {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
                {title: 'Example 1', inline: 'span', classes: 'example1'},
                {title: 'Example 2', inline: 'span', classes: 'example2'},
                {title: 'Table styles'},
                {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
            ]
        });
    }
    /* -- Form Editors - Summernote -- */
    $('#summernote').summernote({
        height: 320,
        minHeight: null,
        maxHeight: null,
        focus: true 
    });
    /* --  Form Editors - Code Mirror -- */
    CodeMirror.fromTextArea(document.getElementById("codemirror-html"), {
        mode: "htmlmixed",
        theme: "default",
        lineNumbers: true,
        tags: {
            style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
                    [null, null, "css"]],
            custom: [[null, null, "customMode"]]
          }
    });
    CodeMirror.fromTextArea(document.getElementById("codemirror-css"), {
        mode: "css",
        theme: "default",
        lineNumbers: true,
        extraKeys: {"Ctrl-Space": "autocomplete"}
    });
    CodeMirror.fromTextArea(document.getElementById("codemirror-javascript"), {
        mode: "javascript",
        theme: "default",
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: {"Ctrl-Q": "toggleComment"}
    });
});