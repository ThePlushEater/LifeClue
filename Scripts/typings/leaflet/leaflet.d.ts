// Type definitions for Leaflet.js 0.7.3
// Project: https://github.com/Leaflet/Leaflet
// Definitions by: Vladimir Zotov <https://github.com/rgripper>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

 
declare module L {

    export interface AttributionOptions {

        /**
          * The position of the control (one of the map corners). See control positions.
          * Default value: 'bottomright'.
          */
        position?: string;
    
        /**
          * The HTML text shown before the attributions. Pass false to disable.
          * Default value: 'Powered by Leaflet'.
          */
        prefix?: string;
    
    }
}
 
declare module L {

    /**
        * Creates a Bounds object from two coordinates (usually top-left and bottom-right
        * corners).
        */
    export function bounds(topLeft: Point, bottomRight: Point): Bounds;

    /**
        * Creates a Bounds object defined by the points it contains.
        */
    export function bounds(points: Point[]): Bounds;

    export class Bounds {

        /**
          * Creates a Bounds object from two coordinates (usually top-left and bottom-right
          * corners).
          */
        constructor(topLeft: Point, bottomRight: Point);
    
        /**
          * Creates a Bounds object defined by the points it contains.
          */
        constructor(points: Point[]);

        /**
          * Extends the bounds to contain the given point.
          */
        extend(point: Point): void;
    
        /**
          * Returns the center point of the bounds.
          */
        getCenter(): Point;
    
        /**
          * Returns true if the rectangle contains the given one.
          */
        contains(otherBounds: Bounds): boolean;
    
        /**
          * Returns true if the rectangle contains the given point.
          */
        contains(point: Point): boolean;
    
        /**
          * Returns true if the rectangle intersects the given bounds.
          */
        intersects(otherBounds: Bounds): boolean;
    
        /**
          * Returns true if the bounds are properly initialized.
          */
        isValid(): boolean;
    
        /**
          * Returns the size of the given bounds.
          */
        getSize(): Point;
    
        /**
          * The top left corner of the rectangle.
          */
        min: Point;
    
        /**
          * The bottom right corner of the rectangle.
          */
        max: Point;
    }
}
 
declare module L {

    export class Browser {

        /**
          * true for all Internet Explorer versions.
          */
        static ie: boolean;
    
        /**
          * true for Internet Explorer 6.
          */
        static ie6: boolean;
    
        /**
          * true for Internet Explorer 6.
          */
        static ie7: boolean;
    
        /**
          * true for webkit-based browsers like Chrome and Safari (including mobile
          * versions).
          */
        static webkit: boolean;
    
        /**
          * true for webkit-based browsers that support CSS 3D transformations.
          */
        static webkit3d: boolean;
    
        /**
          * true for Android mobile browser.
          */
        static android: boolean;
    
        /**
          * true for old Android stock browsers (2 and 3).
          */
        static android23: boolean;
    
        /**
          * true for modern mobile browsers (including iOS Safari and different Android
          * browsers).
          */
        static mobile: boolean;
    
        /**
          * true for mobile webkit-based browsers.
          */
        static mobileWebkit: boolean;
    
        /**
          * true for mobile Opera.
          */
        static mobileOpera: boolean;
    
        /**
          * true for all browsers on touch devices.
          */
        static touch: boolean;
    
        /**
          * true for browsers with Microsoft touch model (e.g. IE10).
          */
        static msTouch: boolean;
    
        /**
          * true for devices with Retina screens.
          */
        static retina: boolean;
    
    }
}
 
 
declare module L {

    /**
      * Instantiates a circle object given a geographical point, a radius in meters
      * and optionally an options object.
      */
    function circle(latlng: LatLng, radius: number, options?: PathOptions): Circle;

    export class Circle extends Path {

        /**
          * Instantiates a circle object given a geographical point, a radius in meters
          * and optionally an options object.
          */
        constructor(latlng: LatLng, radius: number, options?: PathOptions);
    
        /**
          * Returns the current geographical position of the circle.
          */
        getLatLng(): LatLng;
    
        /**
          * Returns the current radius of a circle. Units are in meters.
          */
        getRadius(): number;
    
        /**
          * Sets the position of a circle to a new location.
          */
        setLatLng(latlng: LatLng): Circle;
    
        /**
          * Sets the radius of a circle. Units are in meters.
          */
        setRadius(radius: number): Circle;

        /**
          * Returns a GeoJSON representation of the circle (GeoJSON Point Feature).
          */
        toGeoJSON(): any;

    }
}
 
declare module L {

    /**
      * Instantiates a circle marker given a geographical point and optionally
      * an options object. The default radius is 10 and can be altered by passing a
      * "radius" member in the path options object.
      */
    function circleMarker(latlng: LatLng, options?: PathOptions): CircleMarker;

    export class CircleMarker extends Circle {

        /**
          * Instantiates a circle marker given a geographical point and optionally
          * an options object. The default radius is 10 and can be altered by passing a
          * "radius" member in the path options object.
          */
        constructor(latlng: LatLng, options?: PathOptions);

        /**
          * Sets the position of a circle marker to a new location.
          */
        setLatLng(latlng: LatLng): CircleMarker;
    
        /**
          * Sets the radius of a circle marker. Units are in pixels.
          */
        setRadius(radius: number): CircleMarker;

        /**
          * Returns a GeoJSON representation of the circle marker (GeoJSON Point Feature).
          */
        toGeoJSON(): any;
    }
}
 
declare module L {

    export interface ClassExtendOptions {
        /**
          * options is a special property that unlike other objects that you pass 
          * to extend will be merged with the parent one instead of overriding it 
          * completely, which makes managing configuration of objects and default 
          * values convenient.
          */
        options?: any;

        /**
          * includes is a special class property that merges all specified objects 
          * into the class (such objects are called mixins). A good example of this
          * is L.Mixin.Events that event-related methods like on, off and fire 
          * to the class.
          */
        includes?: any;

        /**
          * statics is just a convenience property that injects specified object 
          * properties as the static properties of the class, useful for defining 
          * constants.
          */
        static?: any;
    }

    /**
      * L.Class powers the OOP facilities of Leaflet and is used to create
      * almost all of the Leaflet classes documented.
      */
    export class Class {

        /**
          * You use L.Class.extend to define new classes, but you can use the
          * same method on any class to inherit from it.
          */
        static extend(options: ClassExtendOptions): any;

        /**
          * You can also use the following shortcut when you just need to make
          * one additional method call.
          */
        static addInitHook(methodName: string, ...args: any[]): void;
    }

} 
 
 
 
declare module L {

    export class Control extends Class implements IControl {

        /**
          * Creates a control with the given options.
          */
        constructor(options?: ControlOptions);

        /**
          * Sets the position of the control. See control positions.
          */
        setPosition(position: string): Control;

        /**
          * Returns the current position of the control.
          */
        getPosition(): string;

        /**
          * Adds the control to the map.
          */
        addTo(map: Map): Control;

        /**
          * Removes the control from the map.
          */
        removeFrom(map: Map): Control;

        /**
          * Returns the HTML container of the control.
          */
        getContainer(): HTMLElement;

        // IControl members

        /**
          * Should contain code that creates all the neccessary DOM elements for the
          * control, adds listeners on relevant map events, and returns the element
          * containing the control. Called on map.addControl(control) or control.addTo(map).
          */
        onAdd(map: Map): HTMLElement;

        /**
          * Optional, should contain all clean up code (e.g. removes control's event
          * listeners). Called on map.removeControl(control) or control.removeFrom(map).
          * The control's DOM container is removed automatically.
          */
        onRemove(map: Map): void;
    }

    module Control {

        export class Zoom extends L.Control {

            /**
              * Creates a zoom control.
              */
            constructor(options?: ZoomOptions);
        }

        export class Attribution extends L.Control {

            /**
              * Creates an attribution control.
              */
            constructor(options?: AttributionOptions);

            /**
              * Sets the text before the attributions.
              */
            setPrefix(prefix: string): Attribution;

            /**
              * Adds an attribution text (e.g. 'Vector data &copy; CloudMade').
              */
            addAttribution(text: string): Attribution;

            /**
              * Removes an attribution text.
              */
            removeAttribution(text: string): Attribution;

        }

        export class Layers extends L.Control implements IEventPowered<Layers> {

            /**
              * Creates an attribution control with the given layers. Base layers will be
              * switched with radio buttons, while overlays will be switched with checkboxes.
              */
            constructor(baseLayers?: any, overlays?: any, options?: LayersOptions);

            /**
              * Adds a base layer (radio button entry) with the given name to the control.
              */
            addBaseLayer(layer: ILayer, name: string): Layers;

            /**
              * Adds an overlay (checkbox entry) with the given name to the control.
              */
            addOverlay(layer: ILayer, name: string): Layers;

            /**
              * Remove the given layer from the control.
              */
            removeLayer(layer: ILayer): Layers;

            ////////////////
            ////////////////
            addEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Layers;
            addOneTimeEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Layers;
            removeEventListener(type: string, fn?: (e: LeafletEvent) => void, context?: any): Layers;
            hasEventListeners(type: string): boolean;
            fireEvent(type: string, data?: any): Layers;
            on(type: string, fn: (e: LeafletEvent) => void, context?: any): Layers;
            once(type: string, fn: (e: LeafletEvent) => void, context?: any): Layers;
            off(type: string, fn?: (e: LeafletEvent) => void, context?: any): Layers;
            fire(type: string, data?: any): Layers;
            addEventListener(eventMap: any, context?: any): Layers;
            removeEventListener(eventMap?: any, context?: any): Layers;
            clearAllEventListeners(): Layers;
            on(eventMap: any, context?: any): Layers;
            off(eventMap?: any, context?: any): Layers;
        }

        export class Scale extends L.Control {

            /**
              * Creates an scale control with the given options.
              */
            constructor(options?: ScaleOptions);

        }
    }

    export class control {

        /**
          * Creates a control with the given options.
          */
        function (options?: ControlOptions): Control;

        /**
          * Creates a zoom control.
          */
        static zoom(options?: ZoomOptions): L.Control.Zoom;

        /**
          * Creates an attribution control.
          */
        static attribution(options?: AttributionOptions): L.Control.Attribution;

        /**
            * Creates an attribution control with the given layers. Base layers will be
            * switched with radio buttons, while overlays will be switched with checkboxes.
            */
        static layers(baseLayers?: any, overlays?: any, options?: LayersOptions): L.Control.Layers;

        /**
          * Creates an scale control with the given options.
          */
        static scale(options?: ScaleOptions): L.Control.Scale;
    }
}
 
declare module L {

    export interface ControlOptions {

        /**
          * The initial position of the control (one of the map corners). See control
          * positions.
          * Default value: 'topright'.
          */
        position?: string;

    }
}
 
declare module L {

    export class CRS {

        /**
          * The most common CRS for online maps, used by almost all free and commercial
          * tile providers. Uses Spherical Mercator projection. Set in by default in
          * Map's crs option.
          */
        static EPSG3857: ICRS;
    
        /**
          * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
          */
        static EPSG4326: ICRS;
    
        /**
          * Rarely used by some commercial tile providers. Uses Elliptical Mercator
          * projection.
          */
        static EPSG3395: ICRS;
    
        /**
          * A simple CRS that maps longitude and latitude into x and y directly. May be
          * used for maps of flat surfaces (e.g. game maps). Note that the y axis should
          * still be inverted (going from bottom to top).
          */
        static Simple: ICRS;
    
    }
}
 
declare module L {

    /**
      * Creates a div icon instance with the given options.
      */
    function divIcon(options: DivIconOptions): DivIcon;

    export class DivIcon extends Icon {

        /**
          * Creates a div icon instance with the given options.
          */
        constructor(options: DivIconOptions);
    }
}
 
declare module L {

    export interface DivIconOptions {

        /**
          * Size of the icon in pixels. Can be also set through CSS.
          */
        iconSize?: Point;
    
        /**
          * The coordinates of the "tip" of the icon (relative to its top left corner).
          * The icon will be aligned so that this point is at the marker's geographical
          * location. Centered by default if size is specified, also can be set in CSS
          * with negative margins.
          */
        iconAnchor?: Point;
    
        /**
          * A custom class name to assign to the icon.
          *
          * Default value: 'leaflet-div-icon'.
          */
        className?: string;
    
        /**
          * A custom HTML code to put inside the div element.
          *
          * Default value: ''.
          */
        html?: string;
    
    }
}
 
declare module L {

    export class DomEvent {

        /**
          * Adds a listener fn to the element's DOM event of the specified type. this keyword
          * inside the listener will point to context, or to the element if not specified.
          */
        static addListener(el: HTMLElement, type: string, fn: (e: Event) => void, context?: any): DomEvent;
        static on(el: HTMLElement, type: string, fn: (e: Event) => void, context?: any): DomEvent;
    
