"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var mobx_react_1 = require("mobx-react");
var Animatable = __importStar(require("react-native-animatable"));
var react_native_1 = require("react-native");
var _a = react_native_1.Dimensions.get("screen"), width = _a.width, height = _a.height;
Animatable.initializeRegistryWithDefinitions({
    SlideInUp: {
        from: {
            transform: [{ translateY: height }]
        },
        to: {
            transform: [{ translateY: 0 }]
        }
    },
    SlideOutUp: {
        from: {
            transform: [{ translateY: 0 }]
        },
        to: {
            transform: [{ translateY: height }]
        }
    },
    SlideInDown: {
        from: {
            transform: [{ translateY: -height }]
        },
        to: {
            transform: [{ translateY: 0 }]
        }
    },
    SlideOutDown: {
        from: {
            transform: [{ translateY: 0 }]
        },
        to: {
            transform: [{ translateY: -height }]
        }
    },
    SlideInRight: {
        from: {
            transform: [{ translateX: width }]
        },
        to: {
            transform: [{ translateX: 0 }]
        }
    },
    SlideInLeft: {
        from: {
            transform: [{ translateX: -width }]
        },
        to: {
            transform: [{ translateX: 0 }]
        }
    },
    SlideOutRight: {
        from: {
            transform: [{ translateX: 0 }]
        },
        to: {
            transform: [{ translateX: width }]
        }
    },
    SlideOutLeft: {
        from: {
            transform: [{ translateX: 0 }]
        },
        to: {
            transform: [{ translateX: -width }]
        }
    },
    FadeIn: {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    },
    FadeOut: {
        from: {
            opacity: 1
        },
        to: {
            opacity: 0
        }
    }
});
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isActive: false,
            rendered: false
        };
        _this.shouldComponentUpdate = function (props, state) { return _this.state.isActive !== state.isActive; };
        return _this;
    }
    Route.prototype.componentDidMount = function () {
        if (!this.props.routes.length) {
        }
    };
    Route.getDerivedStateFromProps = function (props, state) {
        var isActive = Boolean(~props.routes.indexOf(props.currentRoute.key));
        if (isActive) {
            return {
                isActive: true,
                rendered: true
            };
        }
        return {
            isActive: false,
            rendered: state.rendered
        };
    };
    Route.prototype.render = function () {
        // just hide block if it unmount=false (default=true)
        if (!this.props.unmount && this.state.rendered) {
            return (react_1.default.createElement(Animatable.View
            // for better perf always use native driver
            , { 
                // for better perf always use native driver
                useNativeDriver: true, duration: this.props.duration, delay: this.props.delay, style: [react_native_1.StyleSheet.absoluteFill], animation: this.state.isActive
                    ? this.props.animationIn
                    : this.props.animationOut }, this.props.children));
        }
        if (!this.state.isActive) {
            return null;
        }
        return (react_1.default.createElement(Animatable.View
        // for better perf always use native driver
        , { 
            // for better perf always use native driver
            useNativeDriver: true, duration: this.props.duration, delay: this.props.delay, style: [react_native_1.StyleSheet.absoluteFill], animation: this.state.isActive ? this.props.animationIn : this.props.animationOut }, this.props.children));
    };
    Route.defaultProps = {
        delay: 0,
        duration: 400,
        routes: [],
        animationIn: "FadeIn",
        animationOut: "FadeOut",
        unmount: true
    };
    return Route;
}(react_1.default.Component));
var MRoute = mobx_react_1.inject(function (_a) {
    var routerStore = _a.routerStore;
    return ({
        currentRoute: routerStore.currentRoute
    });
})(mobx_react_1.observer(Route));
exports.default = MRoute;
