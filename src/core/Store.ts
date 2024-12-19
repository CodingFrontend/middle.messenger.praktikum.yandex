import EventBus from "./eventBus";

export enum StoreEvents {
	Updated = "Updated",
}

export class Store extends EventBus<string> {
	private state: Record<string, any> = {};
	public static __instance: Store;

	constructor(defaultState: any) {
		if (Store.__instance) {
			return Store.__instance;
		}
		super();

		this.state = defaultState;
		this.set(defaultState);

		Store.__instance = this;
	}

	public getState() {
		return this.state;
	}

	public set(nextState: any) {
		const prevState = { ...this.state };

		this.state = { ...this.state, ...nextState };

		this.emit(StoreEvents.Updated, prevState, nextState);
	}
}
