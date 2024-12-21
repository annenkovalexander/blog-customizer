import { MouseEventHandler } from "react";

export type ArcticleParamsFormType = {
	isOpen: boolean;
	toggleIsOpen: () => void;
	clickOutside: MouseEventHandler<HTMLDivElement>;
}