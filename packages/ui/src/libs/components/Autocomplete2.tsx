import {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type CSSProperties,
	type ElementRef
} from "react";
import type { AutocompleteItem2, AutocompleteProps2 } from "./@types";
import { Box, Text } from "@radix-ui/themes";
import { cn } from "../util/utils";
import { AlertCircle, Check, ChevronDown, Search, X } from "lucide-react";
import { useCore } from "./core/context";
import { debounce, distinct, interval, Subject, switchMap } from "rxjs";
import { isEmpty } from "lodash";

const createAutocomplete = <T extends Record<string, any>>() => {
	return forwardRef<
		ElementRef<"button">,
		AutocompleteProps2<T> & { onChange?: (value: string) => void }
	>(({
		label,
		name,
		placeholder,
		options,
		searchKey,
		idKey,
		displayKey,
		value,
		helperText,
		error,
		errorMessage,
		maxResults,
		className,
		canObserve,
		observeTo,
		api,
		apiInfo,
		// defaultData: defaultValue,
		// apiCanSearch = false,
		// apiObserveParam,
		onValueChange,
		onChange,
		onBlur,
		...props
	}, ref) => {
		const { addObserveTable, getDataValue } = useCore()

		const [items, setItems] = useState(options ?? [])
		const [listboxId] = useState(() => `listbox-${Math.random().toString(36).substr(2, 9)}`);
		const [isOpen, setIsOpen] = useState(false)
		const [dropdownStyles, setDropdownStyles] = useState<CSSProperties>({});
		const [selectedIndex, setSelectedIndex] = useState(-1);
		const [query, setQuery] = useState('');
		const [observeData, setObserveData] = useState<unknown>();

		const triggerRef = useRef<HTMLButtonElement>(null);
		const dropdownRef = useRef<HTMLDivElement>(null);
		const dropdownContainerRef = useRef<HTMLDivElement>(null);
		const searchInputRef = useRef<HTMLInputElement>(null);

		const subject = useMemo(() => new Subject<string>(), [])


		const filteredItems = useMemo(() => {
			if (!query.trim()) return items;

			return items.filter(item => item[searchKey].toLowerCase().includes(query.toLowerCase()))
		}, [query, items, maxResults])
		const hasError = useMemo(() => error && !!errorMessage, [error, errorMessage]);
		const displayHelperText = useMemo(() => hasError ? errorMessage : helperText, [hasError, errorMessage, helperText]);
		const selectedItem = useMemo(() => items.find(item => String(item[idKey]) === String(value)), [items, value, searchKey]);

		const fetchData = useCallback((text: string) => {
			const q = Object.entries(apiInfo?.query ?? {}).reduce((acc, [key, value]) => {
				return { ...acc, [key]: value.type === "value" ? value.value : undefined }
			}, {})
			console.log('fetchData', apiInfo)
			if (observeTo !== "") {
				if (!isEmpty(apiInfo?.params)) {
					if (!isEmpty(observeData)) {
						const p = Object.entries(apiInfo?.params ?? {}).reduce((acc, [key, value]) => {
							return { ...acc, [key]: value.type === "observe" ? observeData : value.type === "value" ? text : value }
						}, {})

						return api && api({ ...q }, {
							...p
						})
					}
				}
			} else {
				console.log("query", q)
				return api && api({ ...q }, {})
			}
		}, [observeTo, observeData, api, apiInfo]);

		const apiSearch = useMemo(() => {
			if (api && apiInfo?.query) {
				return subject.pipe(
					debounce(() => interval(500)),
					distinct(),
					switchMap(async (text) => {
						return Promise.resolve(fetchData(text))
					}),

				)
			} else return undefined
		}, [subject, apiInfo, fetchData, observeData])

		const handValueChange = useCallback((newValue: string) => {
			onValueChange?.(newValue);
			onChange?.(newValue);
			if (canObserve && name) {
				// observeTable?.[name as keyof typeof observeTable].next(newValue);
				getDataValue({ key: name, type: "observe" })?.next(newValue)
			}
		}, [onValueChange, onChange, canObserve, name, getDataValue])
		const handleSelect = useCallback((item: T) => {
			handValueChange(String(item[idKey]));
			setQuery('');
			setIsOpen(false);
			setSelectedIndex(-1);
			if (onBlur) onBlur();
		}, [handValueChange, onBlur, idKey])

		const openDropdown = useCallback(() => {
			// Why use just only triggerRef?
			if (triggerRef.current) {
				const rect = triggerRef.current.getBoundingClientRect();
				const spaceBelow = window.innerHeight - rect.bottom;
				const spaceAbove = rect.top;
				const dropdownHeight = 280;
				const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

				const styles: CSSProperties = {
					position: 'fixed',
					zIndex: 50,
					left: rect.left,
					width: rect.width,
				}

				if (shouldShowAbove) {
					styles.bottom = window.innerHeight - rect.top + 4
				} else {
					styles.top = rect.bottom + 4;
				}

				setDropdownStyles(styles);
			}
			setIsOpen(prev => !prev);
			setTimeout(() => {
				dropdownContainerRef.current?.classList.add('opacity-100');
				searchInputRef.current?.focus();
			}, 0)
		}, []);

		const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
			if (!isOpen) {
				if (['Enter', 'ArrowDown'].includes(e.key)) {
					e.preventDefault();
					openDropdown();
				}
				return;
			}

			switch (e.key) {
				case 'ArrowDown':
					e.preventDefault();
					setSelectedIndex(prev => prev < filteredItems.length - 1 ? prev + 1 : 0);
					break;
				case 'ArrowUp':
					e.preventDefault();
					setSelectedIndex(prev => prev > 0 ? prev - 1 : filteredItems.length - 1);
					break;
				case 'Enter':
					e.preventDefault();
					if (selectedIndex >= 0 && filteredItems[selectedIndex]) {
						handleSelect(filteredItems[selectedIndex])
					}
					break;
				case 'Escape':
					setIsOpen(false);
					setSelectedIndex(-1);
					triggerRef.current?.focus();
					break;
				case 'Tab':
					setIsOpen(false);
					break;
			}
		}, [isOpen, openDropdown, selectedIndex, filteredItems, handleSelect, triggerRef]);

		// Handle click outside
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				const target = event.target as Node;

				// Check if click is outside both the trigger button and dropdown
				const isOutsideTrigger = dropdownRef.current && !dropdownRef.current.contains(target);
				const isOutsideDropdown = dropdownContainerRef.current && !dropdownContainerRef.current.contains(target);

				if (isOpen && isOutsideTrigger && isOutsideDropdown) {
					setIsOpen(false);
					setQuery('');
					setSelectedIndex(-1);
				}
			};

			if (isOpen) {
				document.addEventListener('mousedown', handleClickOutside);
			}

			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [isOpen]);

		useEffect(() => setSelectedIndex(-1), [query])

		useEffect(() => {
			canObserve && name && addObserveTable(name);
		}, [canObserve, name, addObserveTable]);

		useEffect(() => {
			if (observeTo) {
				getDataValue({ key: observeTo, type: "observe" })?.subscribe((data: unknown) => {
					onChange?.(null as any)
					onValueChange?.(null as any)
					setObserveData(data)
				})
			}
		}, [getDataValue, observeTo])

		const getItems = useCallback((res: any) => {
			let data = res
			apiInfo?.paths?.forEach((path) => {
				data = data[path]
			})
			return data ?? []
		}, [apiInfo])

		useEffect(() => {
			fetchData("")?.then((res) => {
				setItems(getItems(res))
			});
		}, [observeData])

		useEffect(() => {
			if (!apiInfo?.query) {
				const result = fetchData("");
				if (result) {
					result.then((res) => setItems(getItems(res)));
				}
			}
			else if (apiSearch) {
				apiSearch.subscribe((res) => {
					setItems(getItems(res))
				})
			}
		}, [apiSearch, observeData]);

		return <Box className="w-full" >
			{
				label && (
					<Text as="label" size="2" weight="medium" className="block mb-1">
						{label}
					</Text>
				)
			}
			<div className="relative mb-1" ref={dropdownRef}>
				<button
					ref={ref || triggerRef}
					onClick={openDropdown}
					className={cn("w-full h-[40px] px-4 text-sm flex items-center justify-between",
						"bg-white border rounded-md shadow-sm transition-all duration-200",
						"text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent",
						hasError
							? "border-red-300 hover:border-red-400"
							: "border-gray-300 hover:border-gray-400",
						className,)}
					data-error={String(hasError)}
					{...props}
				>
					<div className="flex flex-1 min-w-0 items-center gap-3">
						<Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
						<span className={`truncate ${!selectedItem ? 'text-gray-400' : 'text-gray-900'}`}>
							{selectedItem ? selectedItem[displayKey] : placeholder}
						</span>
					</div>
					<div className="flex items-center flex-shrink-0">
						<ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
					</div>
				</button>

			</div>
			{isOpen && (
				<div
					ref={dropdownContainerRef}
					style={dropdownStyles}
					className="mt-1 absolute bg-white border ring-2 ring-blue-400 border-transparent rounded-md shadow-lg overflow-hidden ease-in duration-100 opacity-0 z-20"
				>
					<div className="flex items-center border-b border-gray-100 px-3">
						<Search className="h-4 w-4 text-gray-400 mr-2" />
						<input
							type="text"
							ref={searchInputRef}
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								subject && subject.next(e.target.value);
							}}
							onKeyDown={handleKeyDown}
							placeholder="Type to search..."
							className="flex-1 py-2 text-sm border-none outline-none bg-transparent placeholder:text-gray-400"
						/>
						{query && (
							<button
								onClick={() => setQuery('')}
								className="p-1 hover:bg-gray-100 rounded-full transition-colors"
							>
								<X className="h-3 w-3 text-gray-400" />
							</button>
						)}

					</div>
					<div
						id={listboxId}
						className="max-h-64 overflow-auto py-1">
						{filteredItems?.length === 0
							? <div className="flex justify-center text-sm">
								No results found
							</div>
							: filteredItems.map((item) => {
								const isSelected = selectedIndex === filteredItems.findIndex(i => i[idKey] === item[idKey]);
								const isCurrent = value === item[idKey];
								return (<button key={item[idKey]}
									onClick={() => handleSelect(item)}
									aria-selected={isCurrent}
									data-focused={isSelected}
									className={cn("w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors cursor-pointer",
										isSelected
											? "bg-blue-50 text-blue-700 font-semibold"
											: "text-gray-700 hover:bg-gray-50",
										isCurrent ? "bg-blue-50 text-blue-700 font-semibold" : ""
									)}>
									{item[displayKey]}
									{isCurrent && (<Check className="h-4 w-4 text-blue-600 ml-2 flex-shrink-0" />)}
								</button>)
							})}
					</div>
				</div>
			)}
			{
				displayHelperText && (
					<Text
						size="1"
						id="autocomplete-helper"
						className={cn(
							"block mt-2 mr-1 item-center",
							hasError ? "text-red-500 flex items-center gap-0.5" : "text-gray-600"
						)}>
						{hasError && <AlertCircle className=" inline-block h-3 w-3 mr-[0.1rem]" />}
						{displayHelperText}
					</Text>
				)

			}
		</Box>
	})
}

const AutocompleteBase2 = createAutocomplete<AutocompleteItem2>()
AutocompleteBase2.displayName = "Autocomplete2";

// const Autocomplete2 = withTheam(AutocompleteBase2);

export { AutocompleteBase2 };