import React, { ComponentState } from "react";
import { inject, observer } from "mobx-react";
import * as Animatable from "react-native-animatable";
import { IRouterStore, IRoute } from "../store";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");
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

interface IRouteComponentProps {
  duration?: number;
  delay?: number;

  routes: string[];
  currentRoute: IRoute;
  unmount?: boolean;

  animationIn?: string;
  animationOut?: string;
}

class Route extends React.Component<IRouteComponentProps> {
  static defaultProps = {
    delay: 0,
    duration: 400,

    routes: [],
    animationIn: "FadeIn",
    animationOut: "FadeOut",
    unmount: true
  };

  state = {
    isActive: false,
    rendered: false
  };

  componentDidMount() {
    if (!this.props.routes.length) {
    }
  }

  static getDerivedStateFromProps(props: IRouteComponentProps, state) {
    const isActive = Boolean(~props.routes.indexOf(props.currentRoute.key));
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
  }

  shouldComponentUpdate = (
    props: IRouteComponentProps,
    state: ComponentState
  ) => this.state.isActive !== state.isActive;

  render() {
    // just hide block if it unmount=false (default=true)
    if (!this.props.unmount && this.state.rendered) {
      return (
        <Animatable.View
          // for better perf always use native driver
          useNativeDriver
          duration={this.props.duration}
          delay={this.props.delay}
          style={[StyleSheet.absoluteFill]}
          animation={
            this.state.isActive
              ? this.props.animationIn
              : this.props.animationOut
          }
        >
          {this.props.children}
        </Animatable.View>
      );
    }

    if (!this.state.isActive) {
      return null;
    }
    return this.props.children;
  }
}

const MRoute = inject(({ routerStore }: { routerStore: IRouterStore }) => ({
  currentRoute: routerStore.currentRoute
}))(observer(Route));
export default MRoute;
