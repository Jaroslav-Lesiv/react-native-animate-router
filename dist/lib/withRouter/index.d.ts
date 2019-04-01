import { IReactComponent } from "mobx-react";
import React from "react";
import { IRouterStore } from "../..";
interface IExtended {
    routerStore: IRouterStore;
}
declare const withRouter: (WrappedComponent: IReactComponent<any>) => {
    new (props: Readonly<IExtended>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IExtended>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<IExtended> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: IExtended, context?: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IExtended>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<IExtended> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
} & import("mobx-react").IWrappedComponent<IExtended>;
export default withRouter;
//# sourceMappingURL=index.d.ts.map