        /**
          * Removes an event listener from the element.
          */
        static removeListener(el: HTMLElement, type: string, fn: (e: Event) => void, context?: any): DomEvent;
        static off(el: HTMLElement, type: string, fn: (e: Event) => void, context?: any): DomEvent;
    
        /**
          * Stop the given event from propagation to parent elements. Used inside the
          * listener functions:
          * L.DomEvent.addListener(div, 'click', function
          * (e) {
          * L.DomEvent.stopPropagation(e);
          * });
          */
        static stopPropagation(e: Event): DomEvent;
    
        /**
          * Prevents the default action of the event from happening (such as following
          * a link in the href of the a element, or doing a POST request with page reload
          * when form is submitted). Use it inside listener functions.
          */
        static preventDefault(e: Event): DomEvent;
    
        /**
          * Does stopPropagation and preventDefault at the same time.
          */
        static stop(e: Event): DomEvent;
    
        /**
          * Adds stopPropagation to the element's 'click', 'doubleclick', 'mousedown'
          * and 'touchstart' events.
          */
        static disableClickPropagation(el: HTMLElement): DomEvent;
    
        /**
          * Gets normalized mouse position from a DOM event relative to the container
          * or to the whole page if not specified.
          */
        static getMousePosition(e: Event, container?: HTMLElement): Point;
    
        /**
          * Gets normalized wheel delta from a mousewheel DOM event.
          */
        static getWheelDelta(e: Event): number;
    
    }
}
 
declare module L {

    export class DomUtil {

        /**
          * Returns an element with the given id if a string was passed, or just returns
          * the element if it was passed directly.
          */
        static get(id: string): HTMLElement;
    
        /**
          * Returns the value for a certain style attribute on an element, including
          * computed values or values set through CSS.
          */
        static getStyle(el: HTMLElement, style: string): string;
    
        /**
          * Returns the offset to the viewport for the requested element.
          */
        static getViewportOffset(el: HTMLElement): Point;
    
        /**
          * Creates an element with tagName, sets the className, and optionally appends
          * it to container element.
          */
        static create(tagName: string, className: string, container?: HTMLElement): HTMLElement;
    
        /**
          * Makes sure text cannot be selected, for example during dragging.
          */
        static disableTextSelection(): void;
    
        /**
          * Makes text selection possible again.
          */
        static enableTextSelection(): void;
    
        /**
          * Returns true if the element class attribute contains name.
          */
        static hasClass(el: HTMLElement, name: string): boolean;
    
        /**
          * Adds name to the element's class attribute.
          */
        static addClass(el: HTMLElement, name: string): void;
    
        /**
          * Removes name from the element's class attribute.
          */
        static removeClass(el: HTMLElement, name: string): void;
    
        /**
          * Set the opacity of an element (including old IE support). Value must be from
          * 0 to 1.
          */
        static setOpacity(el: HTMLElement, value: number): void;
    
        /**
          * Goes through the array of style names and returns the first name that is a valid
          * style name for an element. If no such name is found, it returns false. Useful
          * for vendor-prefixed styles like transform.
          */
        static testProp(props: string[]): any;
    
        /**
          * Returns a CSS transform string to move an element by the offset provided in
          * the given point. Uses 3D translate on WebKit for hardware-accelerated transforms
          * and 2D on other browsers.
          */
        static getTranslateString(point: Point): string;
    
        /**
          * Returns a CSS transform string to scale an element (with the given scale origin).
          */
        static getScaleString(scale: number, origin: Point): string;
    
        /**
          * Sets the position of an element to coordinates specified by point, using
          * CSS translate or top/left positioning depending on the browser (used by
          * Leaflet internally to position its layers). Forces top/left positioning
          * if disable3D is true.
          */
        static setPosition(el: HTMLElement, point: Point, disable3D?: boolean): void;
    
        /**
          * Returns the coordinates of an element previously positioned with setPosition.
          */
        static getPosition(el: HTMLElement): Point;
    
        /**
          * Vendor-prefixed transition style name (e.g. 'webkitTransition' for WebKit).
          */
        static TRANSITION: string;
    
        /**
          * Vendor-prefixed transform style name.
          */
        static TRANSFORM: string;
    
    }
}
 
declare module L {

    /**
      * Creates a Draggable object for moving the given element when you start dragging
      * the dragHandle element (equals the element itself by default).
      */
    function draggable(element: HTMLElement, dragHandle?: HTMLElement): Draggable;

    export class Draggable extends Class implements IEventPowered<Draggable> {

        /**
          * Creates a Draggable object for moving the given element when you start dragging
          * the dragHandle element (equals the element itself by default).
          */
        constructor(element: HTMLElement, dragHandle?: HTMLElement);
    
        /**
          * Enables the dragging ability.
          */
        enable(): void;
    
        /**
          * Disables the dragging ability.
          */
        disable(): void;
        
        ////////////////
        ////////////////
        addEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Draggable;
        addOneTimeEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Draggable;
        removeEventListener(type: string, fn?: (e: LeafletEvent) => void, context?: any): Draggable;
        hasEventListeners(type: string): boolean;
        fireEvent(type: string, data?: any): Draggable;
        on(type: string, fn: (e: LeafletEvent) => void, context?: any): Draggable;
        once(type: string, fn: (e: LeafletEvent) => void, context?: any): Draggable;
        off(type: string, fn?: (e: LeafletEvent) => void, context?: any): Draggable;
        fire(type: string, data?: any): Draggable;
        addEventListener(eventMap: any, context?: any): Draggable;
        removeEventListener(eventMap?: any, context?: any): Draggable;
        clearAllEventListeners(): Draggable;
        on(eventMap: any, context?: any): Draggable;
        off(eventMap?: any, context?: any): Draggable;
    }
} 
 
 
 
declare module L {

    /**
      * Create a layer group, optionally given an initial set of layers.
      */
    function featureGroup<T extends ILayer>(layers?: T[]): FeatureGroup<T>;

    export class FeatureGroup<T extends ILayer> extends LayerGroup<T> implements ILayer, IEventPowered<FeatureGroup<T>> {
        sid: any;
        /**
          * Create a layer group, optionally given an initial set of layers.
          */
        constructor(layers?: T[]);
    
        /**
          * Binds a popup with a particular HTML content to a click on any layer from the
          * group that has a bindPopup method.
          */
        bindPopup(htmlContent: string, options?: PopupOptions): FeatureGroup<T>;
    
        /**
          * Returns the LatLngBounds of the Feature Group (created from bounds and coordinates
          * of its children).
          */
        getBounds(): LatLngBounds;
    
        /**
          * Sets the given path options to each layer of the group that has a setStyle method.
          */
        setStyle(style: PathOptions): FeatureGroup<T>;
    
        /**
          * Brings the layer group to the top of all other layers.
          */
        bringToFront(): FeatureGroup<T>;
    
        /**
          * Brings the layer group to the bottom of all other layers.
          */
        bringToBack(): FeatureGroup<T>;

        ////////////
        ////////////
        /**
          * Should contain code that creates DOM elements for the overlay, adds them
          * to map panes where they should belong and puts listeners on relevant map events.
          * Called on map.addLayer(layer).
          */
        onAdd(map: Map): void;
    
        /**
          * Should contain all clean up code that removes the overlay's elements from
          * the DOM and removes listeners previously added in onAdd. Called on map.removeLayer(layer).
          */
        onRemove(map: Map): void;
        
        ////////////////
        ////////////////
        addEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): FeatureGroup<T>;
        addOneTimeEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): FeatureGroup<T>;
        removeEventListener(type: string, fn?: (e: LeafletEvent) => void, context?: any): FeatureGroup<T>;
        hasEventListeners(type: string): boolean;
        fireEvent(type: string, data?: any): FeatureGroup<T>;
        on(type: string, fn: (e: LeafletEvent) => void, context?: any): FeatureGroup<T>;
        once(type: string, fn: (e: LeafletEvent) => void, context?: any): FeatureGroup<T>;
        off(type: string, fn?: (e: LeafletEvent) => void, context?: any): FeatureGroup<T>;
        fire(type: string, data?: any): FeatureGroup<T>;
        addEventListener(eventMap: any, context?: any): FeatureGroup<T>;
        removeEventListener(eventMap?: any, context?: any): FeatureGroup<T>;
        clearAllEventListeners(): FeatureGroup<T>;
        on(eventMap: any, context?: any): FeatureGroup<T>;
        off(eventMap?: any, context?: any): FeatureGroup<T>;
    }
}
 
declare module L {

    export interface FitBoundsOptions extends ZoomPanOptions {

        /**
          * Sets the amount of padding in the top left corner of a map container that
          * shouldn't be accounted for when setting the view to fit bounds. Useful if
          * you have some control overlays on the map like a sidebar and you don't
          * want them to obscure objects you're zooming to.
          *
          * Default value: [0, 0].
          */
        paddingTopLeft?: Point;

        /**
          * The same for bottom right corner of the map.
          * 
          * Default value: [0, 0].
          */
        paddingBottomRight?: Point;

        /**
          * Equivalent of setting both top left and bottom right padding to the same value.
          * 
          * Default value: [0, 0].
          */
        padding?: Point;

        /**
          * The maximum possible zoom to use.
          *
          * Default value: null
          */
        maxZoom?: number;
    }
}
 
declare module L {

    /**
      * Creates a GeoJSON layer. Optionally accepts an object in GeoJSON format
      * to display on the map (you can alternatively add it later with addData method)
      * and an options object.
      */
    function geoJson(geojson?: any, options?: GeoJSONOptions): GeoJSON;

    export class GeoJSON extends FeatureGroup<ILayer> {

        /**
          * Creates a GeoJSON layer. Optionally accepts an object in GeoJSON format
          * to display on the map (you can alternatively add it later with addData method)
          * and an options object.
          */
        constructor(geojson?: any, options?: GeoJSONOptions);
    
        /**
          * Adds a GeoJSON object to the layer. 
          */
        addData(data: any): boolean;
    
        /**
          * Changes styles of GeoJSON vector layers with the given style function.
          */
        setStyle(style: (featureData: any) => any): GeoJSON;
        
        /**
          * Changes styles of GeoJSON vector layers with the given style options.
          */
        setStyle(style: PathOptions): GeoJSON;
    
        /**
          * Resets the the given vector layer's style to the original GeoJSON style,
          * useful for resetting style after hover events.
          */
        resetStyle(layer: Path): GeoJSON;
    
        /**
          * Creates a layer from a given GeoJSON feature.
          */
        static geometryToLayer(featureData: GeoJSON, pointToLayer?: (featureData: any, latlng: LatLng) => ILayer): ILayer;
    
        /**
          * Creates a LatLng object from an array of 2 numbers (latitude, longitude)
          * used in GeoJSON for points. If reverse is set to true, the numbers will be interpreted
          * as (longitude, latitude).
          */
        static coordsToLatlng(coords: number[], reverse?: boolean): LatLng;
    
        /**
          * Creates a multidimensional array of LatLng objects from a GeoJSON coordinates
          * array. levelsDeep specifies the nesting level (0 is for an array of points,
          * 1 for an array of arrays of points, etc., 0 by default). If reverse is set to
          * true, the numbers will be interpreted as (longitude, latitude).
          */
        static coordsToLatlngs(coords: number[], levelsDeep?: number, reverse?: boolean): LatLng[];
    
    }
}
 
declare module L {
    export interface GeoJSONOptions {
        /**
          * Function that will be used for creating layers for GeoJSON points (if not
          * specified, simple markers will be created).
          */
        pointToLayer?: (featureData: any, latlng: LatLng) => ILayer;

        /**
          * Function that will be used to get style options for vector layers created
          * for GeoJSON features.
          */
        style?: (featureData: any) => any;

        /**
          * Function that will be called on each created feature layer. Useful for attaching
          * events and popups to features.
          */
        onEachFeature?: (featureData: any, layer: ILayer) => void;

        /**
          * Function that will be used to decide whether to show a feature or not.
          */
        filter?: (featureData: any, layer: ILayer) => boolean;

        /**
          * Function that will be used for converting GeoJSON coordinates to LatLng points
          * (if not specified, coords will be assumed to be WGS84 � standard[longitude, latitude]
          * values in degrees).
          */
        coordsToLatLng?: (coords: any[]) => LatLng[];
    }
}

 
 
 
declare module L {

    /**
      * Creates an icon instance with the given options.
      */
    function icon(options: IconOptions): Icon;

    export class Icon extends Class {

        /**
          * Creates an icon instance with the given options.
          */
        constructor(options: IconOptions);
    }

    module Icon {

