# EduApp

My friend [Eduardo Sorribas](https://github.com/sorribas/) wanted a
non-functional version of hyperapp, so this is it. :)

## Usage

```
npm i eduapp
```

Since there is only the source, you need to compile the typescript yourself.

## Example app

If you know Hyperapp, then this should tell you all you need to know.

Notice that there are no `actions` or `emit`. You just change the state, and
the ui renders.

There is one gotcha though: you can't change some nested state, and you can't
add keys to your state that you didn't pass in from the beginning.

```ts
import { h, app, State } from 'eduapp'

const state: State = {
    count: 0,
    name: 'Gorm',
}

const view = (state: State) =>
    h('div', {}, [
        h('h1', {}, state.name + ' : ' + state.count),
        h(
            'button',
            { onclick: () => state.count++ },
            'Add 1'
        ),
        h('input', {
            value: state.name,
            oninput: (e: any) => {
                state.name = e.target.value
            }
        })
    ])

app(state, view, document.querySelector('#app'))
```
