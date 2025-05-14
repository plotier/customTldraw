"use client";
import {
	Eraser,
	Hand,
	Pencil,
	MoveUp,
	Type,
	MousePointer2,
	Palette,
	Undo2,
	Redo2,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	useEditor,
	DefaultColorStyle,
} from "@tldraw/tldraw";

import { useState, useEffect } from "react";
import { COLORS } from "@/lib/colors";

const tools = [
	{ tool: "select", icon: MousePointer2 },
	{ tool: "hand", icon: Hand },
	{ tool: "draw", icon: Pencil },
	{ tool: "eraser", icon: Eraser },
	{ tool: "arrow", icon: MoveUp },
	{ tool: "text", icon: Type },
	{ tool: "color", icon: Palette, isColorPicker: true },
];

const actions = [
	{ tool: "undo", icon: Undo2 },
	{ tool: "redo", icon: Redo2 },
];

export function AppSidebar() {
	const editor = useEditor();
	const colors = COLORS;

	const [currentColor, setCurrentColor] = useState("black");
	const [showColors, setShowColors] = useState(false);
	const handleClick = (tool: string) => {
		console.log(tool);
		if (!editor) return;
		if (tool === "color") {
			setShowColors(!showColors);
			return;
		}
		if (tool === "undo") {
			editor.undo();
			return;
		}
		if (tool === "redo") {
			editor.redo();
			return;
		}

		editor.setCurrentTool(tool);
	};
	const handleColorChange = (color: string) => {
		setCurrentColor(color);
		editor.setStyleForNextShapes(DefaultColorStyle, color);
	};
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!editor) return;

			if (e.ctrlKey && e.key === "z") {
				e.preventDefault();
				if (e.shiftKey) {
					editor.redo();
				} else {
					editor.undo();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [editor]);

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{tools.map((item) => (
								<SidebarMenuItem key={item.tool}>
									{item.isColorPicker ? (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<SidebarMenuButton asChild>
													<button>
														<item.icon
															color={currentColor}
														/>
													</button>
												</SidebarMenuButton>
											</DropdownMenuTrigger>
											<DropdownMenuContent side="right">
												{colors.map((color) => (
													<DropdownMenuItem
														key={color}
														onClick={() =>
															handleColorChange(color)
														}
													>
														<div className="flex items-center gap-2">
															<div
																className="w-4 h-4 rounded-full"
																style={{
																	backgroundColor: color,
																}}
															/>
															<p className="text-gray-500 capitalize">
																{color}
															</p>
														</div>
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									) : (
										<SidebarMenuButton asChild>
											<button
												onClick={() =>
													handleClick(item.tool)
												}
											>
												<item.icon />
											</button>
										</SidebarMenuButton>
									)}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup className="mt-5">
					<SidebarGroupContent>
						<SidebarMenu>
							{actions.map((action) => (
								<SidebarMenuItem key={action.tool}>
									<SidebarMenuButton asChild>
										<button
											onClick={() =>
												handleClick(action.tool)
											}
										>
											<action.icon className="text-muted-background" />
										</button>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
