export function audit(description: string) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        var originalMethod = descriptor.value; // save a reference to the original method

        // NOTE: Do not use arrow syntax here. Use a function expression in
        // order to use the correct value of `this` in this method
        // See http://stackoverflow.com/questions/29775830/how-to-implement-a-typescript-decorator

        descriptor.value = function(...args: any[]) {
            console.log(`Audit has intercepted method ${propertyKey}.  Our description is ${description}.`);
            console.log('The method args are: ' + JSON.stringify(args)); // pre
            var result = originalMethod.apply(this, args);               // run and store the result
            console.log('The return value is: ' + result);               // post

            return result;                                               // return the result of the original method
        };

        return descriptor;
    };
}
