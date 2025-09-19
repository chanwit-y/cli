import type { Box } from "../@types";

export class Builder {
	constructor( private _boxs: Box[]) { }

	public draw() {
		return <div className="grid grid-cols-12 gap-1">
			{this._boxs.map((b) =>
				<div className={` bg-amber-800 sm-col-span-${b.sm} md-col-span-${b.md} lg-col-span-${b.lg} xl-col-span-${b.xl}  `}>
					<span>x</span>
				</div>)}
		</div>
	}
}
