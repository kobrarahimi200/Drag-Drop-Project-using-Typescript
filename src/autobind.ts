//autobind Decorator
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const orginalMethod = descriptor.value;
    const adjDescripter: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = orginalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescripter;
}
