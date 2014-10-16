$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 139,
        itemMargin: 5,
        controlNav: false,
        directionNav: true,
        nextText: '',
        prevText: '',
        move: 1
    });
    //Add a div that will contain the 'gradient' background over logos.
    $('.flex-viewport').prepend('<div id="flex-gradient" class="gradient"></div>');
});


$(document).ready(function() {

  	//$('#productsGrid').mixitup({multiFilter: true, filterLogic: 'or',showOnLoad: 'mix_all',/*onMixLoad:takeCareOfReset,*/ onMixStart:takeCareOfReset });
	//$('#productsGrid').mixitup('filter','all');


    // INSTANTIATE MIXITUP
    $('#productsGrid').mixitup({
        multiFilter: true,
        effects: ['fade'],
        easing: 'snap'
    });

    // HANDLE FILTERING
    window.filterString1 = 'all';
    window.filterString2 = ' all';
    window.definitiveFilter = '';

    // Bind filters click handlers:
    $('.filter').on('click', function () {
        var $t = $(this),
        filter = $t.attr('data-filter');

        if ($t.hasClass('filter1'))
        {
            if( filterString1.indexOf(filter) < 0 ) {
                filterString1 = filter;
            } else {
                // Remove filter and preceeding space from string with RegEx
                var re = new RegExp('(\\s|^)' + filter);
                filterString1 = filterString1.replace(re, '');
            }
        }
        if ($t.hasClass('filter2'))
        {
            if( filterString2.indexOf(filter) < 0 ) {
                filterString2 = filter;
            } else {
                // Remove filter and preceeding space from string with RegEx
                var re = new RegExp('(\\s|^)' + filter);
                filterString2 = filterString2.replace(re, '');
            }
        }

        setTimeout(function(){

            filterString1 = filterString1.trim();
            filterString2 = filterString2.trim();

            $('.filter1').removeClass('active');
            $('.filter2').removeClass('active');

            if(filterString1=='') filterString1 = 'none';
            if(filterString2=='') filterString2 = 'none';
            if(filterString1=='all' && filterString2!='all' && filterString2!='none') filterString1='none';
            if(filterString2=='all' && filterString1!='all' && filterString1!='none') filterString2='none';

            definitiveFilter = filterString1+' '+filterString2;

            //console.log('Filter:'+definitiveFilter);
            $('#productsGrid').mixitup('filter', [definitiveFilter]);
            if(filterString1 != 'none')
                $('.filter1').filter(('[data-filter="'+filterString1+'"]')).addClass('active');
            if(filterString2 != 'none')
                $('.filter2').filter(('[data-filter="'+filterString2+'"]')).addClass('active');
        },300);
    });



    // if the function argument is given to overlay,
    // it is assumed to be the onBeforeLoad event listener
    $(".productOverlay").overlay({

        mask: '#292929',
        effect: 'apple',
        top: 30,

        onBeforeLoad: function() {

            // grab wrapper element inside content
            var wrap = this.getOverlay().find(".contentWrap");

            // load the page specified in the trigger
            wrap.load(this.getTrigger().attr("href"));
        }

    });

	$(".offreBtn").overlay({

        mask: '#292929',
        effect: 'apple',
        top: 30,

        onBeforeLoad: function() {

            /*Make sure contact form is visible*/
            $('.productContactForm').css('display','block');
            $('.productContactResponse').css('display','none');

            /*Fill overlayed contact form with clicked product data*/
            $('#productImageContact').html($('#productImage').html());
            $('#productDescriptionContact').html($('#productDescription').html());
			$('#contactForm textarea').val($('#contactForm textarea').val()+' "'+$('#productTitle').html()+'" ...' );


            // grab wrapper element inside content
            var wrap = this.getOverlay().find(".contentWrapContact");
            // load the page specified in the trigger
            wrap.load(this.getTrigger().attr("href"));

        }
    });

});