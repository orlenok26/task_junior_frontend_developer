# Часть первая (Теория)

### Код выводит:

```
node theory.js
Bad: undefined
Bad: undefined
Bad: undefined
Bad: undefined
```
### Модификация 1

```
const arr = [10, 12, 15, 21];
function array() {
    for (index = 0, len = arr.length; index < len; ++index) {
        console.log(arr[index] > 13 ? `Good: ${arr[index]}`: `Bad: ${arr[index]}`);
    }
};

setTimeout(array, 3000);
```

Код выводит:

```
Bad: 10
Bad: 12
Good 15
Good 21
```

### Модификация 2


```
const arr = [10, 12, 15, 21];
arr.forEach((item) => {
    setTimeout(function () {
        if (item > 13) {
            console.log(`Good ${item}`);
        }
        else {
            console.log(`Bad: ${item}`);
        }
    }, 3000)
})
```

Код выводит:

```
node theory.js
Bad: 10
Bad: 12
Good 15
Good 21
```

