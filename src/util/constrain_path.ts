import {parse, tokensToFunction} from 'path-to-regexp';

export function constrain(path: string, constraints: {[key: string]: string}) {
    const tokens = parse(path);

    // If a certain token is present in our constraints, simply add a emptry string, else path-to-regexp will throw
    for (let token of tokens) {
        if (typeof token === 'object' && !constraints[token.name]) {
            constraints[token.name] = '';
        }
    }

    const pathFunction = tokensToFunction(tokens);
    const constrainedPath = pathFunction(constraints, {
        encode: (value, token) => ':' + token.name + value
    });

    return constrainedPath;
}
