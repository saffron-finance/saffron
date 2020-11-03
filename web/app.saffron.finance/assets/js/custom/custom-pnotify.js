/*
-------------------------------
    : Custom - Pnotify js :
-------------------------------
*/
"use strict";
$(document).ready(function() {
    $('#pnotify-primary').on('click', function() {
        new PNotify( {
            title: 'Primary notice', text: 'Check me out! I\'m a notice.', type: 'primary'
        });
    });
    $('#pnotify-success').on('click', function() {
        new PNotify( {
            title: 'Success notice', text: 'Check me out! I\'m a notice.', type: 'success'
        });
    });
    $('#pnotify-info').on('click', function() {
        new PNotify( {
            title: 'Info notice', text: 'Check me out! I\'m a notice.', type: 'info'
        });
    });
    $('#pnotify-danger').on('click', function() {
        new PNotify( {
            title: 'Danger notice', text: 'Check me out! I\'m a notice.', type: 'error'
        });
    });
    /* -- Desktop Notice -- */
    $('#pnotify-desktop-primary').on('click', function() {
        PNotify.desktop.permission();
        (new PNotify( {
            title:'Primary Desktop Notice', type:'primary', text:'I\'m a primay desktop notification, if you have given me a permission.', desktop: {
                desktop: true, icon: 'assets/images/pnotify/primary.png'
            }
        }
        )).get().click(function(e) {
            if($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target))return;
            alert('Hey! You clicked the desktop notification!');
        });
    });
    $('#pnotify-desktop-success').on('click', function() {
        PNotify.desktop.permission();
        (new PNotify( {
            title:'Success Desktop Notice', type:'success', text:'I\'m a success desktop notification, if you have given me a permission.', desktop: {
                desktop: true, icon: 'assets/images/pnotify/success.png'
            }
        }
        )).get().click(function(e) {
            if($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target))return;
            alert('Hey! You clicked the desktop notification!');
        });
    });
    $('#pnotify-desktop-danger').on('click', function() {
        PNotify.desktop.permission();
        (new PNotify( {
            title:'Danger Desktop Notice', type:'error', text:'I\'m a danger desktop notification, if you have given me a permission.', desktop: {
                desktop: true, icon: 'assets/images/pnotify/danger.png'
            }
        }
        )).get().click(function(e) {
            if($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target))return;
            alert('Hey! You clicked the desktop notification!');
        });
    });    
    $('#pnotify-desktop-info').on('click', function() {
        PNotify.desktop.permission();
        (new PNotify( {
            title:'Info Desktop Notice', type:'info', text:'I\'m an info desktop notification, if you have given me a permission.', desktop: {
                desktop: true, icon: 'assets/images/pnotify/notice.png'
            }
        }
        )).get().click(function(e) {
            if($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target))return;
            alert('Hey! You clicked the desktop notification!');
        });
    });
    $('#pnotify-desktop-warning').on('click', function() {
        PNotify.desktop.permission();
        (new PNotify( {
            title:'Warning Desktop Notice', type:'warning', text:'I\'m a warning desktop notification, if you have given me a permission.', desktop: {
                desktop: true, icon: 'assets/images/pnotify/warning.png'
            }
        }
        )).get().click(function(e) {
            if($('.ui-pnotify-closer, .ui-pnotify-sticker, .ui-pnotify-closer *, .ui-pnotify-sticker *').is(e.target))return;
            alert('Hey! You clicked the desktop notification!');
        });
    });
    $('#pnotify-translucent').on('click', function() {
        new PNotify({
            title: 'See Through Notice',
            text: 'No one ever pays attention to me. Why should they? I\'m practically invisible.',
            addclass: 'translucent'
        });
        var source_note = 'translucent is a custom class defined (using ui-pnotify-fade-in) with opacity: 0.8.';
    });
    $('#pnotify-no-shadow-notice').on('click', function() {
        new PNotify({
            title: 'No Shadow Notice',
            text: 'I don\'t have a shadow. (It\'s cause I\'m a vampire or something. Or is that reflections...)',
            shadow: false
        });
    });
    $('#pnotify-simple').on('click', function() {
        new PNotify('Check me out! I\'m a notice.');
    });
    $('#pnotify-number').on('click', function() {
        new PNotify(Math.round(Math.random() * 9999));
    });
    $('#pnotify-no-mouse-reset').on('click', function() {
        new PNotify({
            title: 'No Mouse Reset Notice',
            text: 'I don\'t care if you move your mouse over me, I\'ll disappear when I want.',
            mouse_reset: false
        });
    });
    $('#pnotify-fast-fading').on('click', function() {
        new PNotify({
            title: 'Fast Fading Notice',
            text: 'I fade in and out really quickly.',
            animate_speed: 'fast'
        });
    });
    $('#pnotify-no-effect').on('click', function() {
        new PNotify({
            title: 'No Effect Notice',
            text: 'I don\'t even bother to animate. I\'m too cool for that.',
            animation: 'none'
        });
    });
    $('#pnotify-forms').on('click', function() {
        var notice = new PNotify({
            text: $('#form_notice').html(),
            icon: false,
            width: 'auto',
            hide: false,
            buttons: {
                closer: false,
                sticker: false
            },
            insert_brs: false
        });
        notice.get().find('form.pf-form').on('click', '[name=cancel]', function() {
            notice.remove();
        }).submit(function() {
            var username = $(this).find('input[name=username]').val();
            if (!username) {
                alert('Please provide a username.');
                return false;
            }
            notice.update({
                title: 'Welcome',
                text: 'Successfully logged in as ' + username,
                icon: true,
                width: PNotify.prototype.options.width,
                hide: true,
                buttons: {
                    closer: true,
                    sticker: true
                },
                type: 'success'
            });
            return false;
        });
    });
    $('#pnotify-click-on-it').on('click', function() {
        var notice = new PNotify({
            title: 'Click Notice',
            text: 'I wish someone would click me.'
        });
        notice.get().css('cursor', 'pointer').click(function(e) {
            if ($(e.target).is('.ui-pnotify-closer *, .ui-pnotify-sticker *')) return;
            notice.update({
                type: 'success',
                text: 'Yay, you clicked me!<div style="text-align: center;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Happy_smiley_face.png/240px-Happy_smiley_face.png" /></div>'
            });
        });
    });
    $('#pnotify-click-to-close').on('click', function() {
        var notice = new PNotify({
            title: 'Click Close Notice',
            text: 'Click me anywhere to dismiss me.',
            buttons: {
                closer: false,
                sticker: false
            }
        });
        notice.get().click(function() {
            notice.remove();
        });
    });
    $('#pnotify-huge').on('click', function() {
        new PNotify({
            title: 'Big Notice',
            text: 'Check me out! I\'m tall and wide, even though my text isn\'t.',
            width: '500px',
            min_height: '400px'
        });
    });
    function show_rich() {
        new PNotify({
            title: '<span style="color: green;">Rich Content Notice</span>',
            text: '<span style="color: blue;">Look at my beautiful <strong>strong</strong>, <em>emphasized</em>, and <span style="font-size: 1.5em;">large</span> text.</span>'
        });
    }
    $('#pnotify-rich-text').on('click', function() {
        show_rich();
    });
    $('#pnotify-keep-it-safe').on('click', function() {
        new PNotify({
            title: '<em>Escaped Notice</em>',
            title_escape: true,
            text: $('#evil_html').html(),
            text_escape: true
        });
    });
    function dyn_notice() {
        var percent = 0;
        var notice = new PNotify({
            text: "Please Wait",
            type: 'info',
            icon: 'fa fa-spinner fa-spin',
            hide: false,
            buttons: {
                closer: false,
                sticker: false
            },
            shadow: false,
            width: "170px"
        });
        setTimeout(function() {
            notice.update({
                title: false
            });
            var interval = setInterval(function() {
                percent += 2;
                var options = {
                    text: percent + "% complete."
                };
                if (percent == 80) options.title = "Almost There";
                if (percent >= 100) {
                    window.clearInterval(interval);
                    options.title = "Done!";
                    options.type = "success";
                    options.hide = true;
                    options.buttons = {
                        closer: true,
                        sticker: true
                    };
                    options.icon = 'fa fa-check';
                    options.shadow = true;
                    options.width = PNotify.prototype.options.width;
                }
                notice.update(options);
            }, 120);
        }, 2000);
    }
    $('#pnotify-dynamic').on('click', function() {
        dyn_notice();
    });
    $('#pnotify-custom-styles').on('click', function() {
        new PNotify({
            title: 'Custom Styling',
            text: 'I have an additional class that\'s used to give me special styling. I always wanted to be pretty. I also use the nonblock module.',
            addclass: 'custom',
            icon: 'fa fa-file-image-o',
            nonblock: {
                nonblock: true
            }
        });
    });
    $('#pnotify-confirm-dialog').on('click', function() {
        (new PNotify({
            title: 'Confirmation Needed',
            text: 'Are you sure?',
            icon: 'glyphicon glyphicon-question-sign',
            hide: false,
            confirm: {
                confirm: true
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            }
        })).get().on('pnotify.confirm', function() {
            alert('Ok, cool.');
        }).on('pnotify.cancel', function() {
            alert('Oh ok. Chicken, I see.');
        });
    });
    $('#pnotify-modal-confirm-dialog').on('click', function() {
        (new PNotify({
            title: 'Confirmation Needed',
            text: 'Are you sure?',
            icon: 'glyphicon glyphicon-question-sign',
            hide: false,
            confirm: {
                confirm: true
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            },
            addclass: 'stack-modal',
            stack: {
                'dir1': 'down',
                'dir2': 'right',
                'modal': true
            }
        })).get().on('pnotify.confirm', function() {
            alert('Ok, cool.');
        }).on('pnotify.cancel', function() {
            alert('Oh ok. Chicken, I see.');
        });
    });
    $('#pnotify-custom-button').on('click', function() {
        new PNotify({
            title: 'Choose a Side',
            text: 'You have three options to choose from.',
            icon: 'glyphicon glyphicon-question-sign',
            hide: false,
            confirm: {
                confirm: true,
                buttons: [{
                    text: 'Fries',
                    addClass: 'btn-primary',
                    click: function(notice) {
                        notice.update({
                            title: 'You\'ve Chosen a Side',
                            text: 'You want fries.',
                            icon: true,
                            type: 'info',
                            hide: true,
                            confirm: {
                                confirm: false
                            },
                            buttons: {
                                closer: true,
                                sticker: true
                            }
                        });
                    }
                }, {
                    text: 'Mash',
                    click: function(notice) {
                        notice.update({
                            title: 'You\'ve Chosen a Side',
                            text: 'You want mashed potatoes.',
                            icon: true,
                            type: 'info',
                            hide: true,
                            confirm: {
                                confirm: false
                            },
                            buttons: {
                                closer: true,
                                sticker: true
                            }
                        });
                    }
                }, {
                    text: 'Fruit',
                    click: function(notice) {
                        notice.update({
                            title: 'You\'ve Chosen a Side',
                            text: 'You want fruit.',
                            icon: true,
                            type: 'info',
                            hide: true,
                            confirm: {
                                confirm: false
                            },
                            buttons: {
                                closer: true,
                                sticker: true
                            }
                        });
                    }
                }]
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            }
        });
    });
    $('#pnotify-alert-style-button').on('click', function() {
        new PNotify({
            title: 'You Will Receive a Side',
            text: 'You have no choice.',
            icon: 'glyphicon glyphicon-info-sign',
            hide: false,
            confirm: {
                confirm: true,
                buttons: [{
                    text: 'Ok',
                    addClass: 'btn-primary',
                    click: function(notice) {
                        notice.remove();
                    }
                },
                null]
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            }
        });
    });
    $('#pnotify-prompt-dialog').on('click', function() {
        (new PNotify({
            title: 'Input Needed',
            text: 'What side would you like?',
            icon: 'glyphicon glyphicon-question-sign',
            hide: false,
            confirm: {
                prompt: true
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            }
        })).get().on('pnotify.confirm', function(e, notice, val) {
            notice.cancelRemove().update({
                title: 'You\'ve Chosen a Side',
                text: 'You want ' + $('<div/>').text(val).html() + '.',
                icon: true,
                type: 'info',
                hide: true,
                confirm: {
                    prompt: false
                },
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        }).on('pnotify.cancel', function(e, notice) {
            notice.cancelRemove().update({
                title: 'You Don\'t Want a Side',
                text: 'No soup for you!',
                icon: true,
                type: 'info',
                hide: true,
                confirm: {
                    prompt: false
                },
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        });        
    });
    $('#pnotify-multi-line-prompt-dialog').on('click', function() {
        (new PNotify({
            title: 'Input Needed',
            text: 'Write me a poem, please.',
            icon: 'glyphicon glyphicon-question-sign',
            hide: false,
            confirm: {
                prompt: true,
                prompt_multi_line: true,
                prompt_default: 'Roses are red,\nViolets are blue,\n'
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            }
        })).get().on('pnotify.confirm', function(e, notice, val) {
            notice.cancelRemove().update({
                title: 'Your Poem',
                text: $('<div/>').text(val).html(),
                icon: true,
                type: 'info',
                hide: true,
                confirm: {
                    prompt: false
                },
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        }).on('pnotify.cancel', function(e, notice) {
            notice.cancelRemove().update({
                title: 'You Don\'t Like Poetry',
                text: 'Roses are dead,\nViolets are dead,\nI suck at gardening.',
                icon: true,
                type: 'info',
                hide: true,
                confirm: {
                    prompt: false
                },
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        });        
    });
    $('#pnotify-notice-with-callback').on('click', function() {
        var dont_alert = function() {};
        new PNotify({
            title: 'I\'m Here',
            text: 'I have a callback for each of my events. I\'ll call all my callbacks while I change states.',
            before_init: function(opts) {
                alert('I\'m called before the notice initializes. I\'m passed the options used to make the notice. I can modify them. Watch me replace the word callback with tire iron!');
                opts.text = opts.text.replace(/callback/g, 'tire iron');
            },
            after_init: function(notice) {
                alert('I\'m called after the notice initializes. I\'m passed the PNotify object for the current notice: ' + notice + '\n\nThere are more callbacks you can assign, but this is the last notice you\'ll see. Check the code to see them all.');
            },
            before_open: function(notice) {
                var source_note = 'Return false to cancel opening.';
                dont_alert('I\'m called before the notice opens. I\'m passed the PNotify object for the current notice: ' + notice);
            },
            after_open: function(notice) {
                dont_alert('I\'m called after the notice opens. I\'m passed the PNotify object for the current notice: ' + notice);
            },
            before_close: function(notice, timer_hide) {
                var source_note = 'Return false to cancel close. Use PNotify.queueRemove() to set the removal timer again.';
                dont_alert('I\'m called before the notice closes. I\'m passed the PNotify object for the current notice: ' + notice);
                dont_alert('I also have an argument called timer_hide, which is true if the notice was closed because the timer ran down. Value: ' + timer_hide);
            },
            after_close: function(notice, timer_hide) {
                dont_alert('I\'m called after the notice closes. I\'m passed the PNotify object for the current notice: ' + notice);
                dont_alert('I also have an argument called timer_hide, which is true if the notice was closed because the timer ran down. Value: ' + timer_hide);
            }
        });
    });
    $('#pnotify-notice-to-error-to-success-to-info').on('click', function() {
        new PNotify({
            title: 'Notice',
            text: 'Right now I\'m a notice.',
            before_close: function(notice) {
                notice.update({
                    title: 'Error',
                    text: 'Uh oh. Now I\'ve become an error.',
                    type: 'error',
                    before_close: function(notice) {
                        notice.update({
                            title: 'Success',
                            text: 'I fixed the error!',
                            type: 'success',
                            before_close: function(notice) {
                                notice.update({
                                    title: 'Info',
                                    text: 'Everything\'s cool now.',
                                    type: 'info',
                                    before_close: null
                                });
                                notice.attention('swing');
                                notice.queueRemove();
                                return false;
                            }
                        });
                        notice.attention('swing');
                        notice.queueRemove();
                        return false;
                    }
                });
                notice.attention('swing');
                notice.queueRemove();
                return false;
            }
        });        
    });
    function fake_load() {
        var cur_value = 1,
            progress;
        var loader = new PNotify({
            title: "Creating series of tubes",
            text: '<div class="progress progress-striped active" style="margin:0">\
      <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0">\
        <span class="sr-only">0%</span>\
      </div>\
    </div>',            
            icon: 'fa fa-cog fa-spin',
            hide: false,
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            },
            before_open: function(notice) {
                progress = notice.get().find("div.progress-bar");
                progress.width(cur_value + "%").attr("aria-valuenow", cur_value).find("span").html(cur_value + "%");
                var timer = setInterval(function() {
                    if (cur_value == 70) {
                        loader.update({
                            title: "Aligning discrete worms",
                            icon: "fa fa-circle-o-notch fa-spin"
                        });
                    }
                    if (cur_value == 80) {
                        loader.update({
                            title: "Connecting end points",
                            icon: "fa fa-refresh fa-spin"
                        });
                    }
                    if (cur_value == 90) {
                        loader.update({
                            title: "Dividing and conquering",
                            icon: "fa fa-spinner fa-spin"
                        });
                    }
                    if (cur_value >= 100) {
                        window.clearInterval(timer);
                        loader.remove();
                        return;
                    }
                    cur_value += 1;
                    progress.width(cur_value + "%").attr("aria-valuenow", cur_value).find("span").html(cur_value + "%");
                }, 65);
            }
        });
    }
    $('#pnotify-progress-loader').on('click', function() {
        fake_load();
    });
});