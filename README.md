[![Travis](https://img.shields.io/travis/hansmaad/ng-units.svg)](https://travis-ci.org/hansmaad/ng-units)
[![npm](https://img.shields.io/npm/v/ng-units.svg)](https://www.npmjs.com/package/ng-units)

# ng-units

https://hansmaad.github.io/ng-units/

## Basic concepts
todo
## Basic usage

Your app must have at least on `systemOfUnits`. When importing the `NgUnitsModule` into your app module, the `systemOfUnits` provider will be registered into the root injector of your app.

```typescript
@NgModule({
  imports: [
    BrowserModule,
    NgUnitsModule.forRoot(),
  ], //...
})
export class AppModule { }
```
To initialize your system of units (adding predefined or custom quantities to it), pass a `SystemOfUnitsConfig` to `forRoot()`. Usually you'd like to implement an initializer for this config in a separate file.

```typescript
export function systemOfUnitsInitializer(): SystemOfUnitsConfig {
    return {
        quantities: [area, length, time, new Quantity(/**/), /*...*/]
    }
}

@NgModule({
  imports: [
    BrowserModule,
    NgUnitsModule.forRoot(systemOfUnitsInitializer()),
  ], //...
})
```

If you want to import the `NgUnitsModule` into lazy loaded modules without creating a new system of units, use `NgUnitsModule.forChild()`. 

It's possible to provide separate systems of units on component or module level. 

### ngQuantity pipe
To simply render converted values, use the `ngQuantity` pipe. 
You can pass the quantity as a string, to select the quantity from the `systemOfUnits`
or you can bind to a quantity instance in your controller.
If you want to show the unit symbol, use `:true`.

```html
<p>My value without label: {{value | ngQuantity:'Length'}}</p>
<p>My value with label: {{value | ngQuantity:'Length':true}}</p>
<p>My value with dynamic quantity: {{value | ngQuantity:myQuantity}}</p>
```

### ngQuantity directive
To use a quantity with `ngModel`, use the `ngQuantity` directive.
You can pass the quantity as a string, to select the quantity from the `systemOfUnits`
or you can bind to a quantity instance in your controller.

```html
<input name="val1" [(ngModel)]="value" ngQuantity="Length">
<input name="val2" [(ngModel)]="value" [ngQuantity]="myQuantity">
```

### ngUnitSelect

Use the `ngUnitSelect` attribute component, to fill a `<select>` with units of a quantity.
```html
<select ngUnitSelect="Length"></select>
<select [ngUnitSelect]="myQuantity"></select>
```
If you implement your own mechanism to change units, remember to broadcast this change to the system of units or use the `selectUnit` method, which will then broadcast the change.

```typescript
// After modifiying quantity do
this.systemOfUnits.broadcast(quantity);
// OR
this.systemOfUnits.selectUnit(quantity, newUnit);
```