$(function() {
    $('.wc-type-definition-group-element').on('click', function (e) {
        var $this = $(this);
        if ($this.hasClass('wc-type-definition-group-element-selected'))
            return;

        var bigImagePattern = 'wcalc/img/big/b';
        $('.wc-window-image').attr('src', bigImagePattern + $this.data('type') + '.jpg');

        $('.wc-type-definition-group-element-selected').removeClass('wc-type-definition-group-element-selected');
        $this.addClass('wc-type-definition-group-element-selected');

        var carriage = $('.wc-selected-carriage');

        carriage.css("left", $this.position().left);
        carriage.width($this.width() + 9);
        carriage.height($this.height() + 10);
    });

    var usdRate = 14000;

    var productTypePrice = {
        '1ct1': 756,
        '1ct2': 1140,
        '1ct3': 1270,
        '2ct1': 890,
        '2ct2': 1130,
        '3ct1': 770,
        '3ct2': 940,
        '3ct3': 1080,
        '4ct1': 830,
        '4ct2': 1010,
        'db1': 1000,
        'db2': 1100
    };

    var productTypePriceFactor = 10000000;

    var producerRatio = {
        DEXEN: 100,
        WDS: 108,
        KBE: 111,
        SALAMANDER: 132
    };

    var producerRatioFactor = 100;

    $('.wc-button-calculate').on('click', function(e) {
        var height = + $('.wc-height-block-value').val();
        var width = + $('.wc-width-block-value').val();
        if (! (height > 0 && width > 0)) {
            showError();
            return;
        }

        var productType = $('.wc-type-definition-group-element-selected').data('type');
        var producer = $('.wc-producer').val();

        var price = Math.ceil(
            ((height * width) * producerRatio[producer] * productTypePrice[productType] * usdRate) /
            (producerRatioFactor * productTypePriceFactor));

        if (price > 1000000000){
            showError();
            return;
        } 

        showPrice(price);
    });

    function showError() {
        $('.wc-money-price-fieldset').removeClass('wc-hidden');
        $('.wc-money-price-rubles').addClass('wc-hidden');
        $('.wc-money-price').text('Ошибка...');
    }

    function showPrice(price) {
    	$('.wc-money-price-spinner').removeClass('wc-hidden');
    	$('.wc-money-price-fieldset').addClass('wc-zero-opacity');

    	setTimeout(function() {
			$('.wc-money-price-spinner').addClass('wc-hidden');
    		$('.wc-money-price-fieldset').removeClass('wc-zero-opacity');

        	$('.wc-money-price-rubles').removeClass('wc-hidden');
        	$('.wc-money-price').text(price.toString().split(/(?=(?:...)*$)/).join(' '));
    	}, 500);
	}

    //Joomla denied my html tag .wc-money-price, so let's create it , if it not exists
    if(! $('.wc-money-price').length) {
        var wcMoneyPrice = $('<span/>').addClass('wc-money-price');
            
        $('.wc-money-price-legend').after(wcMoneyPrice);
    }
});