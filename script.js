$(document).ready(function() {
	$('#gerar').on('click', function(e) {
		
		$('#print-content').empty();
		
		var elements = $('#content').find('.print, .print-tr');
		var pageSize = 1122.51 - 100;
		var pageNumber = 1;
		var count = 0;
		var tableCount = 1;
		var page = function(pageNumber, pageSize) {
			return `<div class="page-print" id="page${pageNumber}" style="width:793.70px;height:${pageSize}px;"></div>`;
		};

		elements.each(function(i, el) {
			$('#print-content').append($(el).clone());
		});

		$('#print-content').append(page(pageNumber, pageSize));
		$('#print-content').find('.print, .print-tr').each(function(i, el) {
			count += $(el).outerHeight(true);
			if (count <= pageSize) {
				if ($(el).hasClass('print-tr')) {
					if ($(el).hasClass('first-tr')) {
						tableCount++
					}
					if ($('#page'+pageNumber).find('#table'+tableCount).length < 1) {
						$('#page'+pageNumber).append(`<table id="table${tableCount}">`);
					}
					$('#table'+tableCount).append(el);	
				} else {
					$('#page'+pageNumber).append(el);
				}
			} else {
				pageNumber++;
				tableCount++;
				$('#print-content').append(page(pageNumber, pageSize));
				if ($(el).hasClass('print-tr')) {
					if ($(el).hasClass('first-tr')) {
						tableCount++
					}
					if ($('#page'+pageNumber).find('#table'+tableCount).length < 1) {
						$('#page'+pageNumber).append(`<table id="table${tableCount}">`);	
					}
					$('#table'+tableCount).append(el);	
				} else {
					$('#page'+pageNumber).append(el);
				}
				count = $(el).outerHeight(true);
			};
		});
		print();
	});

	$('#reset').on('click', function() {
		$('#print-content').empty();
	});

	$('#printer').on('click', function() {
		print();
	});
});