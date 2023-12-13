# GenericMockClass

`GenericMockClass` is a TypeScript class that provides a convenient way to create mock objects with spies and overrides for testing purposes. 
It is designed to be flexible and easy to use in various testing scenarios.


The `GenericMockClass` is designed to harness the capabilities of TypeScript generics, enabling autocomplete suggestions for methods and properties on the mock that mirror those available on the actual object.

## Features

- Create mock objects with predefined overrides.
- Automatically generates spies for methods or properties.
- Easily override specific methods or properties.
- Mirror the interface of the actual object.

## Installation

Install `GenericMockClass` using npm:

```
npm install generic-mock-class
```

## Usage

### Automatic spying on a method
```
interface ServiceToMock {
  methodToBeSpied: () => void;
}
const mock = GenericMockClass.create<ServiceToMock>();

// Call the method
mock.methodToBeSpied();

expect( mock.getSpyFor( 'methodToBeSpied' ) ).toHaveBeenCalled();
```

### Automatic spying on a method with properties
```
interface ServiceToMock {
  methodToBeSpied: ( foo: string, bar: string ) => void;
}
const mock = GenericMockClass.create<ServiceToMock>();

// Call the method with arguments
mock.methodToBeSpied( 'foo', 'bar' );

expect( mock.getSpyFor( 'methodToBeSpied' ) ).toHaveBeenCalledWith( 'foo', 'bar' );
expect( mock.getSpyFor( 'methodToBeSpied' ) ).not.toHaveBeenCalledWith( 'baz' );
```

### Returning a value from a method
```
interface ServiceToMock {
  methodToBeSpied: () => number;
}

const mock = GenericMockClass.create<ServiceToMock>( { methodToBeSpied: jest.fn().mockReturnValue( 123 ) } );
const returnValue = mock.methodToBeSpied();

expect( returnValue ).toBe( 123 );
```

### Changing the return value of a method later
```
interface ServiceToMock {
  methodToBeSpied: () => number;
}

const mock = GenericMockClass.create<ServiceToMock>( { methodToBeSpied: jest.fn().mockReturnValue( 123 ) } );

// Change the return value
mock.override({ methodToBeSpied: jest.fn().mockReturnValue( 456 ) } );

// Call method
const returnValue = mock.methodToBeSpied();

expect( returnValue ).toBe( 456 );
expect( mock.getSpyFor( 'methodToBeSpied' ) ).toHaveBeenCalled();
```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.