        /**
          * L.Icon.Default extends L.Icon and is the blue icon Leaflet uses
          * for markers by default.
          */
        export class Default extends Icon {

            /**
              * Creates a default icon instance with the given options.
              */
            constructor(options?: IconOptions);

            static imagePath: string;
        }
    }
}
 
declare module L {

    export interface IconOptions {

        /**
          * (required) The URL to the icon image (absolute or relative to your script
          * path).
          */
        iconUrl?: string;
    
        /**
          * The URL to a retina sized version of the icon image (absolute or relative to
          * your script path). Used for Retina screen devices.
          */
        iconRetinaUrl?: string;
    
        /**
          * Size of the icon image in pixels.
          */
        iconSize?: Point;
    
        /**
          * The coordinates of the "tip" of the icon (relative to its top left corner).
          * The icon will be aligned so that this point is at the marker's geographical
          * location. Centered by default if size is specified, also can be set in CSS
          * with negative margins.
          */
        iconAnchor?: Point;
    
        /**
          * The URL to the icon shadow image. If not specified, no shadow image will be
          * created.
          */
        shadowUrl?: string;
    
        /**
          * The URL to the retina sized version of the icon shadow image. If not specified,
          * no shadow image will be created. Used for Retina screen devices.
          */
        shadowRetinaUrl?: string;
    
        /**
          * Size of the shadow image in pixels.
          */
        shadowSize?: Point;
    
        /**
          * The coordinates of the "tip" of the shadow (relative to its top left corner)
          * (the same as iconAnchor if not specified).
          */
        shadowAnchor?: Point;
    
        /**
          * The coordinates of the point from which popups will "open", relative to the
          * icon anchor.
          */
        popupAnchor?: Point;
    
        /**
          * A custom class name to assign to both icon and shadow images. Empty by default.
          */
        className?: string;
    }
}
 
declare module L {

    export interface IControl {

        /**
          * Should contain code that creates all the neccessary DOM elements for the
          * control, adds listeners on relevant map events, and returns the element
          * containing the control. Called on map.addControl(control) or control.addTo(map).
          */
        onAdd(map: Map): HTMLElement;
    
        /**
          * Optional, should contain all clean up code (e.g. removes control's event
          * listeners). Called on map.removeControl(control) or control.removeFrom(map).
          * The control's DOM container is removed automatically.
          */
        onRemove(map: Map): void;
    }
}
 
declare module L {

    export interface ICRS {

        /**
          * Projection that this CRS uses.
          */
        projection: IProjection;
    
        /**
          * Transformation that this CRS uses to turn projected coordinates into screen
          * coordinates for a particular tile service.
          */
        transformation: Transformation;
    
        /**
          * Standard code name of the CRS passed into WMS services (e.g. 'EPSG:3857').
          */
        code: string;
    
        /**
          * Projects geographical coordinates on a given zoom into pixel coordinates.
          */
        latLngToPoint(latlng: LatLng, zoom: number): Point;
    
        /**
          * The inverse of latLngToPoint. Projects pixel coordinates on a given zoom
          * into geographical coordinates.
          */
        pointToLatLng(point: Point, zoom: number): LatLng;
    
        /**
          * Projects geographical coordinates into coordinates in units accepted
          * for this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
          */
        project(latlng: LatLng): Point;
    
        /**
          * Returns the scale used when transforming projected coordinates into pixel
          * coordinates for a particular zoom. For example, it returns 256 * 2^zoom for
          * Mercator-based CRS.
          */
        scale(zoom: number): number;

        /**
          * Returns the size of the world in pixels for a particular zoom.
          */
        getSize(zoom: number): Point;
        
    }
}
 
declare module L {

    export interface IEventPowered<T> {

        /**
          * Adds a listener function (fn) to a particular event type of the object. You
          * can optionally specify the context of the listener (object the this keyword
          * will point to). You can also pass several space-separated types (e.g. 'click
          * dblclick').
          */
        addEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): T;
        
        /**
          * The same as above except the listener will only get fired once and then removed.
          */
        addOneTimeEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): T;
        /**
          * Adds a set of type/listener pairs, e.g. {click: onClick, mousemove: onMouseMove}
          */
        addEventListener(eventMap: any, context?: any): T;
        
        /**
          * Removes a previously added listener function. If no function is specified,
          * it will remove all the listeners of that particular event from the object.
          */
        removeEventListener(type: string, fn?: (e: LeafletEvent) => void, context?: any): T;
        
        /**
          * Removes a set of type/listener pairs.
          */
        removeEventListener(eventMap?: any, context?: any): T;
    
        /**
          * Returns true if a particular event type has some listeners attached to it.
          */
        hasEventListeners(type: string): boolean;
        
        /**
          * Fires an event of the specified type. You can optionally provide an data object
          * — the first argument of the listener function will contain its properties.
          */
        fireEvent(type: string, data?: any): T;
                
        /**
          * Removes all listeners to all events on the object.
          */
        clearAllEventListeners(): T;

        /**
          * Alias to addEventListener.
          */
        on(type: string, fn: (e: LeafletEvent) => void, context?: any): T;

        /**
          * Alias to addEventListener.
          */
        on(eventMap: any, context?: any): T;

        /**
          * Alias to addOneTimeEventListener.
          */
        once(type: string, fn: (e: LeafletEvent) => void, context?: any): T;

        /**
          * Alias to removeEventListener.
          */
        off(type: string, fn?: (e: LeafletEvent) => void, context?: any): T;

        /**
          * Alias to removeEventListener.
          */
        off(eventMap?: any, context?: any): T;
        
        /**
          * Alias to fireEvent.
          */
        fire(type: string, data?: any): T;
    }
}
 
declare module L {

    export interface IHandler {

        /**
          * Enables the handler.
          */
        enable(): void;
    
        /**
          * Disables the handler.
          */
        disable(): void;
    
        /**
          * Returns true if the handler is enabled.
          */
        enabled(): boolean;
    }

    export class Handler extends Class {
        initialize(map: Map): void;
    }
}
 
declare module L {

    export interface ILayer {

        /**
          * Should contain code that creates DOM elements for the overlay, adds them
          * to map panes where they should belong and puts listeners on relevant map events.
          * Called on map.addLayer(layer).
          */
        onAdd(map: Map): void;
    
        /**
          * Should contain all clean up code that removes the overlay's elements from
          * the DOM and removes listeners previously added in onAdd. Called on map.removeLayer(layer).
          */
        onRemove(map: Map): void;
    }
}

declare module L {
    export module Mixin {
        export interface LeafletMixinEvents extends IEventPowered<LeafletMixinEvents> {
        }

        export var Events: LeafletMixinEvents;
    }
}
 
declare module L {

    /**
      * Instantiates an image overlay object given the URL of the image and the geographical
      * bounds it is tied to.
      */
    function imageOverlay(imageUrl: string, bounds: LatLngBounds, options?: ImageOverlayOptions): ImageOverlay;

    export class ImageOverlay extends Class implements ILayer {

        /**
          * Instantiates an image overlay object given the URL of the image and the geographical
          * bounds it is tied to.
          */
        constructor(imageUrl: string, bounds: LatLngBounds, options?: ImageOverlayOptions);

        /**
          * Adds the overlay to the map.
          */
        addTo(map: Map): ImageOverlay;
    
        /**
          * Sets the opacity of the overlay.
          */
        setOpacity(opacity: number): ImageOverlay;

        /**
          * Changes the URL of the image.
          */
        setUrl(imageUrl: string): ImageOverlay; 
    
        /**
          * Brings the layer to the top of all overlays.
          */
        bringToFront(): ImageOverlay;
    
        /**
          * Brings the layer to the bottom of all overlays.
          */
        bringToBack(): ImageOverlay;

        ////////////
        ////////////
        /**
          * Should contain code that creates DOM elements for the overlay, adds them
          * to map panes where they should belong and puts listeners on relevant map events.
          * Called on map.addLayer(layer).
          */
        onAdd(map: Map): void;
    
        /**
          * Should contain all clean up code that removes the overlay's elements from
          * the DOM and removes listeners previously added in onAdd. Called on map.removeLayer(layer).
          */
        onRemove(map: Map): void;
    }
}
 
declare module L {

    export interface ImageOverlayOptions {

        /**
          * The opacity of the image overlay.
          */
        opacity?: number;
    }
}
 
declare module L {

    export interface IProjection {

        /**
          * Projects geographical coordinates into a 2D point.
          */
        project(latlng: LatLng): Point;
    
        /**
          * The inverse of project. Projects a 2D point into geographical location.
          */
        unproject(point: Point): LatLng;
    }
}
 
declare module L {

    /**
    * A constant that represents the Leaflet version in use.
    */
    export var version: string;

    /**
    * This method restores the L global variale to the original value it had
    * before Leaflet inclusion, and returns the real Leaflet namespace.
    */
    export function noConflict(): typeof L;
}
 
declare module L {

    /**
      * Creates an object representing a geographical point with the given latitude
      * and longitude.
      */
    function latLng(latitude: number, longitude: number): LatLng;

    /**
      * Creates an object representing a geographical point with the given latitude
      * and longitude.
      */
    function latLng(coords: number[]): LatLng;

    export class LatLng {

        /**
          * Creates an object representing a geographical point with the given latitude
          * and longitude.
          */
        constructor(latitude: number, longitude: number);
    
        /**
          * Creates an object representing a geographical point with the given latitude
          * and longitude.
          */
        constructor(coords: number[]);

        /**
          * Returns the distance (in meters) to the given LatLng calculated using the
          * Haversine formula. See description on wikipedia
          */
        distanceTo(otherLatlng: LatLng): number;
    
        /**
          * Returns true if the given LatLng point is at the same position (within a small
          * margin of error).
          */
        equals(otherLatlng: LatLng): boolean;
    
        /**
          * Returns a string representation of the point (for debugging purposes).
          */
        toString(): string;
    
        /**
          * Returns a new LatLng object with the longitude wrapped around left and right
          * boundaries (-180 to 180 by default).
          */
        wrap(left: number, right: number): LatLng;
    
        /**
          * Latitude in degrees.
          */
        lat: number;
    
        /**
          * Longitude in degrees.
          */
        lng: number;

        /**
          * A multiplier for converting degrees into radians.
          *
          * Value: Math.PI / 180.
          */
        static DEG_TO_RAD: number;		

        /**
          * A multiplier for converting radians into degrees.
          *
          * Value: 180 / Math.PI.
          */
        static RAD_TO_DEG: number;

        /**
          * Max margin of error for the equality check.
          *
          * Value: 1.0E-9.
          */
        static MAX_MARGIN: number;
    }
}
 
declare module L {

    /**
      * Creates a LatLngBounds object by defining south-west and north-east corners
      * of the rectangle.
      */
    function latLngBounds(southWest: LatLng, northEast: LatLng): LatLngBounds;

    /**
      * Creates a LatLngBounds object defined by the geographical points it contains.
      * Very useful for zooming the map to fit a particular set of locations with fitBounds.
      */
    function latLngBounds(latlngs: LatLng[]): LatLngBounds;

    export class LatLngBounds {

        /**
          * Creates a LatLngBounds object by defining south-west and north-east corners
          * of the rectangle.
          */
        constructor(southWest: LatLng, northEast: LatLng);
    
        /**
          * Creates a LatLngBounds object defined by the geographical points it contains.
          * Very useful for zooming the map to fit a particular set of locations with fitBounds.
          */
        constructor(latlngs: LatLng[]);

        /**
          * Extends the bounds to contain the given point.
          */
        extend(latlng: LatLng): LatLngBounds;
    
        /**
          * Extends the bounds to contain the given bounds.
          */
        extend(latlng: LatLngBounds): LatLngBounds;

        /**
          * Returns the south-west point of the bounds.
          */
        getSouthWest(): LatLng;
    
        /**
          * Returns the north-east point of the bounds.
          */
        getNorthEast(): LatLng;
    
        /**
          * Returns the north-west point of the bounds.
          */
        getNorthWest(): LatLng;
    
        /**
          * Returns the south-east point of the bounds.
          */
        getSouthEast(): LatLng;
    
        /**
          * Returns the center point of the bounds.
          */
        getCenter(): LatLng;
    
        /**
          * Returns true if the rectangle contains the given one.
          */
        contains(otherBounds: LatLngBounds): boolean;
    
        /**
          * Returns true if the rectangle contains the given point.
          */
        contains(latlng: LatLng): boolean;
    
        /**
          * Returns true if the rectangle intersects the given bounds.
          */
        intersects(otherBounds: LatLngBounds): boolean;
    
        /**
          * Returns true if the rectangle is equivalent (within a small margin of error)
          * to the given bounds.
          */
        equals(otherBounds: LatLngBounds): boolean;
    
