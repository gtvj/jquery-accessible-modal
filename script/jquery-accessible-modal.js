(function ($) {
    $.fn.accessiblePopup = function (options) {

        var settings = $.extend({}, $.fn.accessiblePopup.defaults, options);

        return this.each(function () {

            var $modal, $modalContent, $modalHeader, $dialogTitle, $closeButton, $modalBody, $modalBodyParagraph,
                $modalFooter, $buttonWrapper, $surveyLink, $noThanksButton, closeModal, setCookie, renderPopup,
                pushToGTM,
                init;

            $modal = $('<div>', {
                'id': 'modal',
                'class': 'modal',
                'role': 'dialog',
                'aria-modal': 'true',
                'aria-labelledBy': 'dialog-title',
                'aria-hidden': 'false',
                'keydown': function (e) {
                    if (e.key === "Escape") {
                        closeModal();
                        pushToGTM({
                            'eventAction': 'Did not take survey',
                            'eventLabel': 'Escape key'
                        })
                    }
                }
            });

            $modalContent = $('<div>', {'class': 'modalContent'});

            $modalHeader = $('<div>', {'class': 'modal-header', 'id': 'dialog-description'});

            $dialogTitle = $('<h2>', {'text': settings.headingText, 'id': 'dialog-title'});

            $closeButton = $('<button>', {
                'class': 'closeBtn close focus',
                'aria-label': 'Close survey',
                'click': function () {
                    setCookie();
                    closeModal();
                    pushToGTM({
                        'eventAction': 'Did not take survey',
                        'eventLabel': 'Close survey button pressed'
                    })
                }
            }).html('&times;');

            $modalBody = $('<div>', {'class': 'modal-body'});

            $modalBodyParagraph = $('<p>', {'text': settings.bodyText});

            $modalFooter = $('<div>', {'class': 'modal-footer'});

            $buttonWrapper = $('<div>', {'class': 'button-wrapper'});

            $surveyLink = $('<a>', {
                'text': 'Take survey',
                'id': 'surveyBtn',
                'rel': 'noopener noreferrer',
                'href': 'https://www.smartsurvey.co.uk/s/XEM2T/',
                'target': '_blank',
                'class': 'close tna-button focus',
                'click': function (e) {
                    setCookie();
                    closeModal();
                    pushToGTM({
                        'eventAction': 'Take survey button pressed',
                        'eventLabel': 'Took survey'
                    })
                }
            });

            $noThanksButton = $('<button>', {
                'id': 'noThanks',
                'class': 'close close-button focus',
                'text': 'No thanks',
                'click': function () {
                    setCookie();
                    closeModal();
                    pushToGTM({
                        'eventAction': 'Did not take survey',
                        'eventLabel': 'No thanks button pressed'
                    })
                },
                'keydown': function (e) {
                    {
                        if (e.keyCode === 9) { // Tab keycode
                            e.preventDefault();
                            $closeButton.focus();
                        }
                    }
                }
            });

            closeModal = function () {
                $modal.hide();
            };

            setCookie = function () {
                const date = new Date();
                date.setMonth(date.getMonth() + 2); // Two Months

                const expiry = 'expires=' + date.toUTCString();
                document.cookie = 'interacted_with_survey=yes;' + expiry + ';path=/';
            };

            renderPopup = function ($el) {
                $closeButton.appendTo($modalHeader);
                $dialogTitle.appendTo($modalHeader);
                $modalHeader.appendTo($modalContent);
                $modalBodyParagraph.appendTo($modalBody);
                $modalBody.appendTo($modalContent);
                $surveyLink.appendTo($buttonWrapper);
                $noThanksButton.appendTo($buttonWrapper);
                $buttonWrapper.appendTo($modalFooter);
                $buttonWrapper.appendTo($modalContent);
                $modalContent.appendTo($modal);
                $el.append($modal);
                $closeButton.focus();
            };

            pushToGTM = function (obj) {
                window.dataLayer = window.dataLayer || [];
                var gtm_object = $.extend({'event': settings.surveyName, 'eventCategory': 'Popup Survey'}, obj);
                window.dataLayer.push(gtm_object);
            };

            init = function ($el) {
                renderPopup($el);
            };

            init($(this));
        });
    };

    $.fn.accessiblePopup.defaults = {
        'headingText': 'Participate',
        'bodyText': 'We want to improve our digital services for everyone. Help out by answering 4 short questions, and enter a prize draw to win £100.',
        'surveyName': 'AA survey'
    }
}(jQuery));

if (document.cookie.indexOf("interacted_with_survey=yes") === -1) { // Cookie does not exist
    $('body').accessiblePopup();
}