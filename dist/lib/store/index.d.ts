export interface IRouteParams {
    title?: "";
    withBack?: boolean;
    withBottomNavigation?: boolean;
}
export interface IRoute {
    key: string;
    params?: IRouteParams;
}
export interface IRouterConfig {
    route: IRoute;
}
export interface IRouterStore {
    constructor: (config: IRouterConfig) => void;
    history: IRoute[];
    initialRoute: IRoute;
    push: (key: string, params: IRouteParams) => void;
    replace: (key: string, params: IRouteParams) => void;
    back: () => void;
    currentRoute: IRoute;
}
declare class RouterStore implements IRouterStore {
    history: IRoute[];
    initialRoute: {
        key: string;
    };
    constructor(config: IRouterConfig);
    push(key: string, params?: IRouteParams): void;
    replace(key: string, params?: IRouteParams): void;
    back(): void;
    readonly currentRoute: IRoute;
}
export default RouterStore;
//# sourceMappingURL=index.d.ts.map