        /**
          * Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat'
          * format. Useful for sending requests to web services that return geo data.
          */
        toBBoxString(): string;
    
        /**
          * Returns bigger bounds created by extending the current bounds by a given
          * percentage in each direction.
          */
        pad(bufferRatio: number): LatLngBounds;
    
        /**
          * Returns true if the bounds are properly initialized.
          */
        isValid(): boolean;
    
    }
}
 
declare module L {

    /**
      * Create a layer group, optionally given an initial set of layers.
      */
    function layerGroup<T extends ILayer>(layers?: T[]): LayerGroup<T>;

    export class LayerGroup<T extends ILayer> extends Class implements ILayer {

        /**
          * Create a layer group, optionally given an initial set of layers.
          */
        constructor(layers?: T[]);
    
        /**
          * Adds the group of layers to the map.
          */
        addTo(map: Map): LayerGroup<T>;
    
        /**
          * Adds a given layer to the group.
          */
        addLayer(layer: T): LayerGroup<T>;
    
        /**
          * Removes a given layer from the group.
          */
        removeLayer(layer: T): LayerGroup<T>;
    
        /**
          * Removes a given layer of the given id from the group.
          */
        removeLayer(id: string): LayerGroup<T>;

        /**
          * Returns true if the given layer is currently added to the group.
          */
        hasLayer(layer: T): boolean;

        /**
          * Returns the layer with the given id.
          */
        getLayer(id: string): T;

        /**
          * Returns an array of all the layers added to the group.
          */
        getLayers(): T[];

        /**
          * Removes all the layers from the group.
          */
        clearLayers(): LayerGroup<T>;
    
        /**
          * Iterates over the layers of the group, optionally specifying context of
          * the iterator function.
          */
        eachLayer(fn: (layer: T) => void, context?: any): LayerGroup<T>;

        /**
          * Returns a GeoJSON representation of the layer group (GeoJSON FeatureCollection).
          */
        toGeoJSON(): any;

        ////////////
        ////////////
        /**
          * Should contain code that creates DOM elements for the overlay, adds them
          * to map panes where they should belong and puts listeners on relevant map events.
          * Called on map.addLayer(layer).
          */
        onAdd(map: Map): void;
    
        /**
          * Should contain all clean up code that removes the overlay's elements from
          * the DOM and removes listeners previously added in onAdd. Called on map.removeLayer(layer).
          */
        onRemove(map: Map): void;
    }
}
 
 
declare module L {

    export interface LayersOptions {

        /**
          * The position of the control (one of the map corners). See control positions.
          *
          * Default value: 'topright'.
          */
        position?: string;
    
        /**
          * If true, the control will be collapsed into an icon and expanded on mouse hover
          * or touch.
          *
          * Default value: true.
          */
        collapsed?: boolean;
    
        /**
          * If true, the control will assign zIndexes in increasing order to all of its
          * layers so that the order is preserved when switching them on/off.
          *
          * Default value: true.
          */
        autoZIndex?: boolean;
    
    }
}
 
declare module L {

    export interface LeafletErrorEvent extends LeafletEvent {

        /**
          * Error message.
          */
        message: string;
    
        /**
          * Error code (if applicable).
          */
        code: number;
    }
}
 
declare module L {

    export interface LeafletEvent {

        /**
          * The event type (e.g. 'click').
          */
        type: string;

        /**
          * The object that fired the event.
          */
        target: any;
    }
}
 
declare module L {

    export interface LeafletGeoJSONEvent extends LeafletEvent {

        /**
          * The layer for the GeoJSON feature that is being added to the map.
          */
        layer: ILayer;
    
        /**
          * GeoJSON properties of the feature.
          */
        properties: any;
    
        /**
          * GeoJSON geometry type of the feature.
          */
        geometryType: string;
    
        /**
          * GeoJSON ID of the feature (if present).
          */
        id: string;
    }
}
 
declare module L {

    export interface LeafletLayerEvent extends LeafletEvent {

        /**
          * The layer that was added or removed.
          */
        layer: ILayer;
    }
}
 
declare module L {

    export interface LeafletLocationEvent extends LeafletEvent {

        /**
          * Detected geographical location of the user.
          */
        latlng: LatLng;
    
        /**
          * Geographical bounds of the area user is located in (with respect to the accuracy
          * of location).
          */
        bounds: LatLngBounds;
    
        /**
          * Accuracy of location in meters.
          */
        accuracy: number;

        /**
          * Height of the position above the WGS84 ellipsoid in meters.
          */
        altitude: number;

        /**
          * Accuracy of altitude in meters.
          */
        altitudeAccuracy: number;

        /**
          * The direction of travel in degrees counting clockwise from true North.
          */
        heading: number;

        /**
          * Current velocity in meters per second.
          */
        speed: number;

        /**
          * The time when the position was acquired.
          */
        timestamp: number;
    
    }
}
 
declare module L {

    export interface LeafletMouseEvent extends LeafletEvent {

        /**
          * The geographical point where the mouse event occured.
          */
        latlng: LatLng;
    
        /**
          * Pixel coordinates of the point where the mouse event occured relative to
          * the map layer.
          */
        layerPoint: Point;
    
        /**
          * Pixel coordinates of the point where the mouse event occured relative to
          * the map сontainer.
          */
        containerPoint: Point;
    
        /**
          * The original DOM mouse event fired by the browser.
          */
        originalEvent: MouseEvent;
    }
}
 
declare module L {

    export interface LeafletPopupEvent extends LeafletEvent {

        /**
          * The popup that was opened or closed.
          */
        popup: Popup;
    }
}

declare module L {

    export interface LeafletDragEndEvent extends LeafletEvent {

        /**
          * The distance in pixels the draggable element was moved by.
          */
        distance: number;
    }
}
 
declare module L {

    export interface LeafletResizeEvent extends LeafletEvent {

        /**
          * The old size before resize event.
          */
        oldSize: Point;
        
        /**
          * The new size after the resize event.
          */
        newSize: Point;
    }
}
 
declare module L {

    export interface LeafletTileEvent extends LeafletEvent {

        /**
          * The tile element (image).
          */
        tile: HTMLElement;
    
        /**
          * The source URL of the tile.
          */
        url: string;
    }
}
 
declare module L {

    export class LineUtil {

        /**
          * Dramatically reduces the number of points in a polyline while retaining
          * its shape and returns a new array of simplified points. Used for a huge performance
          * boost when processing/displaying Leaflet polylines for each zoom level
          * and also reducing visual noise. tolerance affects the amount of simplification
          * (lesser value means higher quality but slower and with more points). Also
          * released as a separated micro-library Simplify.js.
          */
        static simplify(points: Point[], tolerance: number): Point[];
    
        /**
          * Returns the distance between point p and segment p1 to p2.
          */
        static pointToSegmentDistance(p: Point, p1: Point, p2: Point): number;
    
        /**
          * Returns the closest point from a point p on a segment p1 to p2.
          */
        static closestPointOnSegment(p: Point, p1: Point, p2: Point): number;
    
        /**
          * Clips the segment a to b by rectangular bounds (modifying the segment points
          * directly!). Used by Leaflet to only show polyline points that are on the screen
          * or near, increasing performance.
          */
        static clipSegment(a: Point, b: Point, bounds: Bounds): void;
    
    }
}
 
declare module L {

    export interface LocateOptions {

        /**
          * If true, starts continous watching of location changes (instead of detecting
          * it once) using W3C watchPosition method. You can later stop watching using
          * map.stopLocate() method.
          *
          * Default value: false.
          */
        watch?: boolean;
        
        /**
          * If true, automatically sets the map view to the user location with respect
          * to detection accuracy, or to world view if geolocation failed.
          *
          * Default value: false.
          */
        setView?: boolean;
        
        /**
          * The maximum zoom for automatic view setting when using `setView` option.
          *
          * Default value: Infinity.
          */
        maxZoom?: number;
        
        /**
          * Number of millisecond to wait for a response from geolocation before firing
          * a locationerror event.
          *
          * Default value: 10000.
          */
        timeout?: number;
        
        /**
          * Maximum age of detected location. If less than this amount of milliseconds
          * passed since last geolocation response, locate will return a cached location.
          *
          * Default value: 0.
          */
        maximumAge?: number;
        
        /**
          * Enables high accuracy, see description in the W3C spec.
          *
          * Default value: false.
          */
        enableHighAccuracy?: boolean;
    }
}
 
declare module L {

    /**
      * Instantiates a map object given a div element and optionally an
      * object literal with map options described below.
      */
    function map(id: HTMLElement, options?: MapOptions): Map;

    /**
      * Instantiates a map object given a div element id and optionally an
      * object literal with map options described below.
      */
    function map(id: string, options?: MapOptions): Map;

    export class Map extends Class implements IEventPowered<Map> {

        /**
          * Instantiates a map object given a div element and optionally an
          * object literal with map options described below.
          *
          * @constructor
          */
        constructor(id: HTMLElement, options?: MapOptions);

        /**
          * Instantiates a map object given a div element id and optionally an
          * object literal with map options described below.
          *
          * @constructor
          */
        constructor(id: string, options?: MapOptions);

        // Methods for Modifying Map State

        /**
          * Sets the view of the map (geographical center and zoom) with the given
          * animation options.
          */
        setView(center: LatLng, zoom?: number, options?: ZoomPanOptions): Map;
    
        /**
          * Sets the zoom of the map.
          */
        setZoom(zoom: number, options?: ZoomOptions): Map;
    
        /**
          * Increases the zoom of the map by delta (1 by default).
          */
        zoomIn(delta?: number, options?: ZoomOptions): Map;
        
        /**
          * Decreases the zoom of the map by delta (1 by default).
          */
        zoomOut(delta?: number, options?: ZoomOptions): Map;

        /**
          * Zooms the map while keeping a specified point on the map stationary
          * (e.g. used internally for scroll zoom and double-click zoom).
          */
        setZoomAround(latlng: LatLng, zoom: number, options?: ZoomOptions): Map;
        
        /**
          * Sets a map view that contains the given geographical bounds with the maximum
          * zoom level possible.
          */
        fitBounds(bounds: LatLngBounds, options?: FitBoundsOptions): Map;
        
        /**
          * Sets a map view that mostly contains the whole world with the maximum zoom
          * level possible.
          */
        fitWorld(options?: FitBoundsOptions): Map;
        
        /**
          * Pans the map to a given center. Makes an animated pan if new center is not more
          * than one screen away from the current one.
          */
        panTo(latlng: LatLng, options?: PanOptions): Map;
    
        /**
          * Pans the map to the closest view that would lie inside the given bounds (if
          * it's not already).
          */
        panInsideBounds(bounds: LatLngBounds): Map;
        
        /**
          * Pans the map by a given number of pixels (animated).
          */
        panBy(point: Point, options?: PanOptions): Map;
        
        /**
          * Checks if the map container size changed and updates the map if so — call it
          * after you've changed the map size dynamically, also animating pan by default.
          * If options.pan is false, panning will not occur.
          */
        invalidateSize(options: ZoomPanOptions): Map;
    
        /**
          * Checks if the map container size changed and updates the map if so — call it
          * after you've changed the map size dynamically, also animating pan by default.
          */
        invalidateSize(animate: boolean): Map;

        /**
          * Restricts the map view to the given bounds (see map maxBounds option),
          * passing the given animation options through to `setView`, if required.
          */
        setMaxBounds(bounds: LatLngBounds, options?: ZoomPanOptions): Map;
    
        /**
          * Tries to locate the user using Geolocation API, firing locationfound event
          * with location data on success or locationerror event on failure, and optionally
          * sets the map view to the user location with respect to detection accuracy
          * (or to the world view if geolocation failed). See Locate options for more
          * details.
          */
        locate(options?: LocateOptions): Map;
        
        /**
          * Stops watching location previously initiated by map.locate({watch: true})
          * and aborts resetting the map view if map.locate was called with {setView: true}.
          */
        stopLocate(): Map;

        /**
          * Destroys the map and clears all related event listeners.
          */
        remove(): Map;
    
        // Methods for Getting Map State

        /**
          * Returns the geographical center of the map view.
          */
        getCenter(): LatLng;
    
        /**
          * Returns the current zoom of the map view.
          */
        getZoom(): number;
    
        /**
          * Returns the minimum zoom level of the map.
          */
        getMinZoom(): number;
    
        /**
          * Returns the maximum zoom level of the map.
          */
        getMaxZoom(): number;
    
        /**
          * Returns the LatLngBounds of the current map view.
          */
        getBounds(): LatLngBounds;
    
        /**
          * Returns the maximum zoom level on which the given bounds fit to the map view
          * in its entirety. If inside (optional) is set to true, the method instead returns
          * the minimum zoom level on which the map view fits into the given bounds in its
          * entirety.
          */
        getBoundsZoom(bounds: LatLngBounds, inside?: boolean): number;
    
