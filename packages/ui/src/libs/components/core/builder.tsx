import type { ApiMaster, TApiMaster } from "../../api/APIMaster";
import type { TModelMaster } from "../../model/master";
import type { AutocompleteElement, Box, Container, TextFieldElement } from "../@types";
import { Autocomplete } from "./autocomplete";
import { z } from "zod";
// import { Element } from "./element";

export class Builder<M extends TModelMaster, A extends TApiMaster<M>> {
	constructor(private _connainers: Container[], private _apis: ApiMaster<M, A>, private _form: any) { }

	//TODO add method create form schema
	private _schema() {
		const schemaFields: Record<string, z.ZodTypeAny> = {};

		const processContainers = (containers: Container[]): Record<string, z.ZodTypeAny> => {
			const fields: Record<string, z.ZodTypeAny> = {};

			containers.forEach(container => {
				const containerFields = this.processBoxes(container.boxs);
				
				if (container.isAaary) {
					// If container is an array, wrap the schema in z.array()
					fields[container.name] = z.array(z.object(containerFields));
				} else {
					// If container is not an array, merge fields directly
					Object.assign(fields, containerFields);
				}
			});

			return fields;
		};

		Object.assign(schemaFields, processContainers(this._connainers));
		
		return z.object(schemaFields);
	}

	private processBoxes(boxes: Box[]): Record<string, z.ZodTypeAny> {
		const fields: Record<string, z.ZodTypeAny> = {};

		boxes.forEach(box => {
			if (box.element) {
				const elementSchema = this.createElementSchema(box.element);
				if (elementSchema && 'name' in box.element) {
					fields[box.element.name] = elementSchema;
				}
			} else if (box.container) {
				const containerFields = this.processBoxes(box.container.boxs);
				
				if (box.container.isAaary) {
					fields[box.container.name] = z.array(z.object(containerFields));
				} else {
					Object.assign(fields, containerFields);
				}
			}
		});

		return fields;
	}

	private createElementSchema(element: AutocompleteElement | TextFieldElement): z.ZodTypeAny | null {
		// Check if element is AutocompleteElement (has dataType property)
		if ('dataType' in element) {
			const autocompleteElement = element as AutocompleteElement;
			let schema = this.getZodTypeFromDataType(autocompleteElement.dataType);
			
			// Apply required validation
			if (!autocompleteElement.isRequired) {
				schema = schema.optional();
			}

			return schema;
		}

		// Handle TextFieldElement - for now assume string type
		// This can be extended when TextFieldElement has more properties
		return z.string();
	}

	private getZodTypeFromDataType(dataType: string): z.ZodTypeAny {
		switch (dataType.toLowerCase()) {
			case 'string':
				return z.string();
			case 'number':
				return z.number();
			case 'boolean':
				return z.boolean();
			case 'date':
				return z.date();
			case 'email':
				return z.string().email();
			case 'url':
				return z.string().url();
			case 'uuid':
				return z.string().uuid();
			case 'array':
				return z.array(z.unknown());
			case 'object':
				return z.object({});
			default:
				// Default to string for unknown types
				return z.string();
		}
	}

	public getSchema() {
		return this._schema();
	}

	public draw() {
		return <div className="grid grid-cols-12 gap-1">
			{this._connainers.map((c) => {
				return c.boxs.map((b) => {
					return <div className={`sm-col-span-${b.sm} md-col-span-${b.md} lg-col-span-${b.lg} xl-col-span-${b.xl}  `}>
						{b.element && 'api' in b.element
							? new Autocomplete(b.element as AutocompleteElement, this._form, this._apis.api[b.element.api.name] as (query: Record<string, any>, params: Record<string, any>) => Promise<any>).create()
							:  b.container && b.container.boxs 
								? (new Builder([b.container], this._apis, this._form)).draw() 
								: <span>x</span>
						}
					</div>
				})
			})}
		</div>
	}
}
