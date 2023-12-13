import { GenericMockClass } from "./generic-mock-class";

describe( 'GenericMockClass', () => {

  it('should make it possible to call any method on it', () => {
    interface ServiceToMock {
      methodToBeMocked: () => void;
    }
    const mock = GenericMockClass.create<ServiceToMock>();
    expect( () => { mock.methodToBeMocked(); } ).not.toThrowError();
  });

  it('should be possible to spy on a method', () => {
    interface ServiceToMock {
      methodToBeSpied: () => void;
    }
    const mock = GenericMockClass.create<ServiceToMock>();
    mock.methodToBeSpied();
    expect( mock.getSpyFor( 'methodToBeSpied' ) ).toHaveBeenCalled();
    expect( mock.getSpyFor( 'nonExistingMethod' ) ).not.toHaveBeenCalled();
  });

  it('should be possible to check parameters of spy', () => {
    interface ServiceToMock {
      methodToBeSpied: ( foo: string, bar: string ) => void;
    }
    const mock = GenericMockClass.create<ServiceToMock>();
    mock.methodToBeSpied( 'foo', 'bar' );
    expect( mock.getSpyFor( 'methodToBeSpied' ) ).toHaveBeenCalledWith( 'foo', 'bar' );
    expect( mock.getSpyFor( 'methodToBeSpied' ) ).not.toHaveBeenCalledWith( 'baz' );
  });

  it('should be possible to return certain value', () => {
    interface ServiceToMock {
      methodToBeSpied: () => number;
    }
    const mock = GenericMockClass.create<ServiceToMock>( { methodToBeSpied: jest.fn().mockReturnValue( 123 ) } );
    const returnValue = mock.methodToBeSpied();
    expect( returnValue ).toBe( 123 );
  });

  it('should be possible to change the return value on a later moment', () => {
    interface ServiceToMock {
      methodToBeSpied: () => number;
    }
    const mock = GenericMockClass.create<ServiceToMock>( { methodToBeSpied: jest.fn().mockReturnValue( 123 ) } );

    mock.override({ methodToBeSpied: jest.fn().mockReturnValue( 456 ) } );
    const returnValue = mock.methodToBeSpied();
    expect( returnValue ).toBe( 456 );
    expect( mock.getSpyFor( 'methodToBeSpied' ) ).toHaveBeenCalled();
  });

} );