        /**
          * Returns the current size of the map container.
          */
        getSize(): Point;
    
        /**
          * Returns the bounds of the current map view in projected pixel coordinates
          * (sometimes useful in layer and overlay implementations).
          */
        getPixelBounds(): Bounds;
    
        /**
          * Returns the projected pixel coordinates of the top left point of the map layer
          * (useful in custom layer and overlay implementations).
          */
        getPixelOrigin(): Point;
    
        // Methods for Layers and Controls

        /**
          * Adds the given layer to the map. If optional insertAtTheBottom is set to true,
          * the layer is inserted under all others (useful when switching base tile layers).
          */
        addLayer(layer: ILayer, insertAtTheBottom?: boolean): Map;
    
        /**
          * Removes the given layer from the map.
          */
        removeLayer(layer: ILayer): Map;
    
        /**
          * Returns true if the given layer is currently added to the map.
          */
        hasLayer(layer: ILayer): boolean;
    
        /**
          * Opens the specified popup while closing the previously opened (to make sure
          * only one is opened at one time for usability).
          */
        openPopup(popup: Popup): Map;
        
        /**
          * Creates a popup with the specified options and opens it in the given point 
          * on a map.
          */
        openPopup(html: string, latlng: LatLng, options?: PopupOptions): Map;
        
        /**
          * Creates a popup with the specified options and opens it in the given point 
          * on a map.
          */
        openPopup(el: HTMLElement, latlng: LatLng, options?: PopupOptions): Map;

        /**
          * Closes the popup previously opened with openPopup (or the given one).
          */
        closePopup(popup?: Popup): Map;
    
        /**
          * Adds the given control to the map.
          */
        addControl(control: IControl): Map;
    
        /**
          * Removes the given control from the map.
          */
        removeControl(control: IControl): Map;
    
        // Conversion Methods

        /**
          * Returns the map layer point that corresponds to the given geographical coordinates
          * (useful for placing overlays on the map).
          */
        latLngToLayerPoint(latlng: LatLng): Point;
    
        /**
          * Returns the geographical coordinates of a given map layer point.
          */
        layerPointToLatLng(point: Point): LatLng;
    
        /**
          * Converts the point relative to the map container to a point relative to the
          * map layer.
          */
        containerPointToLayerPoint(point: Point): Point;
    
        /**
          * Converts the point relative to the map layer to a point relative to the map
          * container.
          */
        layerPointToContainerPoint(point: Point): Point;
    
        /**
          * Returns the map container point that corresponds to the given geographical
          * coordinates.
          */
        latLngToContainerPoint(latlng: LatLng): Point;
    
        /**
          * Returns the geographical coordinates of a given map container point.
          */
        containerPointToLatLng(point: Point): LatLng;
    
        /**
          * Projects the given geographical coordinates to absolute pixel coordinates
          * for the given zoom level (current zoom level by default).
          */
        project(latlng: LatLng, zoom?: number): Point;
    
        /**
          * Projects the given absolute pixel coordinates to geographical coordinates
          * for the given zoom level (current zoom level by default).
          */
        unproject(point: Point, zoom?: number): LatLng;
    
        /**
          * Returns the pixel coordinates of a mouse click (relative to the top left corner
          * of the map) given its event object.
          */
        mouseEventToContainerPoint(event: LeafletMouseEvent): Point;
    
        /**
          * Returns the pixel coordinates of a mouse click relative to the map layer given
          * its event object.
          */
        mouseEventToLayerPoint(event: LeafletMouseEvent): Point;
    
        /**
          * Returns the geographical coordinates of the point the mouse clicked on given
          * the click's event object.
          */
        mouseEventToLatLng(event: LeafletMouseEvent): LatLng;
    
        // Other Methods

        /**
          * Returns the container element of the map.
          */
        getContainer(): HTMLElement;
    
        /**
          * Returns an object with different map panes (to render overlays in).
          */
        getPanes(): MapPanes;
    
        // REVIEW: Should we make it more flexible declaring parameter 'fn' as Function?
        /**
          * Runs the given callback when the map gets initialized with a place and zoom,
          * or immediately if it happened already, optionally passing a function context.
          */
        whenReady(fn: (map: Map) => void, context?: any): Map;
    
        // Properties

        /**
          * Map dragging handler (by both mouse and touch).
          */
        dragging: IHandler;
    
        /**
          * Touch zoom handler.
          */
        touchZoom: IHandler;
    
        /**
          * Double click zoom handler.
          */
        doubleClickZoom: IHandler;
    
        /**
          * Scroll wheel zoom handler.
          */
        scrollWheelZoom: IHandler;
    
        /**
          * Box (shift-drag with mouse) zoom handler.
          */
        boxZoom: IHandler;
    
        /**
          * Keyboard navigation handler.
          */
        keyboard: IHandler;
    
        /**
          * Mobile touch hacks (quick tap and touch hold) handler.
          */
        tap: IHandler;

        /**
          * Zoom control.
          */
        zoomControl: Control.Zoom;

        /**
          * Attribution control.
          */
        attributionControl: Control.Attribution;


        ////////////////
        ////////////////
        addEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Map;
        addOneTimeEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Map;
        removeEventListener(type: string, fn?: (e: LeafletEvent) => void, context?: any): Map;
        hasEventListeners(type: string): boolean;
        fireEvent(type: string, data?: any): Map;
        on(type: string, fn: (e: LeafletEvent) => void, context?: any): Map;
        once(type: string, fn: (e: LeafletEvent) => void, context?: any): Map;
        off(type: string, fn?: (e: LeafletEvent) => void, context?: any): Map;
        fire(type: string, data?: any): Map;addEventListener(eventMap: any, context?: any): Map;
        removeEventListener(eventMap?: any, context?: any): Map;
        clearAllEventListeners(): Map;
        on(eventMap: any, context?: any): Map;
        off(eventMap?: any, context?: any): Map;
    }
}
 
declare module L {

    export interface MapOptions {

        // Map State Options

        /**
          * Initial geographical center of the map.
          */
        center?: LatLng;
        
        /**
          * Initial map zoom.
          */
        zoom?: number;
        
        /**
          * Layers that will be added to the map initially.
          */
        layers?: ILayer[];
        
        /**
          * Minimum zoom level of the map. Overrides any minZoom set on map layers.
          */
        minZoom?: number;
        
        /**
          * Maximum zoom level of the map. This overrides any maxZoom set on map layers.
          */
        maxZoom?: number;
        
        /**
          * When this option is set, the map restricts the view to the given geographical
          * bounds, bouncing the user back when he tries to pan outside the view, and also
          * not allowing to zoom out to a view that's larger than the given bounds (depending
          * on the map size). To set the restriction dynamically, use setMaxBounds method
          */
        maxBounds?: LatLngBounds;
        
        /**
          * Coordinate Reference System to use. Don't change this if you're not sure
          * what it means.
          *
          * Default value: L.CRS.EPSG3857.
          */
        crs?: ICRS;
        
        // Interaction Options

        /**
          * Whether the map be draggable with mouse/touch or not.
          *
          * Default value: true.
          */
        dragging?: boolean;
        
        /**
          * Whether the map can be zoomed by touch-dragging with two fingers.
          *
          * Default value: true.
          */
        touchZoom?: boolean;
        
        /**
          * Whether the map can be zoomed by using the mouse wheel.
          * If passed 'center', it will zoom to the center of the view regardless of
          * where the mouse was.
          *
          * Default value: true.
          */
        scrollWheelZoom?: boolean;
        
        /**
          * Whether the map can be zoomed in by double clicking on it and zoomed out
          * by double clicking while holding shift.
          * If passed 'center', double-click zoom will zoom to the center of the view
          * regardless of where the mouse was.
          *
          * Default value: true.
          */
        doubleClickZoom?: boolean;

        /**
          * Whether the map can be zoomed to a rectangular area specified by dragging
          * the mouse while pressing shift.
          *
          * Default value: true.
          */
        boxZoom?: boolean;

        /**
          * Enables mobile hacks for supporting instant taps (fixing 200ms click delay
          * on iOS/Android) and touch holds (fired as contextmenu events).
          *
          * Default value: true.
          */
        tap?: boolean;

        /**
          * The max number of pixels a user can shift his finger during touch for it
          * to be considered a valid tap.
          *
          * Default value: 15.
          */
        tapTolerance?: number;

        /**
          * Whether the map automatically handles browser window resize to update itself.
          *
          * Default value: true.
          */
        trackResize?: boolean;
        
        /**
          * With this option enabled, the map tracks when you pan to another "copy" of
          * the world and seamlessly jumps to the original one so that all overlays like
          * markers and vector layers are still visible.
          *
          * Default value: false.
          */
        worldCopyJump?: boolean;
        
        /**
          * Set it to false if you don't want popups to close when user clicks the map.
          *
          * Default value: true.
          */
        closePopupOnClick?: boolean;
        
        // Keyboard Navigation Options

        /**
          * Makes the map focusable and allows users to navigate the map with keyboard
          * arrows and +/- keys.
          *
          * Default value: true.
          */
        keyboard?: boolean;
        
        /**
          * Amount of pixels to pan when pressing an arrow key.
          *
          * Default value: 80.
          */
        keyboardPanOffset?: number;
        
        /**
          * Number of zoom levels to change when pressing + or - key.
          *
          * Default value: 1.
          */
        keyboardZoomOffset?: number;
        
        // Panning Inertia Options

        /**
          * If enabled, panning of the map will have an inertia effect where the map builds
          * momentum while dragging and continues moving in the same direction for some
          * time. Feels especially nice on touch devices.
          *
          * Default value: true.
          */
        inertia?: boolean;
        
        /**
          * The rate with which the inertial movement slows down, in pixels/second2.
          *
          * Default value: 3000.
          */
        inertiaDeceleration?: number;
        
        /**
          * Max speed of the inertial movement, in pixels/second.
          *
          * Default value: 1500.
          */
        inertiaMaxSpeed?: number;
        
        /**
          * Amount of milliseconds that should pass between stopping the movement and
          * releasing the mouse or touch to prevent inertial movement.
          *
          * Default value: 32 for touch devices and 14 for the rest.
          */
        inertiaThreshold?: number;
        
        // Control options

        /**
          * Whether the zoom control is added to the map by default.
          *
          * Default value: true.
          */
        zoomControl?: boolean;
        
        /**
          * Whether the attribution control is added to the map by default.
          *
          * Default value: true.
          */
        attributionControl?: boolean;
        
        // Animation options

        /**
          * Whether the tile fade animation is enabled. By default it's enabled in all
          * browsers that support CSS3 Transitions except Android.
          */
        fadeAnimation?: boolean;
        
        /**
          * Whether the tile zoom animation is enabled. By default it's enabled in all
          * browsers that support CSS3 Transitions except Android.
          */
        zoomAnimation?: boolean;

        /**
          * Won't animate zoom if the zoom difference exceeds this value.
          *
          * Default value: 4.
          */
        zoomAnimationThreshold?: number;

        /**
          * Whether markers animate their zoom with the zoom animation, if disabled
          * they will disappear for the length of the animation. By default it's enabled
          * in all browsers that support CSS3 Transitions except Android.
          */
        markerZoomAnimation?: boolean;

        /**
         * Set it to false if you don't want the map to zoom beyond min/max zoom
         * and then bounce back when pinch-zooming.
         *
         * Default value: true.
         */
        bounceAtZoomLimits?: boolean;
    }
}
 
declare module L {

    export interface MapPanes {

        /**
          * Pane that contains all other map panes.
          */
        mapPane: HTMLElement;

        /**
          * Pane for tile layers.
          */
        tilePane: HTMLElement;

        /**
          * Pane that contains all the panes except tile pane.
          */
        objectsPane: HTMLElement;

        /**
          * Pane for overlay shadows (e.g. marker shadows).
          */
        shadowPane: HTMLElement;

        /**
          * Pane for overlays like polylines and polygons.
          */
        overlayPane: HTMLElement;

        /**
          * Pane for marker icons.
          */
        markerPane: HTMLElement;

        /**
          * Pane for popups.
          */
        popupPane: HTMLElement;
    }
}
 
declare module L {

    /**
      * Instantiates a Marker object given a geographical point and optionally
      * an options object.
      */
    function marker(latlng: LatLng, options?: MarkerOptions): Marker;

    export class Marker extends Class implements ILayer, IEventPowered<Marker> {

        /**
          * Instantiates a Marker object given a geographical point and optionally
          * an options object.
          */
        constructor(latlng: LatLng, options?: MarkerOptions);
    
        /**
          * Adds the marker to the map.
          */
        addTo(map: Map): Marker;
    
