import Block from "@/core/block";

type AvatarProps = {
	size?: string;
	image: string | null;
	Slot?: Block;
};

export default class Avatar extends Block {
	constructor(props: AvatarProps) {
		super("div", {
			...props,
			classList: `avatar avatar--${props.size}`,
		});
	}
	public render(): string {
		return `
      {{#if image}}
				<img src='https://ya-praktikum.tech/api/v2/resources${(this.props as AvatarProps).image}' alt='avatar-image' />
			{{/if}}

			{{{ Slot }}}
    `;
	}
}
