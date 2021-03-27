import { teenyRequest, Options, Response } from 'teeny-request';
import { parseOptions, applyMethodAliases } from './options';

interface TeenyPromiseOptions {
	resolveWithFullResponse?: boolean;
	auth: [];
	form?: Options['body'];
}

export type TRPOptions = Options & TeenyPromiseOptions;
export type TRPResponse = Response | Response['body'];

/**
 * Teeny-Tiny Promise Request
 * @param options {TRPOptions}
 */
function teenyRequestPromise(options: TRPOptions): Promise<TRPResponse> {
	// do some minimal parsing for limited backwards compat
	const parsedOptions = parseOptions(options);

	console.log('###########', parsedOptions);

	return new Promise((resolve, reject) => {
		try {
			teenyRequest(parsedOptions, function teenyRequestCallback(
				requestError,
				response,
				body
			) {
				if (requestError) {
					// The request itself failed, throw up the async trace
					reject(requestError);
					return;
				}
				// Resolve depending on options (resolveWithFullResponse)
				resolve(options.resolveWithFullResponse ? response : body);
			});
		} catch (teenyRequestRuntimeError) {
			reject(teenyRequestRuntimeError);
		}
	});
}

// add method-based alias helper
applyMethodAliases(teenyRequestPromise);

// Use node-compatible export
module.exports = teenyRequestPromise;