        /**
          * Returns the current geographical position of the marker.
          */
        getLatLng(): LatLng;
    
        /**
          * Changes the marker position to the given point.
          */
        setLatLng(latlng: LatLng): Marker;
    
        /**
          * Changes the marker icon.
          */
        setIcon(icon: Icon): Marker;
    
        /**
          * Changes the zIndex offset of the marker.
          */
        setZIndexOffset(offset: number): Marker;
    
        /**
          * Changes the opacity of the marker.
          */
        setOpacity(opacity: number): Marker;
    
        /**
          * Updates the marker position, useful if coordinates of its latLng object
          * were changed directly.
          */
        update(): Marker;
    
        /**
          * Binds a popup with a particular HTML content to a click on this marker. You
          * can also open the bound popup with the Marker openPopup method.
          */
        bindPopup(html: string, options?: PopupOptions): Marker;
        bindLabel(html: string, options?: any): Marker;
    
        /**
          * Binds a popup with a particular HTML content to a click on this marker. You
          * can also open the bound popup with the Marker openPopup method.
          */
        bindPopup(el: HTMLElement, options?: PopupOptions): Marker;

        /**
          * Binds a popup with a particular HTML content to a click on this marker. You
          * can also open the bound popup with the Marker openPopup method.
          */
        bindPopup(popup: Popup, options?: PopupOptions): Marker;

        /**
          * Unbinds the popup previously bound to the marker with bindPopup.
          */
        unbindPopup(): Marker;
    
        /**
          * Opens the popup previously bound by the bindPopup method.
          */
        openPopup(): Marker;

        /**
         * Returns the popup previously bound by the bindPopup method.
         */
        getPopup(): Popup; 
    
        /**
          * Closes the bound popup of the marker if it's opened.
          */
        closePopup(): Marker;

        /**
          * Toggles the popup previously bound by the bindPopup method.
          */
        togglePopup(): Marker;

        /**
          * Sets an HTML content of the popup of this marker.
          */
        setPopupContent(html: string, options?: PopupOptions): Marker;

        /**
          * Sets an HTML content of the popup of this marker.
          */
        setPopupContent(el: HTMLElement, options?: PopupOptions): Marker;

        /**
          * Returns a GeoJSON representation of the marker (GeoJSON Point Feature).
          */
        toGeoJSON(): any;

        /**
          * Marker dragging handler (by both mouse and touch).
          */
        dragging: IHandler;

        ////////////
        ////////////
        /**
          * Should contain code that creates DOM elements for the overlay, adds them
          * to map panes where they should belong and puts listeners on relevant map events.
          * Called on map.addLayer(layer).
          */
        onAdd(map: Map): void;
    
        /**
          * Should contain all clean up code that removes the overlay's elements from
          * the DOM and removes listeners previously added in onAdd. Called on map.removeLayer(layer).
          */
        onRemove(map: Map): void;
        
        ////////////////
        ////////////////
        addEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Marker;
        addOneTimeEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Marker;
        removeEventListener(type: string, fn?: (e: LeafletEvent) => void, context?: any): Marker;
        hasEventListeners(type: string): boolean;
        fireEvent(type: string, data?: any): Marker;
        on(type: string, fn: (e: LeafletEvent) => void, context?: any): Marker;
        once(type: string, fn: (e: LeafletEvent) => void, context?: any): Marker;
        off(type: string, fn?: (e: LeafletEvent) => void, context?: any): Marker;
        fire(type: string, data?: any): Marker;
        addEventListener(eventMap: any, context?: any): Marker;
        removeEventListener(eventMap?: any, context?: any): Marker;
        clearAllEventListeners(): Marker;
        on(eventMap: any, context?: any): Marker;
        off(eventMap?: any, context?: any): Marker;
        bounce(option?: any, callbackFunction?: any): any;
    }
}
 
declare module L {

    export interface MarkerOptions {

        /**
          * Icon class to use for rendering the marker. See Icon documentation for details
          * on how to customize the marker icon.
          *
          * Default value: new L.Icon.Default().
          */
        icon?: Icon;
    
        /**
          * If false, the marker will not emit mouse events and will act as a part of the
          * underlying map.
          *
          * Default value: true.
          */
        clickable?: boolean;
    
        /**
          * Whether the marker is draggable with mouse/touch or not.
          *
          * Default value: false.
          */
        draggable?: boolean;

        /**
          * Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
          *
          * Default value: true.
          */
        keyboard?: boolean;
    
        /**
          * Text for the browser tooltip that appear on marker hover (no tooltip by default).
          *
          * Default value: ''.
          */
        title?: string;

        /**
          * Text for the alt attribute of the icon image (useful for accessibility).
          *
          * Default value: ''.
          */
        alt?: string;
    
        /**
          * By default, marker images zIndex is set automatically based on its latitude.
          * You this option if you want to put the marker on top of all others (or below),
          * specifying a high value like 1000 (or high negative value, respectively).
          *
          * Default value: 0.
          */
        zIndexOffset?: number;
    
        /**
          * The opacity of the marker.
          *
          * Default value: 1.0.
          */
        opacity?: number;
    
        /**
          * If true, the marker will get on top of others when you hover the mouse over it.
          *
          * Default value: false.
          */
        riseOnHover?: boolean;
    
        /**
          * The z-index offset used for the riseOnHover feature.
          *
          * Default value: 250.
          */
        riseOffset?: number;
    }
}
 
declare module L {

    /**
      * Instantiates a multi-polyline object given an array of latlngs arrays (one
      * for each individual polygon) and optionally an options object (the same
      * as for MultiPolyline).
      */
    function multiPolygon(latlngs: LatLng[][], options?: PolylineOptions): MultiPolygon;

    export class MultiPolygon extends FeatureGroup<Polygon> {

        /**
          * Instantiates a multi-polyline object given an array of latlngs arrays (one
          * for each individual polygon) and optionally an options object (the same
          * as for MultiPolyline).
          */
        constructor(latlngs: LatLng[][], options?: PolylineOptions);
    
        /**
          * Replace all polygons and their paths with the given array of arrays
          * of geographical points.
          */
        setLatLngs(latlngs: LatLng[][]): MultiPolygon;

        /**
          * Returns an array of arrays of geographical points in each polygon.
          */
        getLatLngs(): LatLng[][];

        /**
         * Opens the popup previously bound by bindPopup.
         */
        openPopup(): MultiPolygon;

        /**
          * Returns a GeoJSON representation of the multipolygon (GeoJSON MultiPolygon Feature).
          */
        toGeoJSON(): any;
    }
}
 
declare module L {

    /**
      * Instantiates a multi-polyline object given an array of arrays of geographical
      * points (one for each individual polyline) and optionally an options object.
      */
    function multiPolyline(latlngs: LatLng[][], options?: PolylineOptions): MultiPolyline;

    export class MultiPolyline extends FeatureGroup<Polyline> {

        /**
          * Instantiates a multi-polyline object given an array of arrays of geographical
          * points (one for each individual polyline) and optionally an options object.
          */
        constructor(latlngs: LatLng[][], options?: PolylineOptions);

        /**
          * Replace all polygons and their paths with the given array of arrays
          * of geographical points.
          */
        setLatLngs(latlngs: LatLng[][]): MultiPolyline;

        /**
          * Returns an array of arrays of geographical points in each polygon.
          */
        getLatLngs(): LatLng[][];

        /**
         * Opens the popup previously bound by bindPopup.
         */
        openPopup(): MultiPolyline;

        /**
          * Returns a GeoJSON representation of the multipolyline (GeoJSON MultiLineString Feature).
          */
        toGeoJSON(): any;
    }
}
 
declare module L {

    export interface PanOptions {

        /**
          * If true, panning will always be animated if possible. If false, it will not
          * animate panning, either resetting the map view if panning more than a screen
          * away, or just setting a new offset for the map pane (except for `panBy` 
          * which always does the latter).
          */
        animate?: boolean;

        /**
          * Duration of animated panning.
          * 
          * Default value: 0.25.
          */
        duration?: number;

        /**
          * The curvature factor of panning animation easing (third parameter of the Cubic
          * Bezier curve). 1.0 means linear animation, the less the more bowed the curve.
          *
          * Default value: 0.25.
          */
        easeLinearity?: number;

        /**
          * If true, panning won't fire movestart event on start (used internally for panning inertia).
          * 
          * Default value: false.
          */
        noMoveStart?: boolean;
    }
}
 
declare module L {

    export class Path extends Class implements ILayer, IEventPowered<Path> {

        /**
          * Adds the layer to the map.
          */
        addTo(map: any): Path;
    
        /**
          * Binds a popup with a particular HTML content to a click on this path.
          */
        bindPopup(html: string, options?: PopupOptions): Path;
    
        /**
          * Binds a popup with a particular HTML content to a click on this path.
          */
        bindPopup(el: HTMLElement, options?: PopupOptions): Path;

        /**
          * Binds a popup with a particular HTML content to a click on this path.
          */
        bindPopup(popup: Popup, options?: PopupOptions): Path;

        /**
          * Unbinds the popup previously bound to the path with bindPopup.
          */
        unbindPopup(): Path;
    
        /**
          * Opens the popup previously bound by the bindPopup method in the given point,
          * or in one of the path's points if not specified.
          */
        openPopup(latlng?: LatLng): Path;
    
        /**
          * Closes the path's bound popup if it is opened.
          */
        closePopup(): Path;
    
        /**
          * Changes the appearance of a Path based on the options in the Path options object.
          */
        setStyle(object: PathOptions): Path;
    
        /**
          * Returns the LatLngBounds of the path.
          */
        getBounds(): LatLngBounds;
    
        /**
          * Brings the layer to the top of all path layers.
          */
        bringToFront(): Path;
    
        /**
          * Brings the layer to the bottom of all path layers.
          */
        bringToBack(): Path;
    
        /**
          * Redraws the layer. Sometimes useful after you changed the coordinates that
          * the path uses.
          */
        redraw(): Path;
    
        /**
          * True if SVG is used for vector rendering (true for most modern browsers).
          */
        static SVG: boolean;
    
        /**
          * True if VML is used for vector rendering (IE 6-8).
          */
        static VML: boolean;
    
        /**
          * True if Canvas is used for vector rendering (Android 2). You can also force
          * this by setting global variable L_PREFER_CANVAS to true before the Leaflet
          * include on your page — sometimes it can increase performance dramatically
          * when rendering thousands of circle markers, but currently suffers from
          * a bug that causes removing such layers to be extremely slow.
          */
        static CANVAS: boolean;
    
        /**
          * How much to extend the clip area around the map view (relative to its size,
          * e.g. 0.5 is half the screen in each direction). Smaller values mean that you
          * will see clipped ends of paths while you're dragging the map, and bigger values
          * decrease drawing performance.
          */
        static CLIP_PADDING: number;

        ////////////
        ////////////
        /**
          * Should contain code that creates DOM elements for the overlay, adds them
          * to map panes where they should belong and puts listeners on relevant map events.
          * Called on map.addLayer(layer).
          */
        onAdd(map: Map): void;
    
        /**
          * Should contain all clean up code that removes the overlay's elements from
          * the DOM and removes listeners previously added in onAdd. Called on map.removeLayer(layer).
          */
        onRemove(map: Map): void;
        
        ////////////////
        ////////////////
        addEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Path;
        addOneTimeEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): Path;
        removeEventListener(type: string, fn?: (e: LeafletEvent) => void, context?: any): Path;
        hasEventListeners(type: string): boolean;
        fireEvent(type: string, data?: any): Path;
        on(type: string, fn: (e: LeafletEvent) => void, context?: any): Path;
        once(type: string, fn: (e: LeafletEvent) => void, context?: any): Path;
        off(type: string, fn?: (e: LeafletEvent) => void, context?: any): Path;
        fire(type: string, data?: any): Path;
        addEventListener(eventMap: any, context?: any): Path;
        removeEventListener(eventMap?: any, context?: any): Path;
        clearAllEventListeners(): Path;
        on(eventMap: any, context?: any): Path;
        off(eventMap?: any, context?: any): Path;
    }
}
 
declare module L {

    export interface PathOptions {

        /**
          * Whether to draw stroke along the path. Set it to false to disable borders on
          * polygons or circles.
          *
          * Default value: true.
          */
        stroke?: boolean;
    
        /**
          * Stroke color.
          *
          * Default value: '#03f'.
          */
        color?: string;
    
        /**
          * Stroke width in pixels.
          *
          * Default value: 5.
          */
        weight?: number;
    
        /**
          * Stroke opacity.
          *
          * Default value: 0.5.
          */
        opacity?: number;
    
        /**
          * Whether to fill the path with color. Set it to false to disable filling on polygons
          * or circles.
          */
        fill?: boolean;
    
