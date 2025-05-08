"use client";

import { useEditor } from "@tldraw/tldraw";
import { Button } from "@/components/ui/button";

const ModifyShapeButton = () => {
	const editor = useEditor();

	const getRandomColor = () => {
		const colors = [
			"black",
			"light-violet",
			"violet",
			"blue",
			"light-blue",
			"yellow",
			"orange",
			"green",
			"light-green",
			"light-red",
			"red",

		];
		return colors[
			Math.floor(Math.random() * colors.length)
		];
	};

	const handleClick = () => {
		const shapes = editor.getCurrentPageShapes();
		if (shapes.length === 0) {
			console.log("No hay shapes para modificar");
			return;
		}

		const firstShape = shapes[0];
		const newColor = getRandomColor();

		editor.updateShapes([
			{
				id: firstShape.id,
				type: firstShape.type,
				props: {
					...firstShape.props,
					color: newColor,
				},
			},
		]);
	};

	return (
		<Button
			onClick={handleClick}
			className="absolute top-4 left-4 text-white px-4 py-2 rounded"
			variant={"default"}
		>
			Cambiar color de shape
		</Button>
	);
};

export default ModifyShapeButton;
