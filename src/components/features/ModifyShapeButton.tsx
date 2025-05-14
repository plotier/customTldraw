"use client";

import { useEditor } from "@tldraw/tldraw";
import { Button } from "@/components/ui/button";
import { SwatchBook } from "lucide-react";
import { useState } from "react";
import { COLORS } from "@/lib/colors";
const ModifyShapeButton = () => {
	const editor = useEditor();
	const [currentShapeIndex, setCurrentShapeIndex] =
		useState(0);
	const [buttonColor, setButtonColor] = useState("black");

	const getRandomColor = () => {
		const colors = COLORS;
		return colors[
			Math.floor(Math.random() * colors.length)
		];
	};

	const handleClick = () => {
		const shapes = editor.getCurrentPageShapes();

		if (shapes.length === 0) {
			console.log("No shapes to modify");
			return;
		}

		const index = currentShapeIndex % shapes.length;
		const shape = shapes[index];
		const newColor = getRandomColor();

		editor.updateShapes([
			{
				id: shape.id,
				type: shape.type,
				props: {
					...shape.props,
					color: newColor,
				},
			},
		]);
		setButtonColor(newColor);
		setCurrentShapeIndex(
			(prev) => (prev + 1) % shapes.length
		);
	};

	return (
		<Button
			onClick={handleClick}
			variant="default"
			className="gap-2"
			style={{
				backgroundColor: buttonColor,
				color: "white",
			}}
		>
			Auto Colorize
			<SwatchBook className="w-4 h-4" />
		</Button>
	);
};

export default ModifyShapeButton;
