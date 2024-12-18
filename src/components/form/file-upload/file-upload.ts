import Block from "@/core/block";
import FileUploadField from "@/components/form/file-upload/file-upload-field.ts";

interface Props {
	label: string;
	onChange?: (e: Event) => void;
}

export default class FileUpload extends Block {
	constructor(props: Props) {
		super("div", {
			...props,
			fileName: null,
			classList: "file-upload",
			FileUploadField: new FileUploadField({
				onChange: () => {
					const fileName = this.children.FileUploadField.getContent().files[0];
					this.setProps({
						fileName,
					});
					props.onChange;
				},
			}),
		});
	}

	public value() {
		return this.children.FileUploadField.getContent().files[0];
	}

	public clear() {
		this.children.FileUploadField.getContent().files = null;
	}

	public render(): string {
		return `
			{{{ FileUploadField }}}
			<label for='file-upload' class='file-upload__label'>{{label}}</label>
    `;
	}
}
