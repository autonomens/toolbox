(function(a){a.L={VERSION:"0.3",ROOT_URL:a.L_ROOT_URL||function(){var a=document.getElementsByTagName("script"),c=/\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/,d,e,f,h;d=0;for(e=a.length;d<e;d++)if(f=a[d].src,h=f.match(c))return"include"===h[1]?"../../dist/":f.split(c)[0]+"/";return""}(),noConflict:function(){a.L=this._originalL;return this},_originalL:a.L}})(this);L.Util={extend:function(a){for(var b=Array.prototype.slice.call(arguments,1),c=0,d=b.length,e;c<d;c++){e=b[c]||{};for(var f in e)e.hasOwnProperty(f)&&(a[f]=e[f])}return a},bind:function(a,b){return function(){return a.apply(b,arguments)}},stamp:function(){var a=0;return function(b){b._leaflet_id=b._leaflet_id||++a;return b._leaflet_id}}(),requestAnimFrame:function(){function a(a){window.setTimeout(a,1E3/60)}var b=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||
window.oRequestAnimationFrame||window.msRequestAnimationFrame||a;return function(c,d,e,f){c=d?L.Util.bind(c,d):c;e&&b===a?c():b(c,f)}}(),limitExecByInterval:function(a,b,c){function d(){e=!1;f&&(h.callee.apply(c,h),f=!1)}var e,f,h;return function(){h=arguments;e?f=!0:(e=!0,setTimeout(d,b),a.apply(c,h))}},falseFn:function(){return!1},formatNum:function(a,b){var c=Math.pow(10,b||5);return Math.round(a*c)/c},setOptions:function(a,b){a.options=L.Util.extend({},a.options,b)},getParamString:function(a){var b=
[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c+"="+a[c]);return"?"+b.join("&")},template:function(a,b){return a.replace(/\{ *([\w_]+) *\}/g,function(a,d){var e=b[d];if(!b.hasOwnProperty(d))throw Error("No value provided for variable "+a);return e})}};L.Class=function(){};
L.Class.extend=function(a){var b=function(){this.initialize&&this.initialize.apply(this,arguments)},c=function(){};c.prototype=this.prototype;c=new c;c.constructor=b;b.prototype=c;b.superclass=this.prototype;for(var d in this)this.hasOwnProperty(d)&&("prototype"!==d&&"superclass"!==d)&&(b[d]=this[d]);a.statics&&(L.Util.extend(b,a.statics),delete a.statics);a.includes&&(L.Util.extend.apply(null,[c].concat(a.includes)),delete a.includes);a.options&&c.options&&(a.options=L.Util.extend({},c.options,a.options));
L.Util.extend(c,a);b.extend=L.Class.extend;b.include=function(a){L.Util.extend(this.prototype,a)};return b};L.Mixin={};
L.Mixin.Events={addEventListener:function(a,b,c){var d=this._leaflet_events=this._leaflet_events||{};d[a]=d[a]||[];d[a].push({action:b,context:c||this});return this},hasEventListeners:function(a){return"_leaflet_events"in this&&a in this._leaflet_events&&0<this._leaflet_events[a].length},removeEventListener:function(a,b,c){if(!this.hasEventListeners(a))return this;for(var d=0,e=this._leaflet_events,f=e[a].length;d<f;d++)if(e[a][d].action===b&&(!c||e[a][d].context===c)){e[a].splice(d,1);break}return this},
fireEvent:function(a,b){if(!this.hasEventListeners(a))return this;for(var c=L.Util.extend({type:a,target:this},b),d=this._leaflet_events[a].slice(),e=0,f=d.length;e<f;e++)d[e].action.call(d[e].context||this,c);return this}};L.Mixin.Events.on=L.Mixin.Events.addEventListener;L.Mixin.Events.off=L.Mixin.Events.removeEventListener;L.Mixin.Events.fire=L.Mixin.Events.fireEvent;(function(){var a=navigator.userAgent.toLowerCase(),b=!!window.ActiveXObject,c=-1!==a.indexOf("webkit"),d="undefined"!==typeof orientation?!0:!1,e=-1!==a.indexOf("android"),f=window.opera;L.Browser={ie:b,ie6:b&&!window.XMLHttpRequest,webkit:c,webkit3d:c&&"WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix,gecko:-1!==a.indexOf("gecko"),opera:f,android:e,mobileWebkit:d&&c,mobileOpera:d&&f,mobile:d,touch:function(){var a=!1;if("ontouchstart"in document.documentElement)return!0;var b=document.createElement("div");
if(!b.setAttribute||!b.removeAttribute)return!1;b.setAttribute("ontouchstart","return;");"function"===typeof b.ontouchstart&&(a=!0);b.removeAttribute("ontouchstart");return a}()}})();L.Point=function(a,b,c){this.x=c?Math.round(a):a;this.y=c?Math.round(b):b};
L.Point.prototype={add:function(a){return this.clone()._add(a)},_add:function(a){this.x+=a.x;this.y+=a.y;return this},subtract:function(a){return this.clone()._subtract(a)},_subtract:function(a){this.x-=a.x;this.y-=a.y;return this},divideBy:function(a,b){return new L.Point(this.x/a,this.y/a,b)},multiplyBy:function(a){return new L.Point(this.x*a,this.y*a)},distanceTo:function(a){var b=a.x-this.x,a=a.y-this.y;return Math.sqrt(b*b+a*a)},round:function(){return this.clone()._round()},_round:function(){this.x=
Math.round(this.x);this.y=Math.round(this.y);return this},clone:function(){return new L.Point(this.x,this.y)},toString:function(){return"Point("+L.Util.formatNum(this.x)+", "+L.Util.formatNum(this.y)+")"}};L.Bounds=L.Class.extend({initialize:function(a,b){if(a)for(var c=a instanceof Array?a:[a,b],d=0,e=c.length;d<e;d++)this.extend(c[d])},extend:function(a){!this.min&&!this.max?(this.min=new L.Point(a.x,a.y),this.max=new L.Point(a.x,a.y)):(this.min.x=Math.min(a.x,this.min.x),this.max.x=Math.max(a.x,this.max.x),this.min.y=Math.min(a.y,this.min.y),this.max.y=Math.max(a.y,this.max.y))},getCenter:function(a){return new L.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,a)},contains:function(a){var b;
a instanceof L.Bounds?(b=a.min,a=a.max):b=a;return b.x>=this.min.x&&a.x<=this.max.x&&b.y>=this.min.y&&a.y<=this.max.y},intersects:function(a){var b=this.min,c=this.max,d=a.min,a=a.max,e=a.y>=b.y&&d.y<=c.y;return a.x>=b.x&&d.x<=c.x&&e}});L.Transformation=L.Class.extend({initialize:function(a,b,c,d){this._a=a;this._b=b;this._c=c;this._d=d},transform:function(a,b){return this._transform(a.clone(),b)},_transform:function(a,b){b=b||1;a.x=b*(this._a*a.x+this._b);a.y=b*(this._c*a.y+this._d);return a},untransform:function(a,b){b=b||1;return new L.Point((a.x/b-this._b)/this._a,(a.y/b-this._d)/this._c)}});L.DomUtil={get:function(a){return"string"===typeof a?document.getElementById(a):a},getStyle:function(a,b){var c=a.style[b];!c&&a.currentStyle&&(c=a.currentStyle[b]);if(!c||"auto"===c)c=(c=document.defaultView.getComputedStyle(a,null))?c[b]:null;return"auto"===c?null:c},getViewportOffset:function(a){var b=0,c=0,d=a,e=document.body;do{b+=d.offsetTop||0;c+=d.offsetLeft||0;if(d.offsetParent===e&&"absolute"===L.DomUtil.getStyle(d,"position"))break;d=d.offsetParent}while(d);d=a;do{if(d===e)break;b-=d.scrollTop||
0;c-=d.scrollLeft||0;d=d.parentNode}while(d);return new L.Point(c,b)},create:function(a,b,c){a=document.createElement(a);a.className=b;c&&c.appendChild(a);return a},disableTextSelection:function(){document.selection&&document.selection.empty&&document.selection.empty();this._onselectstart||(this._onselectstart=document.onselectstart,document.onselectstart=L.Util.falseFn)},enableTextSelection:function(){document.onselectstart=this._onselectstart;this._onselectstart=null},hasClass:function(a,b){return 0<
a.className.length&&RegExp("(^|\\s)"+b+"(\\s|$)").test(a.className)},addClass:function(a,b){L.DomUtil.hasClass(a,b)||(a.className+=(a.className?" ":"")+b)},removeClass:function(a,b){a.className=a.className.replace(/(\S+)\s*/g,function(a,d){return d===b?"":a}).replace(/^\s+/,"")},setOpacity:function(a,b){L.Browser.ie?a.style.filter="alpha(opacity="+Math.round(100*b)+")":a.style.opacity=b},testProp:function(a){for(var b=document.documentElement.style,c=0;c<a.length;c++)if(a[c]in b)return a[c];return!1},
getTranslateString:function(a){return L.DomUtil.TRANSLATE_OPEN+a.x+"px,"+a.y+"px"+L.DomUtil.TRANSLATE_CLOSE},getScaleString:function(a,b){var c=L.DomUtil.getTranslateString(b),d=" scale("+a+") ",e=L.DomUtil.getTranslateString(b.multiplyBy(-1));return c+d+e},setPosition:function(a,b){a._leaflet_pos=b;L.Browser.webkit3d?(a.style[L.DomUtil.TRANSFORM]=L.DomUtil.getTranslateString(b),L.Browser.android&&(a.style["-webkit-perspective"]="1000",a.style["-webkit-backface-visibility"]="hidden")):(a.style.left=
b.x+"px",a.style.top=b.y+"px")},getPosition:function(a){return a._leaflet_pos}};L.Util.extend(L.DomUtil,{TRANSITION:L.DomUtil.testProp(["transition","webkitTransition","OTransition","MozTransition","msTransition"]),TRANSFORM:L.DomUtil.testProp(["transformProperty","WebkitTransform","OTransform","MozTransform","msTransform"]),TRANSLATE_OPEN:"translate"+(L.Browser.webkit3d?"3d(":"("),TRANSLATE_CLOSE:L.Browser.webkit3d?",0)":")"});L.LatLng=function(a,b,c){var d=parseFloat(a),e=parseFloat(b);if(isNaN(d)||isNaN(e))throw Error("Invalid LatLng object: ("+a+", "+b+")");!0!==c&&(d=Math.max(Math.min(d,90),-90),e=(e+180)%360+(-180>e||180===e?180:-180));this.lat=d;this.lng=e};L.Util.extend(L.LatLng,{DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,MAX_MARGIN:1.0E-9});
L.LatLng.prototype={equals:function(a){return!(a instanceof L.LatLng)?!1:Math.max(Math.abs(this.lat-a.lat),Math.abs(this.lng-a.lng))<=L.LatLng.MAX_MARGIN},toString:function(){return"LatLng("+L.Util.formatNum(this.lat)+", "+L.Util.formatNum(this.lng)+")"},distanceTo:function(a){var b=L.LatLng.DEG_TO_RAD,c=(a.lng-this.lng)*b,d=this.lat*b,e=a.lat*b,a=Math.sin((a.lat-this.lat)*b/2),c=Math.sin(c/2),d=a*a+c*c*Math.cos(d)*Math.cos(e);return 12756274*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))}};L.LatLngBounds=L.Class.extend({initialize:function(a,b){if(a)for(var c=a instanceof Array?a:[a,b],d=0,e=c.length;d<e;d++)this.extend(c[d])},extend:function(a){!this._southWest&&!this._northEast?(this._southWest=new L.LatLng(a.lat,a.lng,!0),this._northEast=new L.LatLng(a.lat,a.lng,!0)):(this._southWest.lat=Math.min(a.lat,this._southWest.lat),this._southWest.lng=Math.min(a.lng,this._southWest.lng),this._northEast.lat=Math.max(a.lat,this._northEast.lat),this._northEast.lng=Math.max(a.lng,this._northEast.lng))},
getCenter:function(){return new L.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new L.LatLng(this._northEast.lat,this._southWest.lng,!0)},getSouthEast:function(){return new L.LatLng(this._southWest.lat,this._northEast.lng,!0)},contains:function(a){var b=this._southWest,c=this._northEast,d;a instanceof L.LatLngBounds?(d=a.getSouthWest(),
a=a.getNorthEast()):d=a;return d.lat>=b.lat&&a.lat<=c.lat&&d.lng>=b.lng&&a.lng<=c.lng},intersects:function(a){var b=this._southWest,c=this._northEast,d=a.getSouthWest(),a=a.getNorthEast(),e=a.lng>=b.lng&&d.lng<=c.lng;return a.lat>=b.lat&&d.lat<=c.lat&&e},toBBoxString:function(){var a=this._southWest,b=this._northEast;return[a.lng,a.lat,b.lng,b.lat].join()}});L.Projection={};L.Projection.SphericalMercator={MAX_LATITUDE:85.0511287798,project:function(a){var b=L.LatLng.DEG_TO_RAD,c=this.MAX_LATITUDE,c=Math.max(Math.min(c,a.lat),-c),a=a.lng*b,b=Math.log(Math.tan(Math.PI/4+c*b/2));return new L.Point(a,b)},unproject:function(a,b){var c=L.LatLng.RAD_TO_DEG,d=a.x*c,c=(2*Math.atan(Math.exp(a.y))-Math.PI/2)*c;return new L.LatLng(c,d,b)}};L.Projection.LonLat={project:function(a){return new L.Point(a.lng,a.lat)},unproject:function(a,b){return new L.LatLng(a.y,a.x,b)}};L.CRS={latLngToPoint:function(a,b){return this.transformation._transform(this.projection.project(a),b)},pointToLatLng:function(a,b,c){return this.projection.unproject(this.transformation.untransform(a,b),c)},project:function(a){return this.projection.project(a)}};L.CRS.EPSG3857=L.Util.extend({},L.CRS,{code:"EPSG:3857",projection:L.Projection.SphericalMercator,transformation:new L.Transformation(0.5/Math.PI,0.5,-0.5/Math.PI,0.5),project:function(a){return this.projection.project(a).multiplyBy(6378137)}});L.CRS.EPSG900913=L.Util.extend({},L.CRS.EPSG3857,{code:"EPSG:900913"});L.CRS.EPSG4326=L.Util.extend({},L.CRS,{code:"EPSG:4326",projection:L.Projection.LonLat,transformation:new L.Transformation(1/360,0.5,-1/360,0.5)});L.Map=L.Class.extend({includes:L.Mixin.Events,options:{crs:L.CRS.EPSG3857||L.CRS.EPSG4326,scale:function(a){return 256*Math.pow(2,a)},center:null,zoom:null,layers:[],dragging:!0,touchZoom:L.Browser.touch&&!L.Browser.android,scrollWheelZoom:!L.Browser.touch,doubleClickZoom:!0,boxZoom:!0,zoomControl:!0,attributionControl:!0,fadeAnimation:L.DomUtil.TRANSITION&&!L.Browser.android,zoomAnimation:L.DomUtil.TRANSITION&&!L.Browser.android&&!L.Browser.mobileOpera,trackResize:!0,closePopupOnClick:!0,worldCopyJump:!0},
initialize:function(a,b){L.Util.setOptions(this,b);this._container=L.DomUtil.get(a);if(this._container._leaflet)throw Error("Map container is already initialized.");this._container._leaflet=!0;this._initLayout();L.DomEvent&&(this._initEvents(),L.Handler&&this._initInteraction(),L.Control&&this._initControls());this.options.maxBounds&&this.setMaxBounds(this.options.maxBounds);var c=this.options.center,d=this.options.zoom;null!==c&&null!==d&&this.setView(c,d,!0);c=this.options.layers;c=c instanceof
Array?c:[c];this._tileLayersNum=0;this._initLayers(c)},setView:function(a,b){this._resetView(a,this._limitZoom(b));return this},setZoom:function(a){return this.setView(this.getCenter(),a)},zoomIn:function(){return this.setZoom(this._zoom+1)},zoomOut:function(){return this.setZoom(this._zoom-1)},fitBounds:function(a){var b=this.getBoundsZoom(a);return this.setView(a.getCenter(),b)},fitWorld:function(){var a=new L.LatLng(-60,-170),b=new L.LatLng(85,179);return this.fitBounds(new L.LatLngBounds(a,b))},
panTo:function(a){return this.setView(a,this._zoom)},panBy:function(a){this.fire("movestart");this._rawPanBy(a);this.fire("move");this.fire("moveend");return this},setMaxBounds:function(a){this.options.maxBounds=a;if(!a)return this._boundsMinZoom=null,this;var b=this.getBoundsZoom(a,!0);this._boundsMinZoom=b;this._loaded&&(this._zoom<b?this.setView(a.getCenter(),b):this.panInsideBounds(a));return this},panInsideBounds:function(a){var b=this.getBounds(),c=this.project(b.getSouthWest()),b=this.project(b.getNorthEast()),
d=this.project(a.getSouthWest()),a=this.project(a.getNorthEast()),e=0,f=0;b.y<a.y&&(f=a.y-b.y);b.x>a.x&&(e=a.x-b.x);c.y>d.y&&(f=d.y-c.y);c.x<d.x&&(e=d.x-c.x);return this.panBy(new L.Point(e,f,!0))},addLayer:function(a,b){var c=L.Util.stamp(a);if(this._layers[c])return this;this._layers[c]=a;a.options&&!isNaN(a.options.maxZoom)&&(this._layersMaxZoom=Math.max(this._layersMaxZoom||0,a.options.maxZoom));a.options&&!isNaN(a.options.minZoom)&&(this._layersMinZoom=Math.min(this._layersMinZoom||Infinity,
a.options.minZoom));this.options.zoomAnimation&&(L.TileLayer&&a instanceof L.TileLayer)&&(this._tileLayersNum++,a.on("load",this._onTileLayerLoad,this));this.attributionControl&&a.getAttribution&&this.attributionControl.addAttribution(a.getAttribution());c=function(){a.onAdd(this,b);this.fire("layeradd",{layer:a})};if(this._loaded)c.call(this);else this.on("load",c,this);return this},removeLayer:function(a){var b=L.Util.stamp(a);this._layers[b]&&(a.onRemove(this),delete this._layers[b],this.options.zoomAnimation&&
(L.TileLayer&&a instanceof L.TileLayer)&&(this._tileLayersNum--,a.off("load",this._onTileLayerLoad,this)),this.attributionControl&&a.getAttribution&&this.attributionControl.removeAttribution(a.getAttribution()),this.fire("layerremove",{layer:a}));return this},hasLayer:function(a){return this._layers.hasOwnProperty(L.Util.stamp(a))},invalidateSize:function(){var a=this.getSize();this._sizeChanged=!0;this.options.maxBounds&&this.setMaxBounds(this.options.maxBounds);if(!this._loaded)return this;this._rawPanBy(a.subtract(this.getSize()).divideBy(2,
!0));this.fire("move");clearTimeout(this._sizeTimer);this._sizeTimer=setTimeout(L.Util.bind(function(){this.fire("moveend")},this),200);return this},getCenter:function(a){var b=this.getSize().divideBy(2);return this.unproject(this._getTopLeftPoint().add(b),this._zoom,a)},getZoom:function(){return this._zoom},getBounds:function(){var a=this.getPixelBounds(),b=this.unproject(new L.Point(a.min.x,a.max.y),this._zoom,!0),a=this.unproject(new L.Point(a.max.x,a.min.y),this._zoom,!0);return new L.LatLngBounds(b,
a)},getMinZoom:function(){return Math.max(this.options.minZoom||0,this._layersMinZoom||0,this._boundsMinZoom||0)},getMaxZoom:function(){var a=isNaN(this.options.maxZoom)?Infinity:this.options.maxZoom;return Math.min(a,this._layersMaxZoom||Infinity)},getBoundsZoom:function(a,b){var c=this.getSize(),d=this.options.minZoom||0,e=this.getMaxZoom(),f=a.getNorthEast(),h=a.getSouthWest(),g,i;g=!0;b&&d--;do d++,g=this.project(f,d),i=this.project(h,d),g=new L.Point(g.x-i.x,i.y-g.y),g=b?g.x<c.x||g.y<c.y:g.x<=
c.x&&g.y<=c.y;while(g&&d<=e);return g&&b?null:b?d:d-1},getSize:function(){if(!this._size||this._sizeChanged)this._size=new L.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1;return this._size},getPixelBounds:function(){var a=this._getTopLeftPoint(),b=this.getSize();return new L.Bounds(a,a.add(b))},getPixelOrigin:function(){return this._initialTopLeftPoint},getPanes:function(){return this._panes},mouseEventToContainerPoint:function(a){return L.DomEvent.getMousePosition(a,
this._container)},mouseEventToLayerPoint:function(a){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a))},mouseEventToLatLng:function(a){return this.layerPointToLatLng(this.mouseEventToLayerPoint(a))},containerPointToLayerPoint:function(a){return a.subtract(L.DomUtil.getPosition(this._mapPane))},layerPointToContainerPoint:function(a){return a.add(L.DomUtil.getPosition(this._mapPane))},layerPointToLatLng:function(a){return this.unproject(a.add(this._initialTopLeftPoint))},latLngToLayerPoint:function(a){return this.project(a)._round()._subtract(this._initialTopLeftPoint)},
project:function(a,b){b="undefined"===typeof b?this._zoom:b;return this.options.crs.latLngToPoint(a,this.options.scale(b))},unproject:function(a,b,c){b="undefined"===typeof b?this._zoom:b;return this.options.crs.pointToLatLng(a,this.options.scale(b),c)},_initLayout:function(){var a=this._container;a.innerHTML="";a.className+=" leaflet-container";this.options.fadeAnimation&&(a.className+=" leaflet-fade-anim");var b=L.DomUtil.getStyle(a,"position");"absolute"!==b&&"relative"!==b&&(a.style.position=
"relative");this._initPanes();this._initControlPos&&this._initControlPos()},_initPanes:function(){var a=this._panes={};this._mapPane=a.mapPane=this._createPane("leaflet-map-pane",this._container);this._tilePane=a.tilePane=this._createPane("leaflet-tile-pane",this._mapPane);this._objectsPane=a.objectsPane=this._createPane("leaflet-objects-pane",this._mapPane);a.shadowPane=this._createPane("leaflet-shadow-pane");a.overlayPane=this._createPane("leaflet-overlay-pane");a.markerPane=this._createPane("leaflet-marker-pane");
a.popupPane=this._createPane("leaflet-popup-pane")},_createPane:function(a,b){return L.DomUtil.create("div",a,b||this._objectsPane)},_resetView:function(a,b,c,d){var e=this._zoom!==b;d||(this.fire("movestart"),e&&this.fire("zoomstart"));this._zoom=b;this._initialTopLeftPoint=this._getNewTopLeftPoint(a);c?this._initialTopLeftPoint._add(L.DomUtil.getPosition(this._mapPane)):L.DomUtil.setPosition(this._mapPane,new L.Point(0,0));this._tileLayersToLoad=this._tileLayersNum;this.fire("viewreset",{hard:!c});
this.fire("move");(e||d)&&this.fire("zoomend");this.fire("moveend");this._loaded||(this._loaded=!0,this.fire("load"))},_initLayers:function(a){this._layers={};var b,c;b=0;for(c=a.length;b<c;b++)this.addLayer(a[b])},_initControls:function(){this.options.zoomControl&&this.addControl(new L.Control.Zoom);this.options.attributionControl&&(this.attributionControl=new L.Control.Attribution,this.addControl(this.attributionControl))},_rawPanBy:function(a){var b=L.DomUtil.getPosition(this._mapPane);L.DomUtil.setPosition(this._mapPane,
b.subtract(a))},_initEvents:function(){L.DomEvent.addListener(this._container,"click",this._onMouseClick,this);var a="dblclick mousedown mouseenter mouseleave mousemove contextmenu".split(" "),b,c;b=0;for(c=a.length;b<c;b++)L.DomEvent.addListener(this._container,a[b],this._fireMouseEvent,this);this.options.trackResize&&L.DomEvent.addListener(window,"resize",this._onResize,this)},_onResize:function(){L.Util.requestAnimFrame(this.invalidateSize,this,!1,this._container)},_onMouseClick:function(a){if(this._loaded&&
(!this.dragging||!this.dragging.moved()))this.fire("pre"+a.type),this._fireMouseEvent(a)},_fireMouseEvent:function(a){if(this._loaded){var b=a.type,b="mouseenter"===b?"mouseover":"mouseleave"===b?"mouseout":b;this.hasEventListeners(b)&&("contextmenu"===b&&L.DomEvent.preventDefault(a),this.fire(b,{latlng:this.mouseEventToLatLng(a),layerPoint:this.mouseEventToLayerPoint(a)}))}},_initInteraction:function(){var a={dragging:L.Map.Drag,touchZoom:L.Map.TouchZoom,doubleClickZoom:L.Map.DoubleClickZoom,scrollWheelZoom:L.Map.ScrollWheelZoom,
boxZoom:L.Map.BoxZoom},b;for(b in a)a.hasOwnProperty(b)&&a[b]&&(this[b]=new a[b](this),this.options[b]&&this[b].enable())},_onTileLayerLoad:function(){this._tileLayersToLoad--;this._tileLayersNum&&(!this._tileLayersToLoad&&this._tileBg)&&(clearTimeout(this._clearTileBgTimer),this._clearTileBgTimer=setTimeout(L.Util.bind(this._clearTileBg,this),500))},_getTopLeftPoint:function(){if(!this._loaded)throw Error("Set map center and zoom first.");return this._initialTopLeftPoint.subtract(L.DomUtil.getPosition(this._mapPane))},
_getNewTopLeftPoint:function(a){var b=this.getSize().divideBy(2);return this.project(a).subtract(b).round()},_limitZoom:function(a){var b=this.getMinZoom(),c=this.getMaxZoom();return Math.max(b,Math.min(c,a))}});