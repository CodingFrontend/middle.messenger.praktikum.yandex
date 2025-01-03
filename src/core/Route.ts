import { RouteInterface } from "./Router";
import Block from "./block";
import type { BlockConsturctor, TProps } from "./block";

export type TPathName = string;

export interface RouteContsructorInterface extends Route {
	new (name: string): {
		pathname: TPathName;
		view: unknown;
		props: TProps;
	};
}

class Route implements RouteInterface {
	private _blockClass: BlockConsturctor;
	private _pathname: TPathName;
	private _block: Block | null;
	private _props: TProps;

	constructor(pathname: TPathName, view: unknown, props: TProps) {
		this._pathname = pathname;
		this._blockClass = view as BlockConsturctor;
		this._block = null;
		this._props = props;
	}

	leave() {
		if (this._block) {
			this._block.dispatchComponentDidUnmount();
		}
	}

	match(pathname: TPathName) {
		return pathname === this._pathname;
	}

	_renderDom(query: string, block: Block) {
		const root = document.querySelector(query);
		if (!root) return "";
		root.innerHTML = "";
		root.append(block.getContent() as string);
	}

	render() {
		if (!this._block) {
			this._block = new this._blockClass({} as unknown) as Block;
		}

		if (this._block) {
			this._renderDom(this._props.rootQuery, this._block);
			this._block.componentDidMount();
		}
	}
}

export default Route;
