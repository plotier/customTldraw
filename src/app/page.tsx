"use client";

import {
	getSnapshot,
	loadSnapshot,
	Tldraw,
	useEditor,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useEffect } from "react";
import { trpc } from "@/app/_trpc/client";
import ModifyShapeButton from "../components/features/ModifyShapeButton";
import AIBotPopup from "../components/features/AIBotPopup";
import { AppSidebar } from "@/components/features/AppSidebar";

function InsideOfContext() {
	const editor = useEditor();
	const { data, isSuccess } = trpc.getDocument.useQuery();
	const { mutate: saveDoc } =
		trpc.saveDocument.useMutation();

	useEffect(() => {
		if (!editor || !isSuccess || !data) return;

		try {
			loadSnapshot(editor.store, data);
		} catch (err) {
			console.error("Error cargando snapshot:", err);
		}
	}, [editor, data, isSuccess]);

	useEffect(() => {
		if (!editor) return;

		const cleanup = editor.store.listen(
			() => {
				const snapshot = getSnapshot(editor.store);
				saveDoc(snapshot);
			},
			{ source: "user", scope: "document" }
		);

		return () => cleanup();
	}, [editor, saveDoc]);

	return null;
}

export default function HomePage() {
	return (
		<div className="h-screen w-screen relative">
			<Tldraw hideUi>
				<AppSidebar />
				<InsideOfContext />
				<div className="absolute top-10 right-6 flex flex-col gap-2">
					<ModifyShapeButton />
					<AIBotPopup />
				</div>
			</Tldraw>
		</div>
	);
}
