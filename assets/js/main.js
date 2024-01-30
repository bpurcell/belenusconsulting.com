

(function($) {
	
	var	$window = $(window),
		$body = $('body');


		

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {

			fetch('pageContent.json')
			.then(response => response.json())
			.then(data => {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
				// Use the data here
				var pageContent = data;
				function loopJSONandPrint(jsonObj, depth, parentKey = "") {
					// Base case: stop recursion when depth reaches 0
					if (depth === 0) {
						return;
					}
		
					// Loop over each key-value pair in the JSON object
					for (let key in jsonObj) {
		
						// Combine the parent key with the current key
						const combinedKey = parentKey ? `${parentKey}-${key}` : key;
		
						// Build the key-value pair with combined key names
						const keyValue = `${combinedKey}: ${jsonObj[key]}`;
		
						// Recursively call the function for nested objects
						if (typeof jsonObj[key] === "object") {
							loopJSONandPrint(jsonObj[key], depth - 1, combinedKey);
		
						} else {
							
							document.getElementById(combinedKey).innerHTML = jsonObj[key];
							$('#'+combinedKey).html(jsonObj[key]);
						}
					}
				}

				// Check if query parameter version exists
				const urlParams = new URLSearchParams(window.location.search);
				const version = urlParams.get('version');
				if (version) {
					pageContent = data[version];
					loopJSONandPrint(pageContent)
					console.log(pageContent)
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});

		});


	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');

	// Scrolly.
		$('.scrolly')
			.scrolly({
				offset: 100
			});

	// Polyfill: Object fit.
		if (!browser.canUse('object-fit')) {

			$('.image[data-position]').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', $this.data('position'))
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

			$('.gallery > a').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', 'center')
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

		}


		
})(jQuery);