        /**
          * Fill color.
          *
          * Default value: same as color.
          */
        fillColor?: string;
    
        /**
          * Fill opacity.
          *
          * Default value: 0.2.
          */
        fillOpacity?: number;
    
        /**
          * A string that defines the stroke dash pattern. Doesn't work on canvas-powered
          * layers (e.g. Android 2).
          */
        dashArray?: string;

        /**
          * A string that defines shape to be used at the end of the stroke.
          *
          * Default: null.
          */
        lineCap?: string;

        /**
          * A string that defines shape to be used at the corners of the stroke.
          *
          * Default: null.
          */
        lineJoin?: string;
    
        /**
          * If false, the vector will not emit mouse events and will act as a part of the
          * underlying map.
          *
          * Default value: true.
          */
        clickable?: boolean;

        /**
          * Sets the pointer-events attribute on the path if SVG backend is used.
          */
        pointerEvents?: boolean;

        /**
          * Custom class name set on an element.
          *
          * Default value: ''.
          */
        className?: string;
    
    }
}
 
declare module L {

    /**
      * Creates a Point object with the given x and y coordinates. If optional round
      * is set to true, rounds the x and y values.
      */
    function point(x: number, y: number, round?: boolean): Point;

    export class Point {

        /**
          * Creates a Point object with the given x and y coordinates. If optional round
          * is set to true, rounds the x and y values.
          */
        constructor(x: number, y: number, round?: boolean);

        /**
          * Returns the result of addition of the current and the given points.
          */
        add(otherPoint: Point): Point;
    
        /**
          * Returns the result of subtraction of the given point from the current.
          */
        subtract(otherPoint: Point): Point;
    
        /**
          * Returns the result of multiplication of the current point by the given number.
          */
        multiplyBy(number: number): Point;
    
        /**
          * Returns the result of division of the current point by the given number. If
          * optional round is set to true, returns a rounded result.
          */
        divideBy(number: number, round?: boolean): Point;
    
        /**
          * Returns the distance between the current and the given points.
          */
        distanceTo(otherPoint: Point): number;
    
        /**
          * Returns a copy of the current point.
          */
        clone(): Point;
    
        /**
          * Returns a copy of the current point with rounded coordinates.
          */
        round(): Point;
    
        /**
          * Returns true if the given point has the same coordinates.
          */
        equals(otherPoint: Point): boolean;
    
        /**
          * Returns a string representation of the point for debugging purposes.
          */
        toString(): string;
   
        /**
          * The x coordinate.
          */
        x: number;

        /**
          * The y coordinate.
          */
        y: number;
    }
}
 
declare module L {

    /**
      * Instantiates a polygon object given an array of geographical points and
      * optionally an options object (the same as for Polyline). You can also create
      * a polygon with holes by passing an array of arrays of latlngs, with the first
      * latlngs array representing the exterior ring while the remaining represent
      * the holes inside.
      */
    function polygon(latlngs: LatLng[], options?: PolylineOptions): Polygon;

    export class Polygon extends Polyline {

        /**
          * Instantiates a polygon object given an array of geographical points and
          * optionally an options object (the same as for Polyline). You can also create
          * a polygon with holes by passing an array of arrays of latlngs, with the first
          * latlngs array representing the exterior ring while the remaining represent
          * the holes inside.
          */
        constructor(latlngs: LatLng[], options?: PolylineOptions);
    }
}
 
declare module L {

    /**
      * Instantiates a polyline object given an array of geographical points and
      * optionally an options object.
      */
    function polyline(latlngs: LatLng[], options?: PolylineOptions): Polyline;

    export class Polyline extends Path {
        setText(text: any, option?: any): any;
        /**
          * Instantiates a polyline object given an array of geographical points and
          * optionally an options object.
          */
        constructor(latlngs: LatLng[], options?: PolylineOptions);
    
        /**
          * Adds a given point to the polyline.
          */
        addLatLng(latlng: LatLng): Polyline;
    
        /**
          * Replaces all the points in the polyline with the given array of geographical
          * points.
          */
        setLatLngs(latlngs: LatLng[]): Polyline;
    
        /**
          * Returns an array of the points in the path.
          */
        getLatLngs(): LatLng[];
    
        /**
          * Allows adding, removing or replacing points in the polyline. Syntax is the
          * same as in Array#splice. Returns the array of removed points (if any).
          */
        spliceLatLngs(index: number, pointsToRemove: number, ...latlngs: LatLng[]): LatLng[];
    
        /**
          * Returns the LatLngBounds of the polyline.
          */
        getBounds(): LatLngBounds;

        /**
          * Returns a GeoJSON representation of the polyline (GeoJSON LineString Feature).
          */
        toGeoJSON(): any;
    }
}
 
declare module L {

    export interface PolylineOptions {

        /**
          * How much to simplify the polyline on each zoom level. More means better performance
          * and smoother look, and less means more accurate representation.
          *
          * Default value: 1.0.
          */
        smoothFactor?: number;
    
        /**
          * Disabled polyline clipping.
          *
          * Default value: false.
          */
        noClip?: boolean;
    }
}
 
declare module L {

    export class PolyUtil {

        /**
          * Clips the polygon geometry defined by the given points by rectangular bounds.
          * Used by Leaflet to only show polygon points that are on the screen or near,
          * increasing performance. Note that polygon points needs different algorithm
          * for clipping than polyline, so there's a seperate method for it.
          */
        static clipPolygon(points: Point[], bounds: Bounds): Point[];
    }
}
 
declare module L {

    /**
      * Instantiates a Popup object given an optional options object that describes
      * its appearance and location and an optional object that is used to tag the
      * popup with a reference to the source object to which it refers.
      */
    function popup(options?: PopupOptions, source?: any): Popup;

    export class Popup extends Class implements ILayer {

        /**
          * Instantiates a Popup object given an optional options object that describes
          * its appearance and location and an optional object that is used to tag the
          * popup with a reference to the source object to which it refers.
          */
        constructor(options?: PopupOptions, source?: any);
    
        /**
          * Adds the popup to the map.
          */
        addTo(map: Map): Popup;
    
        /**
          * Adds the popup to the map and closes the previous one. The same as map.openPopup(popup).
          */
        openOn(map: Map): Popup;
    
        /**
          * Sets the geographical point where the popup will open.
          */
        setLatLng(latlng: LatLng): Popup;
   
        /**
          * Returns the geographical point of popup.
          */
        getLatLng(): LatLng;

        /**
          * Sets the HTML content of the popup.
          */
        setContent(html: string): Popup;

        /**
          * Sets the HTML content of the popup.
          */
        setContent(el: HTMLElement): Popup;

        /**
          * Returns the content of the popup.
          */
        getContent(): HTMLElement;
        //getContent(): string;

        ////////////
        ////////////
        /**
          * Should contain code that creates DOM elements for the overlay, adds them
          * to map panes where they should belong and puts listeners on relevant map events.
          * Called on map.addLayer(layer).
          */
        onAdd(map: Map): void;
    
        /**
          * Should contain all clean up code that removes the overlay's elements from
          * the DOM and removes listeners previously added in onAdd. Called on map.removeLayer(layer).
          */
        onRemove(map: Map): void;

        /**
          * Updates the popup content, layout and position. Useful for updating the popup after
          * something inside changed, e.g. image loaded.
          */
        update(): Popup;
    }
}
 
declare module L {

    export interface PopupOptions {

        /**
          * Max width of the popup.
          *
          * Default value: 300.
          */
        maxWidth?: number;
    
        /**
          * Min width of the popup.
          *
          * Default value: 50.
          */
        minWidth?: number;
    
        /**
          * If set, creates a scrollable container of the given height inside a popup
          * if its content exceeds it.
          */
        maxHeight?: number;
    
        /**
          * Set it to false if you don't want the map to do panning animation to fit the opened
          * popup.
          *
          * Default value: true.
          */
        autoPan?: boolean;
    
        /**
          * Controls the presense of a close button in the popup.
          *
          * Default value: true.
          */
        closeButton?: boolean;
    
        /**
          * The offset of the popup position. Useful to control the anchor of the popup
          * when opening it on some overlays.
          *
          * Default value: new Point(0, 6).
          */
        offset?: Point;

        /**
          * The margin between the popup and the top left corner of the map view after
          * autopanning was performed.
          *
          * Default value: null.
          */
        autoPanPaddingTopLeft?: Point;

        /**
          * The margin between the popup and the bottom right corner of the map view after
          * autopanning was performed.
          *
          * Default value: null.
          */
        autoPanPaddingBottomRight?: Point;
    
        /**
          * The margin between the popup and the edges of the map view after autopanning
          * was performed.
          *
          * Default value: new Point(5, 5).
          */
        autoPanPadding?: Point;
    
        /**
          * Whether to animate the popup on zoom. Disable it if you have problems with
          * Flash content inside popups.
          *
          * Default value: true.
          */
        zoomAnimation?: boolean;

        /**
          * Set it to false if you want to override the default behavior of the popup 
          * closing when user clicks the map (set globally by the Map closePopupOnClick
          * option).
          */
        closeOnClick?: boolean;
    }
}
 
declare module L {

    export class PosAnimation extends Class implements IEventPowered<PosAnimation> {

        /**
          * Creates a PosAnimation object.
          */
        constructor();
    
        /**
          * Run an animation of a given element to a new position, optionally setting
          * duration in seconds (0.25 by default) and easing linearity factor (3rd argument
          * of the cubic bezier curve, 0.5 by default)
          */
        run(element: HTMLElement, newPos: Point, duration?: number, easeLinearity?: number): PosAnimation;
        
        ////////////////
        ////////////////
        addEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): PosAnimation;
        addOneTimeEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): PosAnimation;
        removeEventListener(type: string, fn?: (e: LeafletEvent) => void, context?: any): PosAnimation;
        hasEventListeners(type: string): boolean;
        fireEvent(type: string, data?: any): PosAnimation;
        on(type: string, fn: (e: LeafletEvent) => void, context?: any): PosAnimation;
        once(type: string, fn: (e: LeafletEvent) => void, context?: any): PosAnimation;
        off(type: string, fn?: (e: LeafletEvent) => void, context?: any): PosAnimation;
        fire(type: string, data?: any): PosAnimation;
        addEventListener(eventMap: any, context?: any): PosAnimation;
        removeEventListener(eventMap?: any, context?: any): PosAnimation;
        clearAllEventListeners(): PosAnimation;
        on(eventMap: any, context?: any): PosAnimation;
        off(eventMap?: any, context?: any): PosAnimation;
    }
}
 
declare module L {

    export class Projection {

        /**
          * Spherical Mercator projection — the most common projection for online maps,
          * used by almost all free and commercial tile providers. Assumes that Earth
          * is a sphere. Used by the EPSG:3857 CRS.
          */
        static SphericalMercator: IProjection;
    
        /**
          * Elliptical Mercator projection — more complex than Spherical Mercator.
          * Takes into account that Earth is a geoid, not a perfect sphere. Used by the
          * EPSG:3395 CRS.
          */
        static Mercator: IProjection;
    
        /**
          * Equirectangular, or Plate Carree projection — the most simple projection,
          * mostly used by GIS enthusiasts. Directly maps x as longitude, and y as latitude.
          * Also suitable for flat worlds, e.g. game maps. Used by the EPSG:3395 and Simple
          * CRS.
          */
        static LonLat: IProjection;
    }
}
 
declare module L {

    /**
      * Instantiates a rectangle object with the given geographical bounds and
      * optionally an options object.
      */
    function rectangle(bounds: LatLngBounds, options?: PathOptions): Rectangle;

    export class Rectangle extends Polygon {

        /**
          * Instantiates a rectangle object with the given geographical bounds and
          * optionally an options object.
          */
        constructor(bounds: LatLngBounds, options?: PathOptions);
    
        /**
          * Redraws the rectangle with the passed bounds.
          */
        setBounds(bounds: LatLngBounds): Rectangle;
    }
}
 
 
declare module L {

    export interface ScaleOptions {

        /**
          * The position of the control (one of the map corners). See control positions.
          * Default value: 'bottomleft'.
          */
        position?: string;
    
        /**
          * Maximum width of the control in pixels. The width is set dynamically to show
          * round values (e.g. 100, 200, 500).
          * Default value: 100.
          */
        maxWidth?: number;
    
        /**
          * Whether to show the metric scale line (m/km).
          * Default value: true.
          */
        metric?: boolean;
    
        /**
          * Whether to show the imperial scale line (mi/ft).
          * Default value: true.
          */
        imperial?: boolean;
    
        /**
          * If true, the control is updated on moveend, otherwise it's always up-to-date
          * (updated on move).
          * Default value: false.
          */
        updateWhenIdle?: boolean;
    }
}
 
declare module L {

