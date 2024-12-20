import Block from "@/core/block";

interface IProps {
	value?: string;
	onChange?: (e: Event) => void;
}

export default class FileUploadField extends Block {
	constructor(props: IProps) {
		super("input", {
			...props,
			classList: "file-upload-input",
			attrs: {
				type: "file",
				name: "file-upload",
				id: "file-upload",
			},
			events: {
				change: props.onChange,
			},
		});
	}

	public value(): File {
		return (this.getContent() as HTMLInputElement).files![0];
	}

	public clear() {
		(this.getContent() as HTMLInputElement).value = "";
	}
}
