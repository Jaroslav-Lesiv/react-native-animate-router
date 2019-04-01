import { observable, action, computed } from "mobx";

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

class RouterStore implements IRouterStore {
  @observable history: IRoute[] = [];
  initialRoute = {
    key: ""
  };
  constructor(config: IRouterConfig) {
    this.initialRoute = config.route;
    this.history = [config.route];
  }

  @action push(key: string, params: IRouteParams = {}) {
    this.history.push({
      key,
      params
    });
  }

  @action replace(key: string, params: IRouteParams = {}) {
    this.history[this.history.length - 1] = { key, params };
  }

  @action back() {
    const previsionRoute = this.history[this.history.length - 2];
    if (previsionRoute) {
      this.history = this.history.slice(0, this.history.length - 1);
    } else {
      this.history = [this.initialRoute];
    }
  }

  @computed get currentRoute() {
    return this.history[this.history.length - 1];
  }
}

export default RouterStore;
