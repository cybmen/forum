let globe;
let sprites = [];

let connections = [
    [59.651901245117,17.918600082397,	41.8002778,12.2388889],
    [59.651901245117,17.918600082397,	51.4706,-0.461941],
    
    [13.681099891662598,100.74700164794922,	-6.1255698204,106.65599823],
    [13.681099891662598,100.74700164794922,	28.566499710083008,77.10310363769531],
    
    [30.12190055847168,31.40559959411621, -1.31923997402,36.9277992249],
    [30.12190055847168,31.40559959411621, 25.2527999878,55.3643989563],
    [30.12190055847168,31.40559959411621, 41.8002778,12.2388889],

    [28.566499710083008,77.10310363769531,	7.180759906768799,79.88410186767578],
    [28.566499710083008,77.10310363769531,	40.080101013183594,116.58499908447266],
    [28.566499710083008,77.10310363769531,	25.2527999878,55.3643989563],

    [-33.9648017883,18.6016998291, -1.31923997402,36.9277992249],
    
    [-1.31923997402,36.9277992249, 25.2527999878,55.3643989563],
    
    [41.8002778,12.2388889, 51.4706,-0.461941],
    [41.8002778,12.2388889, 40.471926,-3.56264],

    [19.4363,-99.072098,	25.79319953918457,-80.29060363769531],
    [19.4363,-99.072098,	33.94250107,-118.4079971],
    [19.4363,-99.072098,	-12.0219,-77.114304],
    
    [-12.0219,-77.114304,	-33.393001556396484,-70.78579711914062],
    [-12.0219,-77.114304, -34.8222,-58.5358],
    [-12.0219,-77.114304, -22.910499572799996,-43.1631011963],
    
    [-34.8222,-58.5358, -33.393001556396484,-70.78579711914062],
    [-34.8222,-58.5358, -22.910499572799996,-43.1631011963],
    
    [22.3089008331,113.915000916, 13.681099891662598,100.74700164794922],
    [22.3089008331,113.915000916, 40.080101013183594,116.58499908447266],
    [22.3089008331,113.915000916, 31.143400192260742,121.80500030517578],
    
    [35.552299,139.779999, 40.080101013183594,116.58499908447266],
    [35.552299,139.779999, 31.143400192260742,121.80500030517578],
    
    [33.94250107,-118.4079971,	40.63980103,-73.77890015],
    [33.94250107,-118.4079971,	25.79319953918457,-80.29060363769531],
    [33.94250107,-118.4079971,	49.193901062,-123.183998108],
    
    [40.63980103,-73.77890015, 25.79319953918457,-80.29060363769531],
    [40.63980103,-73.77890015, 51.4706,-0.461941],
    
    [51.4706,-0.461941, 40.471926,-3.56264],
    
    [40.080101013183594,116.58499908447266,	31.143400192260742,121.80500030517578],
    
    [-33.94609832763672,151.177001953125,	-41.3272018433,174.804992676],
    [-33.94609832763672,151.177001953125,	-6.1255698204,106.65599823],
    
    [55.5914993286,37.2615013123, 59.651901245117,17.918600082397],
    [55.5914993286,37.2615013123, 41.8002778,12.2388889],
    [55.5914993286,37.2615013123, 40.080101013183594,116.58499908447266],
    [55.5914993286,37.2615013123, 25.2527999878,55.3643989563],
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}


function pulse( index ) {
	var random_location = connections[getRandomInt(0, connections.length - 1)];
	sprites[index].location = {
        lat: random_location[0], 
        lng: random_location[1]
    };
	
    sprites[index].animate( 'scale', 0.5, {
        duration: 320,
        complete: function() {
		    this.animate('scale', 0.01, {
                duration: 320, 
                complete: () => {
			        setTimeout(() => {
                        pulse(index); 
                    }, getRandomInt(100, 400));
		        } 
            });
	    } 
    });
}


$(document).ready(() => {
    if (document.querySelector('#globe') !== null) {
        globe = new Earth('globe', {
            location : { lat: 20, lng : 20 },
            light: 'none',
            mapImage: 'assets/img/h.svg',
            transparent: true,
            autoRotate : true,
            autoRotateSpeed: 2.5,
            autoRotateDelay: 100,
            autoRotateStart: 2000,			
        });

        globe.startAutoRotate();
        let line = {
            color : '#4BAA6C',
            opacity: 0.35,
            hairline: true,
            offset: -0.5
        };

        for (var i in connections) {			
            line.locations = [
                {
                    lat: connections[i][0], 
                    lng: connections[i][1]
                }, 
                { 
                    lat: connections[i][2], 
                    lng: connections[i][3] 
                }
            ];

            globe.addLine(line);
        }

        for (let i = 0; i < 8; i++) {
            sprites[i] = globe.addSprite({
                image: 'assets/img/hologram-shine.svg',
                scale: 0.01,
                offset: -0.5,
                opacity: 0.5
            });

            pulse(i);
        }
    }

    $('.mobile-menu').on('click', (e) => {
        e.preventDefault();
        $('.menu').toggle('medium', () => {
            let menuBtn = $('.mobile-menu > a');
            let btnText = menuBtn.text().trim();

            if (btnText == 'Menu') {
                menuBtn.text('Close');

            } else if (btnText == 'Close') {
                menuBtn.text('Menu');
            }
        });
    });

    $('.search-icon').on('click', () => {
        $('form.search-form').submit();
    });
});
