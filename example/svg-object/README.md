# Example with SVG-Object

## SVG-Object Basic 1
```plantuml
:一级: -right-*  :二级: 
```

## SVG-Object Basic 2
```plantuml
@startuml
autonumber

Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
```

## SVG-Object with links
```plantuml
@startuml
Alice -> Bob: Authentication Request [[$./foobar docs]]
Bob --> Alice: Authentication Response [[$../../basic docs]]
@enduml
```
