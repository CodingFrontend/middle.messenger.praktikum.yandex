import Route from "./Route";
import { ROUTES } from "@/constants";
import type { BlockConsturctor } from "./block";

export interface RouteInterface {
	render: () => void;
	match: (path: string) => boolean;
	leave: () => void;
}

class Router {
	public routes: RouteInterface[] = [];
	public history: any;
	private _currentRoute?: RouteInterface | null;
	private _rootQuery?: string;
	public static __instance: Router;

	constructor(rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: string, block: BlockConsturctor) {
		const route: RouteInterface = new Route(pathname, block, {
			rootQuery: this._rootQuery,
		});
		this.routes.push(route);
		return this;
	}

	start() {
		const { user } = window.store.getState();

		if (
			!user &&
			window.location.pathname !== ROUTES.register &&
			window.location.pathname !== ROUTES.login
		) {
			this.go(ROUTES.login);

			return;
		}

		if (
			user &&
			(window.location.pathname === ROUTES.register ||
				window.location.pathname === ROUTES.login)
		) {
			this.go(ROUTES.messenger as string);

			return;
		}

		window.onpopstate = ((event: PopStateEvent) => {
			this._onRoute(
				(event.currentTarget as Window).location.pathname as unknown as Location
			);
		}).bind(this);
		this._onRoute(window.location.pathname as unknown as Location);
	}

	_onRoute(pathname: string | Location) {
		const route = this.getRoute(pathname as Location);

		if (!route) {
			return;
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;

		route.render();
	}

	go(pathname: string | Location) {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname: string | Location) {
		const route = this.routes.find((route: RouteInterface) =>
			route.match(pathname as string)
		);
		if (!route) {
			return this.routes.find((route) => route.match("*"));
		}
		return route;
	}
}

export default Router;
