import Block from "@/core/block";
import { LinkButton } from "@/components";
import { withRouter } from "@/utils/withRouter";
import { ROUTES } from "@/constants";

class NotFoundPage extends Block {
	constructor() {
		super("main", {
			classList: "page not-found",
			LinkButton: new LinkButton({
				label: "Назад к чатам",
				type: "primary",
				onClick: () => {
					const router = window.router;
					router.go(ROUTES.messenger);
				},
			}),
		});
	}

	public render(): string {
		return `
			<h1 class="not-found__number">400</h1>
			<p class="not-found__text">Не туда попали</p>
			{{{ LinkButton }}}
    `;
	}
}

export default withRouter(NotFoundPage);
