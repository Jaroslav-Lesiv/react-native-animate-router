import { observer, inject, IReactComponent } from "mobx-react";
import React from "react";
import { IRouterStore } from "../..";

interface IExtended {
   routerStore: IRouterStore
}

const withRouter = (WrappedComponent: IReactComponent) => {
  return inject("routerStore")(
    observer(
      class extends React.Component<IExtended> {
        render() {
          if (!this.props.routerStore) {
            console.warn("withRouter must be wrapped inside routerStore");
          }
          return <WrappedComponent {...this.props} />;
        }
      }
    )
  );
};

export default withRouter;
