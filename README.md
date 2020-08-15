[![npm](https://img.shields.io/npm/v/ng-units.svg)](https://www.npmjs.com/package/ng-units)

# ng-units

Angular component library for units of measurement. 
https://hansmaad.github.io/ng-units/



## Basic concepts
There are many different ways to deal with physical units in software applications. 
Here is how we do it in ng-units.

At first, some basic terms we use in ng-units:
 - Quantity: e.g.: Length, Mass, Temperature
 - Unit: e.g.: meter, kilogram, Kelvin
 - System of units: A collection of quantities and their units.

When using ng-units, you will store all your model values 
(and probably all your data on the backend side) 
based on one single consistent set of **base units**. 
ng-units uses the SI base units *kg, m, s, A, K, mol, cd* 
but you're free to define your own quantities by using any base units you like.

Your entire code should handle values based on these base units. 
When calculating stuff using these values, it's clear that results are also based on
base units. E.g. when multiplying two length quantites, the result is stored in `m²`.
The only moment, when we start converting numbers, 
is to render them to the view or getting input from the view. 
Both is handled by the components, directive and pipes of ng-units.


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