    export class TileLayer implements ILayer, IEventPowered<TileLayer> {

        /**
          * Instantiates a tile layer object given a URL template and optionally an options
          * object.
          */
        constructor(urlTemplate: string, options?: TileLayerOptions);
    
        /**
          * Adds the layer to the map.
          */
        addTo(map: Map): TileLayer;
    
        /**
          * Brings the tile layer to the top of all tile layers.
          */
        bringToFront(): TileLayer;
    
        /**
          * Brings the tile layer to the bottom of all tile layers.
          */
        bringToBack(): TileLayer;
    
        /**
          * Changes the opacity of the tile layer.
          */
        setOpacity(opacity: number): TileLayer;
    
        /**
          * Sets the zIndex of the tile layer.
          */
        setZIndex(zIndex: number): TileLayer;
    
        /**
          * Causes the layer to clear all the tiles and request them again.
          */
        redraw(): TileLayer;
    
        /**
          * Updates the layer's URL template and redraws it.
          */
        setUrl(urlTemplate: string): TileLayer;

        /**
          * Returns the HTML element that contains the tiles for this layer.
          */
        getContainer(): HTMLElement;

        ////////////
        ////////////
        /**
          * Should contain code that creates DOM elements for the overlay, adds them
          * to map panes where they should belong and puts listeners on relevant map events.
          * Called on map.addLayer(layer).
          */
        onAdd(map: Map): void;
    
        /**
          * Should contain all clean up code that removes the overlay's elements from
          * the DOM and removes listeners previously added in onAdd. Called on map.removeLayer(layer).
          */
        onRemove(map: Map): void;
    
        ////////////////
        ////////////////
        addEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): TileLayer;
        addOneTimeEventListener(type: string, fn: (e: LeafletEvent) => void, context?: any): TileLayer;
        removeEventListener(type: string, fn?: (e: LeafletEvent) => void, context?: any): TileLayer;
        hasEventListeners(type: string): boolean;
        fireEvent(type: string, data?: any): TileLayer;
        on(type: string, fn: (e: LeafletEvent) => void, context?: any): TileLayer;
        once(type: string, fn: (e: LeafletEvent) => void, context?: any): TileLayer;
        off(type: string, fn?: (e: LeafletEvent) => void, context?: any): TileLayer;
        fire(type: string, data?: any): TileLayer;
        addEventListener(eventMap: any, context?: any): TileLayer;
        removeEventListener(eventMap?: any, context?: any): TileLayer;
        clearAllEventListeners(): TileLayer;
        on(eventMap: any, context?: any): TileLayer;
        off(eventMap?: any, context?: any): TileLayer;
    }

    module TileLayer {

        export class WMS extends TileLayer {

            /**
              * Instantiates a WMS tile layer object given a base URL of the WMS service and
              * a WMS parameters/options object.
              */
            constructor(baseUrl: string, options: WMSOptions);

            /**
              * Merges an object with the new parameters and re-requests tiles on the current
              * screen (unless noRedraw was set to true).
              */
            setParams(params: WMS, noRedraw?: boolean): WMS;
        }

        export class Canvas {

            /**
              * Instantiates a Canvas tile layer object given an options object (optionally).
              */
            constructor(options?: TileLayerOptions);

            /**
              * You need to define this method after creating the instance to draw tiles;
              * canvas is the actual canvas tile on which you can draw, tilePoint represents
              * the tile numbers, and zoom is the current zoom.
              */
            drawTile(canvas: HTMLCanvasElement, tilePoint: Point, zoom: number): Canvas;

            /**
              * Calling redraw will cause the drawTile method to be called for all tiles.
              * May be used for updating dynamic content drawn on the Canvas
              */
            redraw(): Canvas;
        }
    }

    export interface TileLayerFactory {
        
        /**
          * Instantiates a tile layer object given a URL template and optionally an options
          * object.
          */
        (urlTemplate: string, options?: TileLayerOptions): TileLayer;

        /**
          * Instantiates a WMS tile layer object given a base URL of the WMS service and
          * a WMS parameters/options object.
          */
        wms(baseUrl: string, options: WMSOptions): L.TileLayer.WMS;

        /**
          * Instantiates a Canvas tile layer object given an options object (optionally).
          */
        canvas(options?: TileLayerOptions): L.TileLayer.Canvas;
    }

    export var tileLayer: TileLayerFactory;
}
 
declare module L {

    export interface TileLayerOptions {

        /**
          * Minimum zoom number.
          *
          * Default value: 0.
          */
        minZoom?: number;
    
        /**
          * Maximum zoom number.
          *
          * Default value: 18.
          */
        maxZoom?: number;

        /**
          * Maximum zoom number the tiles source has available. If it is specified,
          * the tiles on all zoom levels higher than maxNativeZoom will be loaded from
          * maxZoom level and auto-scaled.
          *
          * Default value: null.
          */
        maxNativeZoom?: number;
    
        /**
          * Tile size (width and height in pixels, assuming tiles are square).
          *
          * Default value: 256.
          */
        tileSize?: number;
    
        /**
          * Subdomains of the tile service. Can be passed in the form of one string (where
          * each letter is a subdomain name) or an array of strings.
          *
          * Default value: 'abc'.
          */
        subdomains?: string[];
    
        /**
          * URL to the tile image to show in place of the tile that failed to load.
          *
          * Default value: ''.
          */
        errorTileUrl?: string;
    
        /**
          * e.g. "© CloudMade" — the string used by the attribution control, describes
          * the layer data.
          *
          * Default value: ''.
          */
        attribution?: string;
    
        /**
          * If true, inverses Y axis numbering for tiles (turn this on for TMS services).
          *
          * Default value: false.
          */
        tms?: boolean;
    
        /**
          * If set to true, the tile coordinates won't be wrapped by world width (-180
          * to 180 longitude) or clamped to lie within world height (-90 to 90). Use this
          * if you use Leaflet for maps that don't reflect the real world (e.g. game, indoor
          * or photo maps).
          *
          * Default value: false.
          */
        continuousWorld?: boolean;
    
        /**
          * If set to true, the tiles just won't load outside the world width (-180 to 180
          * longitude) instead of repeating.
          *
          * Default value: false.
          */
        noWrap?: boolean;
    
        /**
          * The zoom number used in tile URLs will be offset with this value.
          *
          * Default value: 0.
          */
        zoomOffset?: number;
    
        /**
          * If set to true, the zoom number used in tile URLs will be reversed (maxZoom
          * - zoom instead of zoom)
          *
          * Default value: false.
          */
        zoomReverse?: boolean;
    
        /**
          * The opacity of the tile layer.
          *
          * Default value: 1.0.
          */
        opacity?: number;
    
        /**
          * The explicit zIndex of the tile layer. Not set by default.
          */
        zIndex?: number;
    
        /**
          * If true, all the tiles that are not visible after panning are removed (for
          * better performance). true by default on mobile WebKit, otherwise false.
          */
        unloadInvisibleTiles?: boolean;
    
        /**
          * If false, new tiles are loaded during panning, otherwise only after it (for
          * better performance). true by default on mobile WebKit, otherwise false.
          */
        updateWhenIdle?: boolean;
    
        /**
          * If true and user is on a retina display, it will request four tiles of half the
          * specified size and a bigger zoom level in place of one to utilize the high resolution.
          *
          * Default value: false.
          */
        detectRetina?: boolean;
    
        /**
          * If true, all the tiles that are not visible after panning are placed in a reuse
          * queue from which they will be fetched when new tiles become visible (as opposed
          * to dynamically creating new ones). This will in theory keep memory usage
          * low and eliminate the need for reserving new memory whenever a new tile is
          * needed.
          *
          * Default value: false.
          */
        reuseTiles?: boolean;
    }
}
 
declare module L {

    export class Transformation {

        /**
          * Creates a transformation object with the given coefficients.
          */
        constructor(a: number, b: number, c: number, d: number);
    
        /**
          * Returns a transformed point, optionally multiplied by the given scale.
          * Only accepts real L.Point instances, not arrays.
          */
        transform(point: Point, scale?: number): Point;
    
        /**
          * Returns the reverse transformation of the given point, optionally divided
          * by the given scale. Only accepts real L.Point instances, not arrays.
          */
        untransform(point: Point, scale?: number): Point;
    }
}
 
declare module L {

    export class Util {

        /**
          * Merges the properties of the src object (or multiple objects) into dest object
          * and returns the latter. Has an L.extend shortcut.
          */
        static extend(dest: any, ...sources: any[]): any;
    
        /**
          * Returns a function which executes function fn with the given scope obj (so
          * that this keyword refers to obj inside the function code). Has an L.bind shortcut.
          */
        static bind<T extends Function>(fn: T, obj: any): T;
    
        /**
          * Applies a unique key to the object and returns that key. Has an L.stamp shortcut.
          */
        static stamp(obj: any): string;
        
        /**
          * Returns a wrapper around the function fn that makes sure it's called not more
          * often than a certain time interval time, but as fast as possible otherwise
          * (for example, it is used for checking and requesting new tiles while dragging
          * the map), optionally passing the scope (context) in which the function will
          * be called.
          */
        static limitExecByInterval<T extends Function>(fn: T, time: number, context?: any): T;
    
        /**
          * Returns a function which always returns false.
          */
        static falseFn(): () => boolean;
    
        /**
          * Returns the number num rounded to digits decimals.
          */
        static formatNum(num: number, digits: number): number;
    
        /**
          * Trims and splits the string on whitespace and returns the array of parts.
          */
        static splitWords(str: string): string[];
    
        /**
          * Merges the given properties to the options of the obj object, returning the
          * resulting options. See Class options. Has an L.setOptions shortcut.
          */
        static setOptions(obj: any, options: any): any;
    
        /**
          * Converts an object into a parameter URL string, e.g. {a: "foo", b: "bar"}
          * translates to '?a=foo&b=bar'.
          */
        static getParamString(obj: any): string;
    
        /**
          * Simple templating facility, creates a string by applying the values of the
          * data object of a form {a: 'foo', b: 'bar', …} to a template string of the form
          * 'Hello {a}, {b}' — in this example you will get 'Hello foo, bar'.
          */
        static template(str: string, data: any): string;
    
        /**
          * Returns true if the given object is an array.
          */
        static isArray(obj: any): boolean;
    
        /**
          * Trims the whitespace from both ends of the string and returns the result.
          */
        static trim(str: string): string;

        /**
          * Data URI string containing a base64-encoded empty GIF image. Used as a hack
          * to free memory from unused images on WebKit-powered mobile devices (by setting
          * image src to this string).
          */
        static emptyImageUrl: string;
    }
}
 
 
declare module L {

    export interface WMSOptions {

        /**
          * (required) Comma-separated list of WMS layers to show.
          *
          * Default value: ''.
          */
        layers?: string;
    
        /**
          * Comma-separated list of WMS styles.
          *
          * Default value: 'image/jpeg'.
          */
        styles?: string;
    
        /**
          * WMS image format (use 'image/png' for layers with transparency).
          *
          * Default value: false.
          */
        format?: string;
    
        /**
          * If true, the WMS service will return images with transparency.
          *
          * Default value: '1.1.1'.
          */
        transparent?: boolean;
    
        /**
          * Version of the WMS service to use.
          */
        version?: string;
    
    }
}
 
 
declare module L {

    export interface ZoomOptions {

        /**
          * The position of the control (one of the map corners). See control positions.
          *
          * Default value: 'topright'.
          */
        position?: string;
    }
}
 
declare module L {

    export interface ZoomPanOptions {

        /**
          * If true, the map view will be completely reset (without any animations).
          *
          * Default value: false.
          */
        reset?: boolean;

        /**
          * Sets the options for the panning (without the zoom change) if it occurs.
          */
        pan?: PanOptions;

        /**
          * Sets the options for the zoom change if it occurs.
          */
        zoom?: ZoomOptions;

        /**
          * An equivalent of passing animate to both zoom and pan options (see below).
          */
        animate?: boolean;

        /**
         * If true, it will delay moveend event so that it doesn't happen many times in a row.
         */
        debounceMoveend?: boolean;
    }
}
 
/**
  * Forces Leaflet to use the Canvas back-end (if available) for vector layers 
  * instead of SVG. This can increase performance considerably in some cases 
  * (e.g. many thousands of circle markers on the map).
  */
declare var L_PREFER_CANVAS: boolean;

/**
  * Forces Leaflet to not use touch events even if it detects them.
  */
declare var L_NO_TOUCH: boolean;

/**
  * Forces Leaflet to not use hardware-accelerated CSS 3D transforms for positioning 
  * (which may cause glitches in some rare environments) even if they're supported.
  */
declare var L_DISABLE_3D: boolean;
 
declare module "leaflet" {
	export = L;
}
