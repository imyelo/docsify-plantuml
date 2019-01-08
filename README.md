# docsify-plantuml
[![npm](https://img.shields.io/npm/v/docsify-plantuml.svg?style=flat-square)](https://www.npmjs.com/package/docsify-plantuml)

## Install
1. Configure docsify-plantuml (optional):

    ```html
    <script>
    window.$docsify = {
      plantuml: {
        skin: 'default',
      },
    }
    </script>
    ```
    
    See [Options](#Options) for more details.

2. Insert script into docsify document:

    ```html
    <script src="//unpkg.com/docsify-plantuml/dist/docsify-plantuml.min.js"></script>
    ```


## Usage
Write your plantuml code into a code block marked ``plantuml``:

````markdown
### Section X
```plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
```
````


## Options
## skin
By default, we set the skin of the plantuml to [a cleaner version](https://github.com/matthewjosephtaylor/plantuml-style) for you.
However, You can still switch with this option (`skin`) if you prefer the classic one.

All available values are:
- `default`
- `classic`

For example:
```
<script>
window.$docsify = {
  plantuml: {
    skin: 'classic',
  },
}
</script>
```

## serverPath
By default, the official PlantUML server is used. If you have your own, configure it using the `serverPath` option:

```
<script>
window.$docsify = {
  plantuml: {
    serverPath: 'https://custom-server.local/plantuml/png/',
  },
}
</script>
```

## Example
- [index.html](example/index.html)
- [README.md](https://raw.githubusercontent.com/imyelo/docsify-plantuml/master/example/README.md)


## Related
- [docsify](https://github.com/QingWei-Li/docsify/)
- [PlantUML](http://plantuml.com/)


## License
MIT &copy; yelo, 2017 - present
