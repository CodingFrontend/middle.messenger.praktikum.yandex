import Block from "@/core/block";
import { LinkButton } from "@/components";
import { withRouter } from "@/utils/withRouter";

class NavigationPage extends Block {
	constructor() {
		super("nav", {
			LinkButton: new LinkButton({
				label: "Назад к чатам",
				type: "primary",
			}),
		});
	}

	public render(): string {
		return `
			  <ul class='navigation'>
					<li><a href='/login' page='login'>Login</a></li>
					<li><a href='/register' page='register'>Register</a></li>
					<li><a href='/chat' page='chat'>Chat</a></li>
					<li><a href='/profile' page='profile'>Profile</a></li>
				</ul>
    `;
	}
}

export default withRouter(NavigationPage);
