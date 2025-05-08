"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { trpc } from "@/app/_trpc/client";
import Loader from "../ui/loader";

const AIBotPopup = () => {
	const [prompt, setPrompt] = useState("");

	const mutation =
		trpc.generateDrawingFromPrompt.useMutation();

	const handleGenerateDrawing = () => {
		mutation.mutate({ prompt });
	};

	useEffect(() => {
		console.log(mutation);
	}, [mutation]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>AI Drawing Tips</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-4 h-6/12 items-center justify-center text-center">
				<DialogHeader>
					<DialogTitle className="text-center">
						AI Asistent
					</DialogTitle>
					<DialogDescription className="text-center">
						What would you like to draw?
					</DialogDescription>
					<Dialog>
						<div className="max-h-48 h-48 overflow-y-auto p-2 rounded">
							<div className="flex items-center justify-center h-full">
								{mutation.isPending ? (
									<Loader size={32} />
								) : mutation.error ? (
									<p className="text-sm ">
										{mutation.error.message}
									</p>
								) : (
									<pre className="whitespace-pre-wrap text-sm text-muted-foreground">
										{mutation.data}
									</pre>
								)}
							</div>
						</div>
					</Dialog>
				</DialogHeader>
				<DialogFooter className="flex flex-col gap-2 items-end w-full h-full">
					<div className="flex flex-col w-full gap-2">
						<input
							type="text"
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							placeholder="Type a prompt and get AI drawing tips."
							className="flex-1 p-2 border border-gray-400 rounded"
						/>
						<div className="flex justify-center gap-2 w-full ">
							<Button
								onClick={handleGenerateDrawing}
								className="h-12 px-6w-32 "
								variant="default"
								disabled={
									mutation.isPending || prompt.trim() === ""
								}
							>
								Bot Drawing Advices
							</Button>
							<DialogClose asChild>
								<Button
									className="h-12 px-6 w-24 cursor-pointer"
									variant="secondary"
								>
									Close
								</Button>
							</DialogClose>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AIBotPopup;
