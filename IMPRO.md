# API changes

## Global

- rename `animate` prop to `animated
- remove `fullWidth` prop

## Autocomplete

- Don't use the PageSearch icon, use the Search icon instead
- When you click to open the autocomplete results and then click on disable the menu should close

## Checkbox

- `defaultChecked` and `checked` should turn the checkbox on
- `indeterminate` should display child checkboxes, just one isn't enough
- `disabled` should look disabled, there is no visual indication that it is disabled

## Combobox

- `multiple` will result in `Cannot read properties of null (reading 'map')`
- `clearable` doesn't add a clear button to the combobox to clear the combobox

## File Upload

- `disabled` should look disabled, there is no visual indication that it is disabled
- the `shadow` prop isn't working

## Field

- use the Folder icon instead of the Mail icon
- remove the `multiline` prop

## Number Field

- use the TriangleFlag icon instead of the Folder icon

## Slider

- `disabled` should look disabled, there is no visual indication that it is disabled

## Switch

- `disabled` should look disabled, there is no visual indication that it is disabled
- `defaultChecked` does nothing?

## Toggle

- there is no `disabled` prop
- `defaultPressed` does nothing?
- `animated` does nothing

## 
