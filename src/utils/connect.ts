import { TProps } from "@/core/block";
import { StoreEvents } from "../core/Store";
import isEqual from "@/utils/isEqual";

type TMapStateToProps = (state: Record<string, any>) => Record<string, any>;

export function connect<MapStateToProps extends TMapStateToProps>(
	mapStateToProps: MapStateToProps
) {
	return function <TComponent>(Component: TComponent): any {
		return class extends (Component as any) {
			private onChangeStoreCallback: () => void;
			constructor(props: TProps) {
				const store = window.store;
				// сохраняем начальное состояние
				let state = mapStateToProps(store.getState());

				super({ ...props, ...state });

				this.onChangeStoreCallback = () => {
					// при обновлении получаем новое состояние
					const newState = mapStateToProps(store.getState());

					// если что-то из используемых данных поменялось, обновляем компонент
					if (!isEqual(state, newState)) {
						this.setProps({ ...newState });
					}

					// не забываем сохранить новое состояние
					state = newState;
				};

				// подписываемся на событие
				store.on(StoreEvents.Updated, this.onChangeStoreCallback);
			}

			dispatchComponentDidUnmount() {
				super.dispatchComponentDidUnmount();
				window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
			}
		};
	};
}
