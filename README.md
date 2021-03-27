# teeny-request-promise

## This package is a work in progress

---

**A teeny tiny Promise wrapper (and compat layer) around Google's teeny-request library**

> https://github.com/googleapis/teeny-request

---

### Installing

```sh
npm install -S teeny-request-promise teeny-request
```

---

### Usage

**`options`** - Any of the current [teeny-request](https://github.com/googleapis/teeny-request#teenyrequestoptions-callback)
options, plus a few additional aliases. **These are not complete, though not all of the original `request` options will be
supported:**

- **`options.form`**
  - alias for `options.body`
- **`options.resolveWithFullResponse`** 
  - When truthy, resolves with the full response object, otherwise returns with just the body

---

#### Promises:

```js
const request = require('teeny-request-promise');

// promise
request({
    url: 'your-api',
    ...otherOptions
}).then((body) => {
    // handle the body response
}).catch((error) => {
    // handle any errors
});

request.post({
    uri: 'some-uri',
    form: {
        attribute: true,
        anotherThing: 'yes'
    },
    resolveWithFullResponse: true,
}).then((response) => {
    // handle the full response
    // i.e. response.body
}).catch((error) => {
    // handle your errors
});
```

---

#### Async/Await

```js
const request = require('teeny-request-promise');

async function yourAsyncContextOrCallbackOrWhateverYouWantItsReallyUpToYou() {
    // send up generic get request, but only pass back the response.body
    const body = await request({
        url: 'your-api',
        ...otherOptions
    });

    // send up a form post, but get the full response back
    const fullResponse = await request.post({
        uri: 'some-uri',
        form: {
            attribute: true,
            anotherThing: 'yes'
        },
        resolveWithFullResponse: true,
    });
}

```

### Progress

See the [/TODO.md](/TODO.md) for milestones as to the progress of this package.