import type { BlockConsturctor } from "@/core/block";

export function withRouter(WrappedBlock: BlockConsturctor) {
	return class extends WrappedBlock {
		constructor(props: any) {
			super({ ...props, router: window?.router });
		}
	};
}
