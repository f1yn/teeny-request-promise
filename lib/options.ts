import { TRPOptions } from './trp';

/**
 * Apply minor transformations for _some_ backwards compatibility
 * @param originalOptionsRef
 */
export function parseOptions(originalOptionsRef: TRPOptions): TRPOptions {
	let returnWith = originalOptionsRef;

	if (originalOptionsRef.form) {
		returnWith = {
			...originalOptionsRef,
			// assign body to form (application/x-www-form-urlencoded)
			body: originalOptionsRef.form,
		};
	}

	// TODO: auth

	return returnWith;
}

/**
 * Apply method aliases
 * @param teenyRequestPromise The original teenyRequestPromise function ref
 */
export function applyMethodAliases(teenyRequestPromise): void {
	const methods = ['get', 'put', 'patch', 'post', 'delete'];

	let method;
	let index = methods.length;

	while (index--) {
		method = methods[index];
		teenyRequestPromise[method] = (options: TRPOptions) =>
			teenyRequestPromise({ ...options, method });
	}
}
