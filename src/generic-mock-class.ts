export class GenericMockClass<T> {

  public proxies = {};
  public spies: { [index: string]: any } = {};
  public overrides = {};

  static create<T>( overrides: { [ index: string ]: any } = {} ): GenericMockClass<T> & T {
    return new GenericMockClass( overrides ) as GenericMockClass<T> & T;
  }

  /**
   * Return as a proxy with this object as its target.
   */
  asProxy () {
    const handler = {

      get(target: any, prop: any) {
        /**
         * This will return the property on the "parent" object
         */
        if (typeof target[ prop ] !== 'undefined') {
          return target[ prop ];
        } else {

          if ( target.overrides.hasOwnProperty( prop ) ) {
            target.proxies[ prop ] = target.overrides[ prop ];
          } else {
            target.proxies[ prop ] = jest.fn();
          }

          target.spies[ prop ] = jest.spyOn( target.proxies, prop );
          return target.proxies[ prop ];
        }
      }
    };

    return new Proxy( this, handler );
  }

  getSpyFor( spyFor: string ) {
    if ( this.spies.hasOwnProperty( spyFor ) ) {
      return this.spies[ spyFor ];
    }

    const noopObj = { noop: jest.fn() };
    return jest.spyOn( noopObj, 'noop' );
  }

  override( overrides: { [ index: string ]: any } ) {
    this.proxies = { ...this.proxies, ...overrides };
    this.overrides = { ...this.overrides, ...overrides };
  }

  private constructor ( overrides: { [ index: string ]: any } ) {
    this.overrides = overrides;
    return this.asProxy();
  }
}
