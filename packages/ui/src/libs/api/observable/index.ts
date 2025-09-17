import { Subject } from "rxjs"

export const loader$ = new Subject<{}>()
export const error$ = new Subject<{}>()