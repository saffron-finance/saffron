/*
------------------------------------
    : Custom - Sweet Alerts js :
------------------------------------
*/
(function ($) {
    'use strict';
        /* -- Sweet Alert - Basic -- */
        $("body").on("click", "#sa-basic", function() {      
            swal("Here's a message!")
        });
        /* -- Sweet Alert - Title -- */
        $("body").on("click", "#sa-title", function() {    
            swal(
                'The Olian?',
                'That thing is still around?',
                'question'
                )
        });
        /* -- Sweet Alert - Success -- */
        $("body").on("click", "#sa-success", function() {      
            swal(
            {
                title: 'Nice Work!',
                text: 'You clicked the below button!',
                type: 'success',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10'
            }
            )
        });
        /* -- Sweet Alert - Warning -- */
        $("body").on("click", "#sa-warning", function() {      
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10',
                confirmButtonText: 'Yes, delete it!'
            }).then(function () {
                swal(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                    )
            })
        });
        /* -- Sweet Alert - Parameter -- */
        $("body").on("click", "#sa-params", function() {      
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10',
                buttonsStyling: false
            }).then(function () {
                swal(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                    )
            }, function (dismiss) {
                if (dismiss === 'cancel') {
                    swal(
                        'Cancelled',
                        'Your imaginary data is safe :)',
                        'error'
                        )
                }
            })
        });
        /* -- Sweet Alert - Image -- */
        $("body").on("click", "#sa-image", function() {      
            swal({
                title: 'Sweet!',
                text: 'Modal with a custom images',
                imageHeight: 30,
                animation: false
            })
        });
        /* -- Sweet Alert - Auto Close Timer -- */
        $("body").on("click", "#sa-auto-close", function() {      
            swal({
                title: 'Auto close alert!',
                text: 'I will close in 2 seconds.',
                timer: 2000
            }).then(
            function () {
            },
            function (dismiss) {
                if (dismiss === 'timer') {
                    
                }
            }
            )
        });
        /* -- Sweet Alert - Custom HTML -- */
        $("body").on("click", "#custom-html", function() {      
            swal({
                title: '<i>HTML</i> <u>example</u>',
                type: 'info',
                html: 'You can use <b>bold text</b>, ' +
                '<a href="#">Click here </a> ' +
                'and other HTML tags',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10',
                confirmButtonText: '<i class="feather icon-thumbs-up"></i> Great!',
                cancelButtonText: '<i class="feather icon-thumbs-down"></i>'
            })
        });
        /* -- Sweet Alert - Custom Padding Width -- */
        $("body").on("click", "#custom-padding-width", function() {      
            swal({
                title: 'Custom width, padding, background.',
                width: 600,
                padding: 100,
                background: '#fff url(./assets/images/ui-alert/sweet-alert-bg.png)'
            })
        });
        /* -- Sweet Alert - Ajax -- */
        $("body").on("click", "#sa-ajax", function() {      
            swal({
                title: 'Submit email to run ajax request',
                input: 'email',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10',
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'websbooster@gmail.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 2000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                swal({
                    type: 'success',
                    title: 'Ajax request has been finished!',
                    html: 'Submitted email: ' + email
                })
            })
        });
        /* -- Sweet Alert - Chaining Modal -- */
        $("body").on("click", "#sa-chaining", function() {      
            swal.setDefaults({
                input: 'text',
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                animation: false,
                progressSteps: ['1', '2', '3']
            })
            var steps = [
            {
                title: 'Question 1',
                text: 'Chaining swal2 modals is easy'
            },
            'Question 2',
            'Question 3'
            ]
            swal.queue(steps).then(function (result) {
                swal.resetDefaults()
                swal({
                    title: 'All done!',
                    html: 'Your answers: <pre>' +
                    JSON.stringify(result) +
                    '</pre>',
                    confirmButtonText: 'Lovely!',
                    showCancelButton: false
                })
            }, function () {
                swal.resetDefaults()
            })
        });
        /* -- Sweet Alert - Dynamic -- */
        $("body").on("click", "#sa-dynamic", function() {      
            swal.queue([{
                title: 'Your public IP',
                confirmButtonText: 'Show my public IP',
                text: 'Your public IP will be received ' +
                'via AJAX request',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    return new Promise(function (resolve) {
                        $.get('https://api.ipify.org?format=json')
                        .done(function (data) {
                            swal.insertQueueStep(data.ip)
                            resolve()
                        })
                    })
                }
            }])
        });
})(jQuery)