import Block from "@/core/block";
import FileUploadField from "@/components/form/file-upload/file-upload-field.ts";

interface Props {
	label: string;
	onChange?: () => void;
}

export default class FileUpload extends Block {
	constructor(props: Props) {
		super("div", {
			...props,
			fileName: null,
			classList: "file-upload",
			FileUploadField: new FileUploadField({
				onChange: () => {
					if (props.onChange) props.onChange();
				},
			}),
		});
	}

	public value() {
		return this.children.FileUploadField.value();
	}

	public clear() {
		this.children.FileUploadField.clear();
	}

	public render(): string {
		return `
			{{{ FileUploadField }}}
			<label for='file-upload' class='file-upload__label'>{{label}}</label>
    `;
	}
}
