import type { AutocompleteElement, Box, Container, TextFieldElement } from "../@types";
import { z } from "zod";

export class Schema {
	constructor(private containers: Container[]) {}

	public generate() {
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

		Object.assign(schemaFields, processContainers(this.containers));
		
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
}
