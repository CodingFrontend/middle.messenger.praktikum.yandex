import type { TProps } from "@/core/block";

export function withRouter<TWrappedBlock extends unknown>(
	WrappedBlock: TWrappedBlock
) {
	return class extends (WrappedBlock as any) {
		constructor(props: TProps) {
			super({ ...props, router: window?.router });
		}
	};
}
