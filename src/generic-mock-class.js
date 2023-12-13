export class GenericMockClass {
    static create(overrides = {}) {
        return new GenericMockClass(overrides);
    }
    /**
     * Return as a proxy with this object as its target.
     */
    asProxy() {
        const handler = {
            get(target, prop) {
                /**
                 * This will return the property on the "parent" object
                 */
                if (typeof target[prop] !== 'undefined') {
                    return target[prop];
                }
                else {
                    if (target.overrides.hasOwnProperty(prop)) {
                        target.proxies[prop] = target.overrides[prop];
                    }
                    else {
                        target.proxies[prop] = jest.fn();
                    }
                    target.spies[prop] = jest.spyOn(target.proxies, prop);
                    return target.proxies[prop];
                }
            }
        };
        return new Proxy(this, handler);
    }
    getSpyFor(spyFor) {
        if (this.spies.hasOwnProperty(spyFor)) {
            return this.spies[spyFor];
        }
        const noopObj = { noop: jest.fn() };
        return jest.spyOn(noopObj, 'noop');
    }
    override(overrides) {
        this.proxies = Object.assign(Object.assign({}, this.proxies), overrides);
        this.overrides = Object.assign(Object.assign({}, this.overrides), overrides);
    }
    constructor(overrides) {
        this.proxies = {};
        this.spies = {};
        this.overrides = {};
        this.overrides = overrides;
        return this.asProxy();
    }
}
